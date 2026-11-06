import { Plus } from 'lucide-react';
import {
  EMAIL_LIVE_DAY,
  FOUNDING_SPOTS,
  LATE_REFUND_CAP,
  LATE_REFUND_PER_WEEK,
  LINKEDIN_LIVE_DAY,
  MEETINGS_PER_CYCLE,
  MIN_MONTHS,
  MONTHLY_FEE,
  OFFER_NAME,
  ONBOARDING_FEE,
  REFUND_DAYS,
  REFUND_PER_MEETING,
  usd,
} from '@/lib/guarantee';
import { BookDemoButton } from './BookDemoButton';

const meetingDefinition = `A call that actually happens with someone who matches the ideal customer we signed off with you in onboarding: the right title, company size and industry. No-shows don't count, and we rebook them. If the person matches and you decide on the call they're not for you, it still counts.`;

const refundAnswer = `For every qualified meeting short of ${MEETINGS_PER_CYCLE} in a 30-day cycle, we pay back ${usd(REFUND_PER_MEETING)} (your monthly fee divided by ${MEETINGS_PER_CYCLE}) in cash, within ${REFUND_DAYS} days of the cycle ending.`;

// Homepage questions: about working with us at all.
const homeFaqs = [
  {
    q: 'What do you actually do?',
    a: 'We run LinkedIn content, signal-based LinkedIn outreach and cold email for B2B founders. We work out who to sell to, write and send the messages, handle the replies and book the calls on your calendar.',
  },
  {
    q: 'Do you really guarantee meetings?',
    a: `Yes, on ${OFFER_NAME}: ${MEETINGS_PER_CYCLE} qualified meetings every 30 days once your campaigns are live, or cash back for each one we miss. That's why we only take founders who pass our bar.`,
  },
  { q: 'What counts as a qualified meeting?', a: meetingDefinition },
  { q: 'How does the refund work?', a: refundAnswer },
  {
    q: 'What if I don’t qualify?',
    a: 'You can still work with us on LinkedIn Content, LinkedIn Outreach or Email Outbound on their own. They don’t come with the meeting guarantee.',
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
    q: 'Who owns the accounts and lists?',
    a: 'You do. Domains, mailboxes, LinkedIn presence, lists and content all stay in your name.',
  },
];

// Offer page questions: the price, the guarantee and the fine print.
const offerFaqs = [
  {
    q: 'What does it cost?',
    a: `${usd(ONBOARDING_FEE)} for onboarding, then ${usd(MONTHLY_FEE)} a month from the day both channels are live, with a ${MIN_MONTHS}-month minimum. All tools are included. The first ${FOUNDING_SPOTS} founders get the onboarding fee waived in exchange for a case study.`,
  },
  {
    q: 'When do meetings start?',
    a: `LinkedIn outreach goes live by day ${LINKEDIN_LIVE_DAY} and replies start soon after. Email goes live by day ${EMAIL_LIVE_DAY}, and that's when the first 30-day guarantee cycle starts.`,
  },
  { q: 'What counts as a qualified meeting?', a: meetingDefinition },
  { q: 'How does the refund work?', a: refundAnswer },
  {
    q: 'What if you’re late going live?',
    a: `We refund ${usd(LATE_REFUND_PER_WEEK)} of the onboarding fee for every week we miss day ${LINKEDIN_LIVE_DAY} for LinkedIn or day ${EMAIL_LIVE_DAY} for email, up to ${usd(LATE_REFUND_CAP)}. You don't pay a monthly fee until both are live.`,
  },
  {
    q: 'What do you need from me?',
    a: `About an hour a week: approve messages and posts within 48 hours, read the weekly report and join a 30-minute call every two weeks. We need LinkedIn and calendar access by day ${LINKEDIN_LIVE_DAY}, and someone to take the calls.`,
  },
  {
    q: 'When doesn’t the guarantee apply?',
    a: 'In a cycle where approvals take longer than 48 hours, booked calls are missed and not rebooked within a week, or access arrives late. Changing your ideal customer mid-cycle restarts that cycle, and pausing (for holidays, say) pauses the clock.',
  },
  {
    q: `What happens after ${MIN_MONTHS} months?`,
    a: 'You go month to month and the guarantee carries on. Stop any time with 30 days’ notice.',
  },
  {
    q: 'Is it safe for my LinkedIn account and domain?',
    a: 'Yes. LinkedIn outreach stays within safe limits (about 100 requests a week), and cold email goes from separate domains, never your main one.',
  },
  {
    q: 'Who owns the accounts and lists?',
    a: 'You do. Domains, mailboxes, LinkedIn presence, lists and content all stay in your name.',
  },
];

export function FAQ({ variant = 'home' }: { variant?: 'home' | 'offer' }) {
  const offer = variant === 'offer';
  const faqs = offer ? offerFaqs : homeFaqs;
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-16 md:pb-36">
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <div data-reveal className="flex flex-col gap-8 lg:sticky lg:top-28">
            <h2 id="faq-title" className="heading-1 max-w-[26rem]">
              Questions founders ask{' '}
              <span className="text-brand-text">{offer ? 'before signing up.' : 'before working with us.'}</span>
            </h2>

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
