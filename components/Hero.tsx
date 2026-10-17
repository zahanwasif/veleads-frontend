'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CalendarDays, Check, ChevronsRight, Clock3 } from 'lucide-react';
import { Fragment, useRef } from 'react';
import { CALENDLY_CONFIGURE_HINT, getCalendlyUrl } from '@/lib/calendly';
import { DomainForm } from './DomainForm';
import { LogoMark } from './Logo';
import { Eyebrow } from './ui/Eyebrow';

gsap.registerPlugin(useGSAP);

const phases = [
  { name: 'Foundation', days: 'Days 1–30', state: 'done' },
  { name: 'Launch', days: 'Days 31–60', state: 'active' },
  { name: 'Focus', days: 'Days 61–90', state: 'next' },
] as const;

const thisWeek = [
  { label: 'ICP shortlist approved', done: true },
  { label: 'Mailboxes warmed up', done: true },
  { label: 'Signal list refreshed', done: true },
  { label: 'Founder post scheduled', done: false },
];

// Illustrative week for the hero calendar.
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const slots = ['09:00', '11:00', '14:00', '16:00'];
const TODAY = 2; // Wednesday is highlighted
const meetings: { day: number; slot: number; who: string }[] = [
  { day: 0, slot: 1, who: 'VP Sales' },
  { day: 1, slot: 0, who: 'Founder' },
  { day: 1, slot: 3, who: 'Head of RevOps' },
  { day: 2, slot: 2, who: 'CTO' },
  { day: 3, slot: 1, who: 'Head of Growth' },
  { day: 4, slot: 0, who: 'COO' },
  { day: 4, slot: 2, who: 'VP Sales' },
];

function Words({ text, className = '' }: { text: string; className?: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} data-hero-word className={`inline-block ${className}`}>
          {w}&nbsp;
        </span>
      ))}
    </>
  );
}

