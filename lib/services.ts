import { Mail, PenLine, Radar, type LucideIcon } from 'lucide-react';
import type { OfferId } from './offers';

// Content for the three services. Each one runs inside the 90-Day Pipeline Sprint and is also sold on its own.
// Claims rule: only real numbers, clearly labelled. No meeting guarantees.

export type ServiceSlug = 'linkedin-content' | 'linkedin-outreach' | 'email-outbound';

export type Service = {
  slug: ServiceSlug;
  title: string;
  icon: LucideIcon;
  /** Free offer behind the hero form. */
  offer: OfferId;
  /** One line for menus and footer cards. */
  short: string;
  /** Paragraph used on the homepage sprint tabs. */
  summary: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  included: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  promise: { title: string; body: string };
  proof?: { value: string; label: string; note: string };
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'linkedin-content',
    title: 'LinkedIn Content',
    icon: PenLine,
    offer: 'profile-review',
    short: 'Three posts a week in your voice.',
    summary:
      'Three text posts a week in your voice, from one 30-minute call a month. We optimise your profile, engage with your buyers’ posts, and capture everyone who engages.',
    metaDescription:
      'Done-for-you LinkedIn content for B2B founders. Three text posts a week in your voice from one 30-minute monthly call, plus profile and engagement work.',
    eyebrow: 'LinkedIn Content',
    headline: 'Three LinkedIn posts a week, in your voice.',
    headlineAccent: 'We write them. You approve.',
    intro:
      'All it takes is one 30-minute call a month. We also optimise your profile, engage with your buyers\u2019 posts, and tell you who in your market is paying attention.',
    included: [
      { title: 'Three posts a week', body: 'Text posts written in your voice, on the problems your buyers actually have.' },
      { title: 'Profile optimisation', body: 'Headline, about section and featured posts rewritten so a buyer knows what you do in five seconds.' },
      { title: 'Founder plus 1–2 execs', body: 'We run your personal profile and, if you want, one or two of your leadership team.' },
      { title: 'Daily engagement', body: 'We comment on posts from the people you want to sell to, so they know your name before they see your post.' },
      { title: 'Engager capture', body: 'Everyone who reacts or comments is logged and checked against your ICP, so warm leads don’t slip away.' },
      { title: 'Monthly report', body: 'What went out, who engaged, and which topics pulled in your buyers.' },
    ],
    steps: [
      { title: 'One call a month', body: 'A 30-minute interview where we pull out your opinions, stories and lessons.' },
      { title: 'We draft, an editor shapes', body: 'AI does the first draft. A human editor makes it sound like you.' },
      { title: 'You approve in 48 hours', body: 'Edit, approve or reject each post. Nothing goes out without your yes.' },
      { title: 'We post and engage', body: 'Posts go live on schedule and we work the comments and your buyers’ feeds.' },
    ],
    promise: {
      title: 'Engagement from your ICP, not vanity likes.',
      body: 'We report on who engaged and whether they fit your buyer profile, so you can see the content reaching the right people.',
    },
    faqs: [
      { q: 'Do I have to write anything?', a: 'No. One 30-minute call a month gives us enough material. You only review and approve.' },
      { q: 'Will it sound like me?', a: 'Every post is drafted from your own words on the call, then edited by a person who learns your voice. You can edit anything before it goes out.' },
      { q: 'Do you make videos or carousels?', a: 'Not right now. We focus on text posts, which are the fastest way to build a founder voice on LinkedIn.' },
      { q: 'Do you post on our company page?', a: 'We focus on personal profiles, because buyers follow people more than logos. The founder and up to two execs.' },
    ],
  },
  {
    slug: 'linkedin-outreach',
    title: 'LinkedIn Outreach',
    icon: Radar,
    offer: 'outreach-list',
    short: 'Signal-based outreach from your profile.',
    summary:
      'Outreach from your own LinkedIn profile to accounts showing buying signals. We start the conversation and book the call. You just show up.',
    metaDescription:
      'Signal-based LinkedIn outreach for B2B AI & SaaS founders. We message accounts showing buying signals from your profile and book calls on your calendar.',
    eyebrow: 'LinkedIn Outreach',
    headline: 'Reach buyers when they’re ready.',
    headlineAccent: 'Then we book the call.',
    intro:
      'Outreach from your own LinkedIn profile to accounts showing buying signals. We start the conversation, run it to a booked call, and you just show up.',
    included: [
      { title: 'Signal tracking', body: 'Hiring, funding, leadership changes and other signals that an account is ready to talk, refreshed every week.' },
      { title: 'About 100 requests a week', body: 'Connection requests from your profile, kept within LinkedIn’s limits so your account stays safe.' },
      { title: 'A reason for every message', body: 'Each first message is written for that person and the signal they showed. No templates with a name token.' },
      { title: 'Conversations handled', body: 'We reply, follow up and handle objections in your voice until there’s a call to book.' },
      { title: 'Calls on your calendar', body: 'Booked straight into your calendar with notes on who they are and why they replied.' },
      { title: 'Weekly report', body: 'Requests sent, accepted, replies and calls booked, every week.' },
    ],
    steps: [
      { title: 'Define the buyer', body: 'We agree your ICP and the signals that mean an account is worth a message now.' },
      { title: 'Refresh signals weekly', body: 'Every week we pull a fresh list of accounts showing those signals.' },
      { title: 'Reach out personally', body: 'Connection requests and first messages go out from your profile, each with its own reason.' },
      { title: 'Book the call', body: 'We run the conversation and put the call on your calendar. You just show up.' },
    ],
    promise: {
      title: 'Consistent, personal outreach. Every week.',
      body: 'About 100 researched requests a week from your profile, each tied to a real signal. We report replies and booked calls honestly, every week.',
    },
    proof: {
      value: '30 of 96',
      label: 'connection requests accepted in two weeks, with 8 replies from 32 messages',
      note: 'Our own outbound on our founder’s profile, run with the same process.',
    },
    faqs: [
      { q: 'Is my LinkedIn account safe?', a: 'We keep volume to about 100 requests a week, inside LinkedIn’s limits, and every message is written for one person.' },
      { q: 'Who writes the messages?', a: 'We do, in your voice. You can review messages and replies whenever you like.' },
      { q: 'What counts as a buying signal?', a: 'Things like hiring for a role you help with, new funding, a new leader in the team you sell to, or engaging with a competitor.' },
      { q: 'Do you guarantee meetings?', a: 'No. We guarantee the work, roughly 100 personal requests a week, and report what it produces. Anyone guaranteeing meetings is usually lowering the bar on who counts.' },
    ],
  },
  {
    slug: 'email-outbound',
    title: 'Email Outbound',
    icon: Mail,
    offer: 'deliverability-check',
    short: 'Cold email infrastructure in your name.',
    summary:
      'Cold email infrastructure in your name, with secondary domains, warmed mailboxes and monitored deliverability. Inside the sprint, we write and run the campaigns on it too.',
    metaDescription:
      'Cold email infrastructure for B2B founders. Secondary domains in your name, warmed mailboxes, SPF, DKIM and DMARC, and ongoing deliverability monitoring.',
    eyebrow: 'Email Outbound',
    headline: 'Cold email that reaches the inbox.',
    headlineAccent: 'Your main domain stays safe.',
    intro:
      'We set up and run cold email infrastructure in your name. Secondary domains, warmed mailboxes and monitored deliverability, so your emails land and your main domain is never at risk.',
    included: [
      { title: 'Secondary domains', body: 'Look-alike domains bought in your name, so cold email never touches your main domain.' },
      { title: 'About 3 mailboxes per domain', body: 'Spread across domains to keep volume per mailbox low and reputation high.' },
      { title: 'SPF, DKIM and DMARC', body: 'Every domain authenticated properly, so inbox providers trust what you send.' },
      { title: '2–3 weeks of warm-up', body: 'Mailboxes build a sending history before a single cold email goes out.' },
      { title: 'Safe sending limits', body: 'About 30 emails per mailbox a day, the level that keeps deliverability healthy.' },
      { title: 'Ongoing monitoring', body: 'We watch bounce rates and mailbox health, and fix problems before they hurt you.' },
    ],
    steps: [
      { title: 'Buy domains', body: 'Secondary domains registered in your name. You own them from day one.' },
      { title: 'Set up mailboxes', body: 'Mailboxes created and authenticated with SPF, DKIM and DMARC.' },
      { title: 'Warm up', body: 'Two to three weeks of gradual sending to build reputation.' },
      { title: 'Monitor and maintain', body: 'Ongoing checks on health and bounces, with fixes as soon as something slips.' },
    ],
    promise: {
      title: 'Infrastructure you own, kept healthy.',
      body: 'One setup fee, then a monthly management fee. Lists and campaigns are part of the 90-Day Pipeline Sprint, where we write and run them on this setup.',
    },
    proof: {
      value: '0.3%',
      label: 'bounce rate across 915 emails in two weeks',
      note: 'GRAIXL, an AI interview platform for recruitment teams in Europe.',
    },
    faqs: [
      { q: 'Why not send from my main domain?', a: 'Cold email carries risk. If a secondary domain gets flagged, your main domain, and the emails your customers rely on, stay untouched.' },
      { q: 'Who owns the domains and mailboxes?', a: 'You do. Everything is registered in your name and stays with you if we stop working together.' },
      { q: 'Do you write and send the campaigns?', a: 'Inside the 90-Day Pipeline Sprint, yes. We build the lists, write the emails and run the campaigns. On its own, this service covers the infrastructure.' },
      { q: 'How long until I can send?', a: 'Warm-up takes two to three weeks. Cold email starts once the mailboxes are ready.' },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
