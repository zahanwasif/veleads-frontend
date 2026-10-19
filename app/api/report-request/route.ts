import { normalizeDomain } from '@/lib/domain';
import { submitToHubSpot } from '@/lib/hubspot';
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
  const { domain: rawDomain, linkedinUrl: rawLinkedIn, pageUri, pageName, ...rest } = parsed.data;
  const domain = rawDomain ? normalizeDomain(rawDomain) : undefined;
  if (domain === null) return Response.json({ error: 'Invalid company website' }, { status: 400 });
  const linkedin = rawLinkedIn ? normalizeLinkedInProfile(rawLinkedIn) : undefined;
  if (linkedin === null) return Response.json({ error: 'Invalid LinkedIn profile URL' }, { status: 400 });

  // `offer` tells your automation which report to send.
  const lead = {
    ...rest,
    domain,
    linkedinUrl: linkedin?.url,
    pageUri,
    submittedAt: new Date().toISOString(),
  };

  // HubSpot (CRM + website activity) and the n8n webhook (report automation) run side by side,
  // so an outage in one never loses the lead in the other. Each is skipped until configured.
  const webhook = process.env.REPORT_WEBHOOK_URL;
  const [hubspot, n8n] = await Promise.allSettled([
    submitToHubSpot(lead, {
      hutk: request.headers.get('cookie')?.match(/(?:^|;\s*)hubspotutk=([^;]+)/)?.[1],
      pageUri: pageUri ?? request.headers.get('referer') ?? undefined,
      pageName,
      ipAddress: ip === 'unknown' ? undefined : ip,
    }),
    webhook
      ? fetch(webhook, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(8000),
        }).then((res) => {
          if (!res.ok) throw new Error(`Webhook failed (${res.status})`);
          return { skipped: false as const };
        })
      : Promise.resolve({ skipped: true as const }),
  ]);

  for (const [name, result] of [['hubspot', hubspot], ['webhook', n8n]] as const) {
    if (result.status === 'rejected') console.error(`[report-request] ${name} failed`, result.reason);
  }
  const delivered = [hubspot, n8n].filter((r) => r.status === 'fulfilled' && !r.value.skipped).length;
  const failed = [hubspot, n8n].filter((r) => r.status === 'rejected').length;

  if (!delivered && failed) {
    return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 502 });
  }
  if (!delivered) {
    console.info('[report-request] New lead (set HUBSPOT_PORTAL_ID, HUBSPOT_FORM_ID or REPORT_WEBHOOK_URL to forward it):', lead);
  }

  return Response.json({ ok: true });
}
