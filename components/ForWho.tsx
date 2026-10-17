import { Check, X } from 'lucide-react';
import { BookDemoButton } from './BookDemoButton';

const forYou = [
  'You run an AI or SaaS business, pre-seed to Series A',
  'You, the founder, still do the selling',
  'You don’t have an SDR team yet, or don’t want to build one',
  'You sell to other businesses, and one deal is worth a real conversation',
];

const notForYou = [
  'You don’t have a product customers can buy yet',
  'You sell a low-ticket product where one sale can’t pay for outreach',
  'You want 10,000 emails a week and don’t mind the spam folder',
  'Nobody on your side can take the sales calls we book',
];

export function ForWho() {
  return (
    <section aria-labelledby="for-who-title" className="pb-16 md:pb-28">
      <div className="container-page flex flex-col gap-10">
        <div data-reveal className="flex flex-col gap-4">
          <span className="eyebrow text-brand-text">Who it&rsquo;s for</span>
          <h2 id="for-who-title" className="heading-1 max-w-[40rem]">
            Built for founders <span className="text-brand-text">who still sell.</span>
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div data-reveal className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-7 md:p-8">
            <span className="heading-4">This is for you if</span>
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
          <BookDemoButton variant="dark" label="Check if we’re a fit" />
          <span className="text-sm text-text-muted">Sound like you? Let&rsquo;s look at your market together.</span>
        </div>
      </div>
    </section>
  );
}
