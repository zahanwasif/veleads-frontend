// The site's public address, used for canonical links, the sitemap and structured data.
// It must match the domain the site is actually served from (no redirect in between).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://veleads.io').replace(/\/$/, '');
