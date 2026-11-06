import { CalendarCheck2, Sparkles } from 'lucide-react';
import {
  EMAIL_LIVE_DAY,
  FOUNDING_SPOTS,
  LATE_REFUND_CAP,
  LATE_REFUND_PER_WEEK,
  LINKEDIN_LIVE_DAY,
  MEETINGS_PER_CYCLE,
  MIN_MONTHS,
  MONTHLY_FEE,
  NEW_FOUNDERS_PER_MONTH,
  OFFER_NAME,
  ONBOARDING_FEE,
  REFUND_DAYS,
  REFUND_PER_MEETING,
  usd,
} from '@/lib/guarantee';
import { BookDemoButton } from './BookDemoButton';
import { Eyebrow } from './ui/Eyebrow';

const minimumTotal = ONBOARDING_FEE + MONTHLY_FEE * MIN_MONTHS;
const minimumMeetings = MEETINGS_PER_CYCLE * MIN_MONTHS;

// The guarantee in plain words. These are the terms; the FAQ repeats the common ones.
const terms = [
  {
    title: 'What counts',
    body: 'A call that happens with someone matching the ideal customer we signed off together: title, company size and industry. No-shows are rebooked, not counted.',
  },
  {
    title: 'The meeting guarantee',
    body: `${MEETINGS_PER_CYCLE} qualified meetings in every 30-day cycle, starting on day ${EMAIL_LIVE_DAY}. For each one short, we pay back ${usd(REFUND_PER_MEETING)} in cash within ${REFUND_DAYS} days of the cycle ending.`,
  },
  {
    title: 'The speed guarantee',
    body: `LinkedIn live by day ${LINKEDIN_LIVE_DAY}, email by day ${EMAIL_LIVE_DAY}. For every week we're late, we refund ${usd(LATE_REFUND_PER_WEEK)} of the onboarding fee, up to ${usd(LATE_REFUND_CAP)}.`,
  },
  {
    title: 'Your part',
    body: `Approve messages and posts within 48 hours, give us LinkedIn and calendar access by day ${LINKEDIN_LIVE_DAY}, take or rebook calls within a week, and join a 30-minute call every two weeks.`,
  },
  {
    title: 'When it doesn’t apply',
    body: 'A cycle where your part slips isn’t covered. Changing your ideal customer mid-cycle restarts the cycle, and a pause stops the clock.',
  },
];

export function Offer() {
  return (
    <section id="pricing" aria-labelledby="offer-title" className="pb-16 md:pb-36">
      <div className="container-page flex flex-col gap-10">
        <div data-reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>{OFFER_NAME}</Eyebrow>
          <h2 id="offer-title" className="heading-1 max-w-[40rem]">
            What you pay, <span className="text-brand-text">and what we promise.</span>
          </h2>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div data-reveal className="flex flex-col gap-6 rounded-xl bg-bg p-7 md:p-10">
            <span className="heading-4">The guarantee, in full</span>
            <dl className="flex flex-col gap-5">
              {terms.map((t) => (
                <div key={t.title} className="flex flex-col gap-1 border-t border-border pt-4">
                  <dt className="font-semibold text-text">{t.title}</dt>
                  <dd className="text-text-secondary">{t.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal className="flex flex-col gap-6 rounded-xl bg-inverse-bg p-7 text-inverse-text md:p-10">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-accent px-3 py-1 text-[13px] font-semibold text-on-accent">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Onboarding fee waived for the first {FOUNDING_SPOTS} founders
            </span>

            <div className="flex flex-col gap-1">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-[3.5rem] font-semibold leading-none tracking-[-0.04em]">
                  {usd(MONTHLY_FEE)}
                </span>
                <span className="text-inverse-text-muted">a month</span>
              </span>
              <span className="text-inverse-text-muted">
                from day {EMAIL_LIVE_DAY}, plus {usd(ONBOARDING_FEE)} onboarding
              </span>
            </div>

            <ul className="flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-inverse-text-muted">
              <li>All tools included. One invoice.</li>
              <li>No monthly fee until both channels are live.</li>
              <li>{MIN_MONTHS}-month minimum, then month to month with the guarantee.</li>
            </ul>

            <div className="flex gap-3 rounded-lg bg-inverse-surface p-4">
              <CalendarCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-sm">
                <span className="font-semibold">
                  {usd(minimumTotal)} for at least {minimumMeetings} qualified meetings.
                </span>{' '}
                <span className="text-inverse-text-muted">
                  Over the {MIN_MONTHS}-month minimum, or cash back for every one we miss.
                </span>
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <BookDemoButton variant="light" label="See if you qualify" className="w-full sm:w-auto sm:self-start" />
              <span className="text-sm text-inverse-text-muted">
                We onboard {NEW_FOUNDERS_PER_MONTH} founders a month.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