function BookCallLink() {
  const url = getCalendlyUrl();
  const cls = 'font-semibold text-brand-text underline-offset-4 hover:underline';
  if (!url) {
    return (
      <span className={`${cls} cursor-not-allowed`} title={CALENDLY_CONFIGURE_HINT}>
        Book a strategy call &rarr;
      </span>
    );
  }
  return (
    <a href={url} className={cls}>
      Book a strategy call &rarr;
    </a>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('[data-hero-eyebrow]', { y: 12, opacity: 0, duration: 0.6 })
          .from(
            '[data-hero-word]',
            { y: 28, opacity: 0, filter: 'blur(10px)', duration: 0.9, stagger: 0.06 },
            0.1,
          )
          .from('[data-hero-sub]', { y: 16, opacity: 0, filter: 'blur(6px)', duration: 0.8 }, 0.55)
          .from('[data-hero-cta] > *', { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.7)
          .from('[data-hero-card]', { y: 80, opacity: 0, duration: 1.1, stagger: 0.12 }, 0.8)
          .from('[data-hero-row]', { x: -16, opacity: 0, duration: 0.5, stagger: 0.1, clearProps: 'transform,opacity' }, 1.3)
          .from('[data-hero-booked]', { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, 1.9)
          .from(
            '[data-hero-meeting]',
            { scale: 0.6, opacity: 0, duration: 0.4, ease: 'back.out(2)', stagger: 0.12, clearProps: 'transform,opacity' },
            1.4,
          );

        // If animation frames are throttled (background tab, hidden pane), never leave the hero faded.
        const settle = window.setTimeout(() => tl.progress(1), 3000);
        return () => window.clearTimeout(settle);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="pt-[72px]">
      <div className="panel bg-bg pt-10 pb-52 md:pt-28 md:pb-64">
        <div className="container-page flex flex-col items-center text-center">
          <span data-hero-eyebrow>
            <Eyebrow>
              <span>
                For AI &amp; SaaS founders<span className="max-[380px]:hidden">, pre-seed to Series A</span>
              </span>
            </Eyebrow>
          </span>

          <h1 className="display-xl mt-6 max-w-5xl text-text md:mt-7">
            <Words text="Stop prospecting." />
            <span
              data-hero-word
              aria-hidden="true"
              // Concentric corners: outer radius = logo tile radius (14/52 of 0.62em) + 0.1em inset.
              className="mx-1 hidden h-[0.82em] sm:inline-flex translate-y-[0.06em] items-center gap-[0.12em] rounded-[0.27em] bg-inverse-bg pl-[0.1em] pr-[0.2em] align-baseline"
            >
              <LogoMark className="h-[0.62em] w-[0.62em]" />
              <ChevronsRight className="h-[0.5em] w-[0.5em] text-accent" strokeWidth={2.5} />
            </span>{' '}
            <br className="hidden md:block" />
            <Words text="Start taking" />
            <Words text="sales calls." className="text-brand-text" />
          </h1>

          <p data-hero-sub className="lead mt-6 max-w-[42rem] text-text-secondary max-md:text-[1.0625rem] max-md:leading-relaxed md:mt-7">
            <span className="font-semibold text-text">The 90-day, done-for-you sprint on LinkedIn and email.</span>{' '}
            Outreach live by day 31, or your next month is free.
          </p>

          <div data-hero-cta className="mt-8 flex w-full flex-col items-center gap-4">
            <DomainForm />
            <p className="text-sm text-text-muted">
              Free, takes about 20 seconds. Prefer to talk?{' '}
              <BookCallLink />
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-3 -mt-44 grid gap-3 md:mx-8 md:-mt-48 md:gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div
          data-hero-card
          className="relative flex items-center justify-center overflow-hidden rounded-xl bg-brand-subtle p-4 sm:p-10 lg:min-h-[460px]"
        >
          <div aria-hidden="true" className="absolute -left-20 -bottom-24 h-72 w-72 rounded-full bg-brand/10" />
          <div className="relative w-full max-w-[540px]">
            <div className="rounded-xl border border-border bg-surface p-5 shadow-lg sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="eyebrow text-text-muted">Sprint progress</span>
                <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium text-text-muted">
                  Day 38 of 90
                </span>
              </div>

              <ol className="grid grid-cols-3 gap-2">
                {phases.map((phase) => (
                  <li key={phase.name} className="flex flex-col gap-2 text-left">
                    <span
                      aria-hidden="true"
                      className={`h-1.5 rounded-full ${
                        phase.state === 'done' ? 'bg-mint-500' : phase.state === 'active' ? 'bg-brand' : 'bg-border'
                      }`}
                    />
                    <span className="text-sm font-semibold">{phase.name}</span>
                    <span className="flex flex-col text-xs text-text-muted sm:flex-row sm:gap-1">
                      <span>{phase.state === 'done' ? 'Done' : phase.state === 'active' ? 'In progress' : 'Up next'}</span>
                      <span className="hidden sm:inline" aria-hidden="true">·</span>
                      <span className="whitespace-nowrap">{phase.days}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex flex-col gap-2">
                <span className="text-left text-xs font-medium text-text-muted">This week</span>
                <ul className="flex flex-col gap-2">
                  {thisWeek.map((item) => (
                    <li
                      key={item.label}
                      data-hero-row
                      className={`group flex items-center gap-3 rounded-md px-3.5 py-3 text-left text-sm transition-[translate,box-shadow,background-color] duration-300 ease-out-soft hover:shadow-[0_12px_28px_rgba(16,18,51,0.12)] motion-safe:hover:-translate-y-1 ${
                        item.done ? 'bg-surface-sunken hover:bg-surface' : 'bg-brand-subtle hover:bg-surface'
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          item.done ? 'bg-accent text-on-accent' : 'bg-brand text-on-brand'
                        }`}
                      >
                        {item.done ? (
                          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                        ) : (
                          <Clock3 className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                        )}
                      </span>
                      <span className="font-medium">{item.label}</span>
                      <span className="sr-only">{item.done ? 'done' : 'in progress'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              data-hero-booked
              className="absolute -right-3 -top-4 hidden items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-sm font-semibold text-on-accent shadow-md sm:inline-flex"
            >
              <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
              Meeting booked
            </div>
          </div>
        </div>

        <figure
          data-hero-card
          className="flex flex-col justify-between gap-6 rounded-xl bg-inverse-bg p-6 text-inverse-text sm:p-8 lg:min-h-[460px]"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" />
              Your calendar
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-inverse-text-muted">
              This week
            </span>
          </div>

          <div
            className="grid grid-cols-[2.25rem_repeat(5,minmax(0,1fr))] gap-1.5"
            role="img"
            aria-label={`A week with ${meetings.length} sales calls booked`}
          >
            <span aria-hidden="true" />
            {days.map((d, i) => (
              <span
                key={d}
                className={`rounded-md py-1 text-center text-xs font-semibold ${
                  i === TODAY ? 'bg-brand text-on-brand' : 'text-inverse-text-muted'
                }`}
              >
                {d}
              </span>
            ))}
            {slots.map((time, slot) => (
              <Fragment key={time}>
                <span className="flex items-start pt-1 text-[10px] text-inverse-text-muted">{time}</span>
                {days.map((d, day) => {
                  const m = meetings.find((x) => x.day === day && x.slot === slot);
                  return (
                    <span key={d} className="flex min-h-12 rounded-md bg-white/[0.04] p-1 sm:min-h-14">
                      {m && (
                        <span
                          data-hero-meeting
                          className="group flex w-full cursor-default flex-col justify-between rounded-[6px] bg-accent p-1.5 text-on-accent transition-[translate,box-shadow,background-color] duration-300 ease-out-soft hover:bg-accent-hover hover:shadow-[0_12px_28px_rgba(94,234,212,0.4)] motion-safe:hover:-translate-y-1.5"
                        >
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                          <span className="hidden truncate text-[10px] font-semibold leading-tight sm:block">
                            {m.who}
                          </span>
                        </span>
                      )}
                    </span>
                  );
                })}
              </Fragment>
            ))}
          </div>

          <div className="flex flex-col gap-1 border-t border-white/10 pt-5">
            <span className="heading-3">
              Sales calls, <span className="text-accent">booked for you.</span>
            </span>
            <figcaption className="text-sm text-inverse-text-muted">
              We handle the replies and the scheduling. You just show up.
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
