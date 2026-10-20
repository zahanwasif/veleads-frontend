import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-url';

// Search engines and AI assistants are welcome everywhere except the API routes.
// AI crawlers are listed by name so the policy stays explicit even if a default changes.
const AI_CRAWLERS = [
  // OpenAI: ChatGPT search, live browsing for users, and training.
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  // Anthropic: Claude search, live browsing for users, and training.
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  // Perplexity search and live browsing.
  'PerplexityBot',
  'Perplexity-User',
  // Google Gemini and Apple Intelligence.
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: '/api/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
