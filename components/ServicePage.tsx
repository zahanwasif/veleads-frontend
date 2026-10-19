import { ArrowUpRight, Check, Plus } from 'lucide-react';
import Link from 'next/link';
import { offers } from '@/lib/offers';
import { services, type Service } from '@/lib/services';
import { BookCallLink } from './BookCallLink';
import { BookDemoButton } from './BookDemoButton';
import { DomainForm } from './DomainForm';
import { PlanCta } from './PlanCta';
import { ServiceVisual } from './ServiceVisual';
import { Button } from './ui/Button';
import { Eyebrow } from './ui/Eyebrow';
import { GridBackdrop } from './ui/GridBackdrop';

const FORM_ID = 'service-form';

export function ServicePage({ service }: { service: Service }) {
  const offer = offers[service.offer];
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      {/* Hero */}
      <section className="pt-[72px]">
        <div className="panel relative isolate overflow-hidden bg-bg py-12 md:py-24">
          <GridBackdrop />
          <div className="container-page grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>{service.eyebrow}</Eyebrow>
              <h1 className="display-l max-w-[40rem]">
                {service.headline} <span className="text-brand-text">{service.headlineAccent}</span>
              </h1>
              <p className="lead max-w-[36rem] text-text-secondary max-md:text-[1.0625rem] max-md:leading-relaxed">
                {service.intro}
              </p>
              <div className="flex w-full flex-col items-start gap-3">
                <DomainForm offerId={service.offer} inputId={FORM_ID} />
                <p className="text-sm text-text-muted">
                  {offer.note} Prefer to talk? <BookCallLink />
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-brand-subtle p-5 shadow-lg ring-1 ring-border sm:p-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-surface">
                <service.icon className="h-5 w-5 text-brand-text" strokeWidth={2} aria-hidden="true" />
              </div>
              <ServiceVisual slug={service.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section aria-labelledby="included-title" className="py-16 md:py-28">
        <div className="container-page flex flex-col gap-10 md:gap-14">
          <div data-reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4">
              <Eyebrow tone="sunken" className="self-start">What you get</Eyebrow>
              <h2 id="included-title" className="heading-1 max-w-[36rem]">
                Everything included, <span className="text-brand-text">done for you.</span>
              </h2>
            </div>
            <PlanCta variant="dark" label={offer.button} targetId={FORM_ID} className="shrink-0 self-start md:self-auto" />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.included.map((item) => (
              <li
                key={item.title}
                data-reveal
                className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 transition-[translate,box-shadow] duration-300 ease-out-soft hover:shadow-[0_12px_28px_rgba(16,18,51,0.08)] motion-safe:hover:-translate-y-1"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-on-accent">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <h3 className="heading-4">{item.title}</h3>
                <p className="text-text-secondary">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="steps-title" className="pb-16 md:pb-28">
        <div className="panel bg-inverse-bg text-inverse-text">
          <div className="container-page flex flex-col gap-10 py-16 md:gap-14 md:py-24">
            <div data-reveal className="flex flex-col gap-4">
              <Eyebrow tone="dark" className="self-start">How it works</Eyebrow>
              <h2 id="steps-title" className="heading-1 max-w-[36rem]">
                Four steps. <span className="text-accent">You only do the first.</span>
              </h2>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {service.steps.map((step, i) => (
                <li key={step.title} data-reveal className="flex flex-col gap-3 rounded-xl bg-inverse-surface p-6">
                  <span className="text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="heading-4">{step.title}</h3>
                  <p className="text-sm text-inverse-text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Promise and proof */}
      <section aria-labelledby="promise-title" className="pb-16 md:pb-28">
        <div className={`container-page grid gap-3 ${service.proof ? 'lg:grid-cols-2' : ''}`}>
          <div data-reveal className="flex flex-col justify-between gap-6 rounded-xl bg-brand-subtle p-7 md:p-10">
            <Eyebrow className="self-start">What we promise</Eyebrow>
            <div className="flex flex-col gap-3">
              <h2 id="promise-title" className="heading-1 max-w-[32rem]">
                {service.promise.title}
              </h2>
              <p className="max-w-[32rem] text-text-secondary">{service.promise.body}</p>
            </div>
          </div>
          {service.proof && (
            <figure data-reveal className="flex flex-col justify-between gap-6 rounded-xl bg-accent p-7 text-on-accent md:p-10">
              <Eyebrow tone="sunken" className="self-start">Proof</Eyebrow>
              <div className="flex flex-col gap-3">
                <span className="stat">{service.proof.value}</span>
                <span className="heading-4 max-w-[26rem]">{service.proof.label}</span>
                <figcaption className="text-sm">{service.proof.note}</figcaption>
              </div>
            </figure>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="service-faq-title" className="pb-16 md:pb-28">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div data-reveal className="flex flex-col items-start gap-6">
            <h2 id="service-faq-title" className="heading-1 max-w-[24rem]">
              Good to know.
            </h2>
            <p className="max-w-[24rem] text-text-secondary">Anything else? Ask us on a 30-minute call. No pitch deck.</p>
            <BookDemoButton variant="dark" size="sm" />
          </div>
          <ul className="flex flex-col gap-3">
            {service.faqs.map(({ q, a }) => (
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

      {/* Cross-sell into the sprint */}
      <section aria-labelledby="sprint-title" className="pb-16 md:pb-28">
        <div className="container-page">
          <div data-reveal className="grid gap-8 rounded-xl bg-inverse-bg p-7 text-inverse-text md:p-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
            <div className="flex flex-col gap-4">
              <Eyebrow tone="dark" className="self-start">Better together</Eyebrow>
              <h2 id="sprint-title" className="heading-1 max-w-[32rem]">
                Run {service.title} with the other two. <span className="text-accent">That&rsquo;s the sprint.</span>
              </h2>
              <p className="max-w-[32rem] text-inverse-text-muted">
                The 90-Day Pipeline Sprint runs LinkedIn content, signal-based outreach and cold email as one system, with
                outreach live by day 31. Founding rate from $3,000.
              </p>
              <Button href="/#pricing" variant="light" label="See sprint pricing" className="mt-2 self-start" />
            </div>
            <ul className="flex flex-col gap-2">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-lg bg-inverse-surface p-4 transition-colors hover:bg-white/10"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-inverse-bg/60">
                        <s.icon className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-semibold">{s.title}</span>
                        <span className="text-sm text-inverse-text-muted">{s.short}</span>
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
    </>
  );
}
