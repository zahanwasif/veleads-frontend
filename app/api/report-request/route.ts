import { normalizeDomain } from '@/lib/domain';
import { LeadSchema } from '@/lib/lead';
import { normalizeLinkedInProfile } from '@/lib/linkedin';

// Light abuse guard: in-memory, per server instance.
const recent = new Map<string, number[]>();
const LIMIT_PER_HOUR = 5;

function allow(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  if (hits.length >= LIMIT_PER_HOUR) return false;
  hits.push(now);
  recent.set(ip, hits);
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (!allow(ip)) {
    return Response.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? 'Invalid request' }, { status: 400 });
  }
  const { domain: rawDomain, linkedinUrl: rawLinkedIn, ...rest } = parsed.data;
  const domain = rawDomain ? normalizeDomain(rawDomain) : undefined;
  if (domain === null) return Response.json({ error: 'Invalid company website' }, { status: 400 });
  const linkedin = rawLinkedIn ? normalizeLinkedInProfile(rawLinkedIn) : undefined;
  if (linkedin === null) return Response.json({ error: 'Invalid LinkedIn profile URL' }, { status: 400 });

  // `offer` tells your automation which report to send.
  const lead = {
    ...rest,
    domain,
    linkedinUrl: linkedin?.url,
    submittedAt: new Date().toISOString(),
    source: request.headers.get('referer') ?? undefined,
  };

  // Forward to your CRM / automation (HubSpot workflow, Zapier, Make, n8n…) when configured.
  const webhook = process.env.REPORT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    }).catch(() => null);
    if (!res?.ok) {
      console.error('[report-request] Webhook failed', res?.status);
      return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 502 });
    }
  } else {
    console.info('[report-request] New lead (set REPORT_WEBHOOK_URL to forward it):', lead);
  }

  return Response.json({ ok: true });
}
