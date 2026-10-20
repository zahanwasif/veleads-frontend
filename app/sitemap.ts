import type { MetadataRoute } from 'next';
import { listPlaybooks } from '@/lib/playbooks';
import { services } from '@/lib/services';
import { SITE_URL } from '@/lib/site-url';

// Every public page. Playbooks are added automatically from lib/playbooks.ts,
// using their updated (or published) date so crawlers know when to revisit.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const playbooks = await listPlaybooks();
  const latestPlaybook = playbooks.map((p) => p.updated ?? p.published).sort().at(-1);
  const buildTime = new Date();

  return [
    { url: SITE_URL, lastModified: buildTime, changeFrequency: 'weekly', priority: 1 },
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: buildTime,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/playbooks`,
      lastModified: latestPlaybook ? new Date(latestPlaybook) : buildTime,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...playbooks.map((p) => ({
      url: `${SITE_URL}/playbooks/${p.slug}`,
      lastModified: new Date(p.updated ?? p.published),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
