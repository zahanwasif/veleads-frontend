import { ArrowUpRight, Check } from 'lucide-react';
import Link from 'next/link';
import {
  EMAIL_LIVE_DAY,
  LINKEDIN_LIVE_DAY,
  MEETINGS_PER_CYCLE,
  OFFER_NAME,
  OFFER_PATH,
} from '@/lib/guarantee';
import { services } from '@/lib/services';
import { Button } from './ui/Button';
import { Eyebrow } from './ui/Eyebrow';

// Homepage entry point to the offer page and the three single services. No prices here:
// pricing lives on the offer page.
const offerIncludes = [
  `${MEETINGS_PER_CYCLE} qualified meetings every 30 days, or cash back`,
  `LinkedIn live in ${LINKEDIN_LIVE_DAY} days, email in ${EMAIL_LIVE_DAY}`,
  'LinkedIn content, signal-based outreach and cold email as one system',
  'All tools included, about 1 hour a week from you',
];

export function WaysToWork() {
  return (
    <section id="work-with-us" aria-labelledby="work-title" className="pb-16 md:pb-28">
      <div className="container-page flex flex-col gap-10">
        <div data-reveal className="flex flex-col gap-4">
          <span className="eyebrow text-brand-text">Ways to work with us</span>
          <h2 id="work-title" className="heading-1 max-w-[40rem]">
            Start with one piece, <span className="text-brand-text">or let us fill your calendar.</span>
          </h2>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div data-reveal className="flex flex-col gap-6 rounded-xl bg-inverse-bg p-7 text-inverse-text md:p-10">
            <Eyebrow tone="dark" className="self-start">Our flagship</Eyebrow>
            <div className="flex flex-col gap-3">
              <h3 className="heading-1">{OFFER_NAME}</h3>
              <p className="max-w-[32rem] text-inverse-text-muted">
                All three services, run together, with a guaranteed number of qualified sales calls every month. For
                founders who qualify.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {offerIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button href={OFFER_PATH} variant="light" label={`See ${OFFER_NAME}`} className="mt-auto self-start" />
          </div>

          <ul className="flex flex-col gap-3">
            {services.map((s) => (
              <li key={s.slug} data-reveal className="flex-1">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-start justify-between gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border-strong hover:bg-bg md:p-7"
                >
                  <span className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-subtle">
                      <s.icon className="h-5 w-5 text-brand-text" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="heading-4">{s.title}</span>
                      <span className="text-sm text-text-secondary">{s.short}</span>
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 transition-transform duration-300 ease-out-soft group-hover:rotate-45"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
