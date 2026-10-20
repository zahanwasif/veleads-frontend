import type { ComponentType } from 'react';
import type { AuthorId } from './authors';
import type { OfferId } from './offers';
import { getService, type ServiceSlug } from './services';

// Published playbooks live in content/playbooks/<slug>.mdx and export a `meta` object.
// To publish a new one, add the file and list its slug here.

export type PlaybookMeta = {
  title: string;
  /** One or two sentences shown on the playbooks page and under the title. */
  summary: string;
  /** Search and social description, ideally under 160 characters. */
  description: string;
  /** A service slug, or a general topic that has no service page. */
  topic: ServiceSlug | GeneralTopic;
  author: AuthorId;
  published: string;
  updated?: string;
  readingMinutes: number;
};

// Topics that aren't one of the three services. They fall back to the 90-day plan offer.
const GENERAL_TOPICS = { 'gtm-engineering': 'GTM engineering' } as const;
type GeneralTopic = keyof typeof GENERAL_TOPICS;

/** Label, related service and free offer for a playbook's topic. */
export function topicDetails(topic: PlaybookMeta['topic']): { label: string; service?: ReturnType<typeof getService>; offer: OfferId } {
  const service = getService(topic);
  if (service) return { label: service.title, service, offer: service.offer };
  return { label: GENERAL_TOPICS[topic as GeneralTopic], offer: 'sprint-plan' };
}

type PlaybookModule = { default: ComponentType; meta: PlaybookMeta };

export const PLAYBOOK_SLUGS = [
  'cold-email-deliverability',
  'cold-email-copywriting',
  'linkedin-content-strategy',
  'abm-top-50-accounts',
  'claude-code-lead-generation',
] as const;
export type PlaybookSlug = (typeof PLAYBOOK_SLUGS)[number];

export function isPlaybookSlug(slug: string): slug is PlaybookSlug {
  return (PLAYBOOK_SLUGS as readonly string[]).includes(slug);
}

export async function loadPlaybook(slug: PlaybookSlug): Promise<PlaybookModule> {
  return import(`@/content/playbooks/${slug}.mdx`);
}

export async function listPlaybooks() {
  const all = await Promise.all(
    PLAYBOOK_SLUGS.map(async (slug) => ({ slug, ...(await loadPlaybook(slug)).meta })),
  );
  return all.sort((a, b) => b.published.localeCompare(a.published));
}
