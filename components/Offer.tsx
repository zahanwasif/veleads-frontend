import { CalendarCheck2, Sparkles } from 'lucide-react';
import { BookDemoButton } from './BookDemoButton';
import { Eyebrow } from './ui/Eyebrow';

// What a sprint delivers by day 90. Volumes based on our live campaigns.
const deliverables = [
  { value: '~2,500', label: 'prospects researched and emailed' },
  { value: '~800', label: 'prospects contacted on LinkedIn' },
  { value: '~36', label: 'founder posts published on LinkedIn' },
  { value: '3–4', label: 'ICPs tested, one winner proven by real replies' },
  { value: '100%', label: 'of domains, mailboxes and lists in your name' },
  { value: 'Weekly', label: 'reports, plus a plan for the next 90 days' },
];

const PRICE = '$4,500';
const FOUNDING_PRICE = '$3,000';
const FOUNDING_SPOTS = 3;

export function Offer() {
  return (
    <section id="pricing" aria-labelledby="offer-title" className="pb-16 md:pb-36">
      <div className="container-page flex flex-col gap-10">
        <div data-reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>The 90-Day Pipeline Sprint</Eyebrow>
          <h2 id="offer-title" className="heading-1 max-w-[40rem]">
            What you get, <span className="text-brand-text">in numbers.</span>
          </h2>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div data-reveal className="flex flex-col gap-6 rounded-xl bg-bg p-7 md:p-10">
            <span className="heading-4">By day 90 you&rsquo;ll have</span>
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {deliverables.map((d) => (
                <li key={d.label} className="flex flex-col gap-1 border-t border-border pt-4">
                  <span className="font-display text-[2.25rem] font-semibold leading-none tracking-[-0.03em] text-brand-text">{d.value}</span>
                  <span className="text-text-secondary">{d.label}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-text-muted">
              Volumes are typical for one founder profile and one sending setup. We agree exact numbers on the call.
            </p>
          </div>

          <div data-reveal className="flex flex-col gap-6 rounded-xl bg-inverse-bg p-7 text-inverse-text md:p-10">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-accent px-3 py-1 text-[13px] font-semibold text-on-accent">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Founding rate for the next {FOUNDING_SPOTS} companies
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-inverse-text-muted">Founding rate</span>
              <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-[3.5rem] font-semibold leading-none tracking-[-0.04em]">{FOUNDING_PRICE}</span>
                <del className="font-display text-2xl font-medium text-inverse-text-muted decoration-accent decoration-2">
                  <span className="sr-only">Regular price </span>
                  {PRICE}
                </del>
              </span>
              <span className="text-inverse-text-muted">per 90-day sprint</span>
            </div>

            <ul className="flex flex-col gap-2 border-t border-white/10 pt-5 text-sm text-inverse-text-muted">
              <li>Less than one month of an SDR.</li>
              <li>Tools billed at cost, paid directly to vendors.</li>
              <li>After day 90: month to month, or take the keys.</li>
            </ul>

            <div className="flex gap-3 rounded-lg bg-inverse-surface p-4">
              <CalendarCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <p className="text-sm">
                <span className="font-semibold">Our day-31 promise.</span>{' '}
                <span className="text-inverse-text-muted">
                  If your outreach isn&rsquo;t live by day 31, your next month is free.
                </span>
              </p>
            </div>

            <BookDemoButton variant="light" label="Claim a founding spot" className="mt-auto w-full sm:w-auto sm:self-start" />
          </div>
        </div>
      </div>
    </section>
  );
}
