import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

// Server-side check that a visitor-supplied website exists, plus its favicon.
// The domain comes from a public form, so never reach private networks (SSRF):
// resolve DNS and refuse private addresses on every hop, cap time and size.

const TIMEOUT_MS = 5000;
const MAX_REDIRECTS = 3;
const MAX_HTML_BYTES = 300_000;
const MAX_ICON_BYTES = 150_000;

function isPrivateAddress(ip: string): boolean {
  if (isIP(ip) === 4) {
    const [a, b] = ip.split('.').map(Number);
    return (
      a === 0 || a === 10 || a === 127 || a >= 224 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19))
    );
  }
  const v6 = ip.toLowerCase();
  if (v6.startsWith('::ffff:')) return isPrivateAddress(v6.slice(7));
  return v6 === '::' || v6 === '::1' || v6.startsWith('fc') || v6.startsWith('fd') || /^fe[89ab]/.test(v6);
}

async function assertPublicHost(hostname: string) {
  if (isIP(hostname)) throw new Error('IP addresses are not allowed');
  const addresses = await lookup(hostname, { all: true });
  if (!addresses.length || addresses.some((a) => isPrivateAddress(a.address))) {
    throw new Error('Host resolves to a private address');
  }
}

async function readCapped(res: Response, max: number) {
  if (!res.body) return new Uint8Array();
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (size < max) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    size += value.byteLength;
  }
  await reader.cancel().catch(() => {});
  return new Uint8Array(Buffer.concat(chunks).subarray(0, max));
}

/** GET with manual, re-validated redirects. Returns the final response and URL, or null. */
async function safeGet(url: string, accept: string) {
  let current = new URL(url);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    if (current.protocol !== 'https:' && current.protocol !== 'http:') return null;
    if (current.port && current.port !== '80' && current.port !== '443') return null;
    await assertPublicHost(current.hostname);
    const res = await fetch(current, {
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; VeleadsSiteCheck/1.0; +https://veleads.io)', accept },
    });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      await res.body?.cancel().catch(() => {});
      if (!location) return null;
      current = new URL(location, current);
      continue;
    }
    return { res, url: current };
  }
  return null;
}

function findIconHref(html: string): string | null {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  const icons = links.filter((l) => /rel=["'][^"']*\bicon\b[^"']*["']/i.test(l));
  // Prefer apple-touch / larger icons, which look sharper in the popup.
  icons.sort((a, b) => Number(/apple-touch|192|180|96/i.test(b)) - Number(/apple-touch|192|180|96/i.test(a)));
  for (const tag of icons) {
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (href && !href.startsWith('data:')) return href;
  }
  return null;
}

async function fetchIcon(url: URL): Promise<string | null> {
  try {
    const got = await safeGet(url.href, 'image/*');
    if (!got || !got.res.ok) return null;
    const type = (got.res.headers.get('content-type') ?? '').split(';')[0].trim();
    if (!type.startsWith('image/') || type === 'image/svg+xml') return null; // skip SVG: can carry scripts
    const bytes = await readCapped(got.res, MAX_ICON_BYTES);
    if (!bytes.byteLength) return null;
    return `data:${type};base64,${Buffer.from(bytes).toString('base64')}`;
  } catch {
    return null;
  }
}

export type SiteCheck = { found: true; favicon: string | null } | { found: false };

export async function checkSite(domain: string): Promise<SiteCheck> {
  for (const host of [domain, `www.${domain}`]) {
    try {
      const got = await safeGet(`https://${host}`, 'text/html');
      if (!got) continue;
      // Any real HTTP answer means the site exists, even if it blocks bots (403) or errors.
      const html =
        got.res.ok && (got.res.headers.get('content-type') ?? '').includes('text/html')
          ? new TextDecoder().decode(await readCapped(got.res, MAX_HTML_BYTES))
          : '';
      if (!html) await got.res.body?.cancel().catch(() => {});

      const href = html ? findIconHref(html) : null;
      const favicon =
        (href ? await fetchIcon(new URL(href, got.url)) : null) ?? (await fetchIcon(new URL('/favicon.ico', got.url)));
      return { found: true, favicon };
    } catch {
      // DNS failure, private address, timeout: try the next host.
    }
  }
  return { found: false };
}
