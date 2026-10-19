// Free lead magnets behind each "enter your X" form. The homepage offers the 90-day plan;
// each service page offers something specific to that service.

export const OFFER_IDS = ['sprint-plan', 'profile-review', 'outreach-list', 'deliverability-check'] as const;
export type OfferId = (typeof OFFER_IDS)[number];

export type Offer = {
  /** What the visitor types in. */
  input: 'domain' | 'linkedin';
  inputLabel: string;
  placeholder: string;
  button: string;
  /** Line under the form, before "Prefer to talk?". */
  note: string;
  dialogEyebrow: string;
  /** Progress steps shown in the popup before the form. `subject` is the domain or profile handle. */
  steps: (subject: string) => string[];
  formTitle: string;
  formBody: (subject: string) => string;
  submit: string;
  doneTitle: string;
};

export const offers: Record<OfferId, Offer> = {
  'sprint-plan': {
    input: 'domain',
    inputLabel: 'Your company website',
    placeholder: 'yourcompany.com',
    button: 'See your 90 days',
    note: 'Free, takes about 20 seconds.',
    dialogEyebrow: 'Your 90-day plan',
    steps: (s) => [`Reading ${s}`, 'Mapping your ICP', 'Finding buyers showing signals', 'Curating your target list'],
    formTitle: 'Where should we send your report?',
    formBody: (s) => `Your ICP, a starter list of target accounts and a 90-day plan for ${s}.`,
    submit: 'Send my report',
    doneTitle: 'Your report is on its way.',
  },
  'profile-review': {
    input: 'linkedin',
    inputLabel: 'Your LinkedIn profile URL',
    placeholder: 'linkedin.com/in/yourname',
    button: 'Review my profile',
    note: 'Free profile review, plus 5 post ideas for your buyers.',
    dialogEyebrow: 'Your profile review',
    steps: () => [
      'Opening your profile',
      'Checking your headline and about section',
      'Reviewing your recent posts',
      'Drafting post ideas for your buyers',
    ],
    formTitle: 'Where should we send your review?',
    formBody: () => 'What to fix on your profile, and 5 post ideas written for the people you sell to.',
    submit: 'Send my review',
    doneTitle: 'Your profile review is on its way.',
  },
  'outreach-list': {
    input: 'linkedin',
    inputLabel: 'Your LinkedIn profile URL',
    placeholder: 'linkedin.com/in/yourname',
    button: 'Find my buyers',
    note: 'Free list of 10 accounts showing buying signals right now.',
    dialogEyebrow: 'Your outreach list',
    steps: () => [
      'Opening your profile',
      'Working out who you sell to',
      'Scanning for buying signals',
      'Picking 10 accounts to start with',
    ],
    formTitle: 'Where should we send your list?',
    formBody: () => '10 accounts showing buying signals right now, and the first message we’d send each one.',
    submit: 'Send my list',
    doneTitle: 'Your list is on its way.',
  },
  'deliverability-check': {
    input: 'domain',
    inputLabel: 'Your company website',
    placeholder: 'yourcompany.com',
    button: 'Check my domain',
    note: 'Free, instant check of your SPF, DMARC and mail servers.',
    dialogEyebrow: 'Your deliverability check',
    steps: (s) => [`Looking up ${s}`, 'Checking mail servers', 'Checking SPF', 'Checking DMARC'],
    formTitle: 'Want the full report?',
    formBody: (s) =>
      `What to fix first, and how we’d set up sending domains for ${s} without putting your main domain at risk.`,
    submit: 'Send my report',
    doneTitle: 'Your report is on its way.',
  },
};
