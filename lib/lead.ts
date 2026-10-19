import { z } from 'zod';
import { OFFER_IDS } from './offers';

// Shared by the report popup (client) and /api/report-request (server).

export const ROLES = ['Founder / CEO', 'Sales or growth lead', 'Other'] as const;
export const DEAL_SIZES = ['Under $5k', '$5k – $20k', '$20k+', 'Not sure'] as const;
export const TIMELINES = ['This month', 'This quarter', 'Just exploring'] as const;

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'ymail.com', 'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
  'icloud.com', 'me.com', 'aol.com', 'proton.me', 'protonmail.com', 'gmx.com', 'gmx.de', 'yandex.com', 'mail.com',
  'zoho.com',
]);

export function isWorkEmail(email: string) {
  const domain = email.split('@')[1]?.toLowerCase();
  return !!domain && !FREE_EMAIL_DOMAINS.has(domain);
}

// Domain-based offers send `domain`, LinkedIn-based offers send `linkedinUrl`.
export const LeadSchema = z.object({
  offer: z.enum(OFFER_IDS).default('sprint-plan'),
  domain: z.string().min(4).max(253).optional(),
  linkedinUrl: z.string().max(300).optional(),
  fullName: z.string().trim().min(2, 'Enter your full name').max(120),
  email: z
    .string()
    .trim()
    .email('Enter a valid email')
    .max(254)
    .refine(isWorkEmail, 'Use your work email, so we can tailor the report'),
  role: z.enum(ROLES, { message: 'Pick your role' }),
  dealSize: z.enum(DEAL_SIZES).optional(),
  timeline: z.enum(TIMELINES).optional(),
}).refine((l) => l.domain || l.linkedinUrl, { message: 'Missing website or LinkedIn profile', path: ['form'] });

export type Lead = z.infer<typeof LeadSchema>;
