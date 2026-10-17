import { KeyRound, Plus, RefreshCw } from 'lucide-react';
import { BookDemoButton } from './BookDemoButton';

const NOTICE_DAYS = 30;

const faqs = [
  {
    q: 'What does it cost?',
    a: '$4,500 per 90-day sprint. The next 3 companies get a founding rate of $3,000. Tools (data, sending and LinkedIn tools) are billed at cost and paid directly to the vendors.',
  },
  {
    q: 'Will I get meetings in the first month?',
    a: 'Few, by design. Days 1–30 are for research and warming up your profile, mailboxes and lists. Outreach goes live by day 31, and if it isn’t, your next month is free.',
  },
  {
    q: 'Do you guarantee meetings?',
    a: 'No. We promise what we control (setup, targeting, volume and message quality) and report replies and meetings every week. Guarantees push agencies toward spam.',
  },
  {
    q: 'What do you need from me?',
    a: 'Access to your CRM and LinkedIn profile, a calendar link and someone to take the calls, one 30-minute content interview a month, and feedback on copy within 2 business days.',
  },
  {
    q: 'Is it safe for my LinkedIn account and domain?',
    a: 'Yes. LinkedIn outreach stays within safe limits (about 100 requests a week), and cold email goes from separate domains, never your main one.',
  },
  {
    q: 'Is it all written by AI?',
    a: 'AI drafts; people decide. A strategist reviews every message before it goes out, and you approve every post.',
  },
  {
    q: 'What if I’m not sure who my ICP is?',
    a: 'That’s what the sprint is for. We start with 3–4 candidates and let real replies pick the winner.',
  },
  {
    q: 'Can I buy just one piece?',
    a: 'Yes. LinkedIn Content, Lead Generation and Email infrastructure are also available on their own.',
  },
  {
    q: 'Who owns everything?',
    a: 'You do: domains, mailboxes, LinkedIn presence, lists, automations and content.',
  },
];

const choices = [
  {
    icon: RefreshCw,
    title: 'Keep us on',
    body: `Month to month, same system, same team. Stop with ${NOTICE_DAYS} days’ notice.`,
    tone: 'bg-brand text-on-brand',
  },
  {
    icon: KeyRound,
    title: 'Take the keys',
    body: 'We hand over every account, list and automation, plus a written playbook and a handover call.',
    tone: 'bg-accent text-on-accent',
  },
];

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-16 md:pb-36">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <div data-reveal className="flex flex-col gap-8 lg:sticky lg:top-28">
            <h2 id="faq-title" className="heading-1 max-w-[26rem]">
              Questions founders ask <span className="text-brand-text">before the sprint.</span>
            </h2>

            <div className="flex flex-col gap-4 rounded-xl bg-inverse-bg p-6 text-inverse-text md:p-7">
              <span className="heading-4">Day 90: you choose.</span>
              <ul className="flex flex-col gap-3">
                {choices.map(({ icon: Icon, title, body, tone }) => (
                  <li key={title} className="flex gap-4 rounded-lg bg-inverse-surface p-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${tone}`}>
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-semibold">{title}</span>
                      <span className="text-sm text-inverse-text-muted">{body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <span className="text-sm text-inverse-text-muted">You own everything either way.</span>
            </div>

            <div className="flex flex-col items-start gap-3">
              <span className="heading-4">Still have a question?</span>
              <p className="text-sm text-text-secondary">Ask us anything on a 30-minute call. No pitch deck.</p>
              <BookDemoButton variant="dark" size="sm" />
            </div>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {faqs.map(({ q, a }) => (
            <li key={q} data-reveal>
              <details className="group rounded-lg border border-border bg-surface transition-colors open:bg-bg [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-5 py-4 heading-4 max-md:text-[1.0625rem] md:gap-6 md:px-6 md:py-5">
                  {q}
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-text transition-transform duration-300 ease-out-soft group-open:rotate-45 group-open:bg-brand group-open:text-on-brand">
                    <Plus className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                </summary>
                <p className="max-w-[40rem] px-5 pb-5 text-text-secondary md:px-6 md:pb-6">{a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
