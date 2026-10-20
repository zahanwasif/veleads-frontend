// Tells Bing (and other IndexNow search engines) that pages are new or updated, so they recrawl quickly.
// Run after a deploy:   bun run indexnow
// Submit specific URLs: bun run indexnow https://veleads.io/playbooks/new-playbook
// Preview without sending: bun run indexnow --dry-run
//
// The key file public/<KEY>.txt must be live on the site first, or IndexNow answers 403.

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://veleads.io').replace(/\/$/, '');
const KEY = 'fd5861051ff947b79cfc5ca6ddb3bfc0';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const explicit = args.filter((a) => a.startsWith('http'));

async function sitemapUrls() {
  const xml = await fetch(`${SITE}/sitemap.xml`).then((r) => {
    if (!r.ok) throw new Error(`Couldn't read ${SITE}/sitemap.xml (${r.status})`);
    return r.text();
  });
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url.trim());
}

const urlList = explicit.length ? explicit : await sitemapUrls();
const host = new URL(SITE).host;
const foreign = urlList.filter((u) => new URL(u).host !== host);
if (foreign.length) throw new Error(`These URLs aren't on ${host}: ${foreign.join(', ')}`);

console.log(`${dryRun ? 'Would submit' : 'Submitting'} ${urlList.length} URLs to IndexNow:`);
urlList.forEach((u) => console.log(`  ${u}`));
if (dryRun) process.exit(0);

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});

const meaning: Record<number, string> = {
  200: 'Submitted',
  202: 'Accepted, key check pending',
  400: 'Bad request',
  403: 'Key not found on the site. Deploy public/' + KEY + '.txt first',
  422: 'URLs or key do not match the host',
  429: 'Too many requests, try again later',
};
console.log(`${res.status} ${meaning[res.status] ?? res.statusText}`);
if (res.status >= 300) process.exit(1);

export {};
