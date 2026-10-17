import { normalizeDomain } from '@/lib/domain';
import { checkSite, type SiteCheck } from '@/lib/site';

// Results are cached briefly so repeat clicks don't refetch the site.
const cache = new Map<string, { at: number; result: SiteCheck }>();
const TTL_MS = 60 * 60 * 1000;

const recent = new Map<string, number[]>();
const LIMIT_PER_MINUTE = 20;

function allow(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 60 * 1000);
  if (hits.length >= LIMIT_PER_MINUTE) return false;
  hits.push(now);
  recent.set(ip, hits);
  return true;
}

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (!allow(ip)) return Response.json({ error: 'Too many requests' }, { status: 429 });

  const domain = normalizeDomain(new URL(request.url).searchParams.get('domain') ?? '');
  if (!domain) return Response.json({ found: false });

  const hit = cache.get(domain);
  if (hit && Date.now() - hit.at < TTL_MS) return Response.json(hit.result);

  const result = await checkSite(domain);
  cache.set(domain, { at: Date.now(), result });
  return Response.json(result);
}
