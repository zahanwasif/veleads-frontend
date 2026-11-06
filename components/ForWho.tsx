import { Check, X } from 'lucide-react';
import { MIN_DEAL_SIZE, MIN_REACHABLE_ACCOUNTS, usd } from '@/lib/guarantee';
import { BookDemoButton } from './BookDemoButton';

// The bars a founder must pass before we offer the meeting guarantee. Checked on the call.
const forYou = [
  `Your deals are worth ${usd(MIN_DEAL_SIZE)} a year or more`,
  `There are at least ${MIN_REACHABLE_ACCOUNTS.toLocaleString('en-US')} companies you could sell to`,
  'You have a live product and at least one paying customer',
  'You, or someone on your team, can take the sales calls we book',
];

const notForYou = [
  `Your deals are under ${usd(MIN_DEAL_SIZE)} a year, so one meeting can’t pay for outreach`,
  'You don’t have a product customers can buy yet',
  'Your market is a few dozen companies you already know by name',
  'You want 10,000 emails a week and don’t mind the spam folder',
];

export function ForWho() {
  return (
    <section id="who-qualifies" aria-labelledby="for-who-title" className="pb-16 md:pb-28">
      <div className="container-page flex flex-col gap-10">
        <div data-reveal className="flex flex-col gap-4">
          <span className="eyebrow text-brand-text">Who qualifies</span>
          <h2 id="for-who-title" className="heading-1 max-w-[44rem]">
            We only take founders <span className="text-brand-text">we can book meetings for.</span>
          </h2>
          <p className="max-w-[40rem] text-text-secondary">
            That&rsquo;s how we can guarantee them. We agree your ideal customer with you before anything goes out.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div data-reveal className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-7 md:p-8">
            <span className="heading-4">You qualify if</span>
            <ul className="flex flex-col gap-3.5">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="flex flex-col gap-5 rounded-xl bg-bg p-7 md:p-8">
            <span className="heading-4">It&rsquo;s not for you if</span>
            <ul className="flex flex-col gap-3.5">
              {notForYou.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-border text-text-muted">
                    <X className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <BookDemoButton variant="dark" label="See if you qualify" />
          <span className="text-sm text-text-muted">
            Below the bar? Our single services don&rsquo;t need it.
          </span>
        </div>
      </div>
    </section>
  );
}
