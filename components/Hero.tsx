'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CalendarDays, Check, ChevronsRight, ShieldCheck } from 'lucide-react';
import { Fragment, useRef } from 'react';
import {
  EMAIL_LIVE_DAY,
  LINKEDIN_LIVE_DAY,
  MEETINGS_PER_CYCLE,
  REFUND_PER_MEETING,
  usd,
} from '@/lib/guarantee';
import { BookCallLink } from './BookCallLink';
import { DomainForm } from './DomainForm';
import { LogoMark } from './Logo';
import { GridBackdrop } from './ui/GridBackdrop';
import { Eyebrow } from './ui/Eyebrow';

gsap.registerPlugin(useGSAP);

// Hero visual: one 30-day guarantee cycle, illustrative. Left card tracks the guarantee
// (speed and risk), right card shows the outcome: the meetings on the founder's calendar.
const CYCLE_DAY = 24;

const milestones = [
  { label: 'LinkedIn outreach live', day: `Day ${LINKEDIN_LIVE_DAY}` },
  { label: 'Email live, guarantee started', day: `Day ${EMAIL_LIVE_DAY}` },
];

// Four weeks of the cycle, Monday to Friday. Shows up to MEETINGS_PER_CYCLE of these meetings; add more if it rises.
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const weeks = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'];
const CURRENT_WEEK = 3;
const meetingPlan: { week: number; day: number; who: string }[] = [
  { week: 0, day: 1, who: 'Founder' },
  { week: 0, day: 3, who: 'VP Sales' },
  { week: 1, day: 0, who: 'Head of Growth' },
  { week: 1, day: 2, who: 'CTO' },
  { week: 2, day: 1, who: 'Head of RevOps' },
  { week: 2, day: 4, who: 'COO' },
  { week: 3, day: 0, who: 'VP Sales' },
  { week: 3, day: 2, who: 'CEO' },
];
const meetings = meetingPlan.slice(0, MEETINGS_PER_CYCLE);

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

// The homepage introduces Veleads; the offer page sells Guaranteed Meetings.
export function Hero({ variant = 'home' }: { variant?: 'home' | 'offer' }) {
  const offer = variant === 'offer';
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
      <div className="panel relative isolate overflow-hidden bg-bg pt-10 pb-52 md:pt-28 md:pb-64">
        <GridBackdrop />
        <div className="container-page flex flex-col items-center text-center">
          <span data-hero-eyebrow>
            <Eyebrow>
              <span>For B2B founders with $10k+ deals</span>
            </Eyebrow>
          </span>

          <h1 className="display-xl mt-6 max-w-5xl text-text md:mt-7">
            <Words text={offer ? `${MEETINGS_PER_CYCLE} sales calls a month.` : 'You close the deals.'} />
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
            <Words text={offer ? 'Or your' : 'We fill'} />
            <Words text={offer ? 'money back.' : 'your calendar.'} className="text-brand-text" />
          </h1>

          <p data-hero-sub className="lead mt-6 max-w-[42rem] text-text-secondary max-md:text-[1.0625rem] max-md:leading-relaxed md:mt-7">
            {offer ? (
              <>
                LinkedIn outreach live in 3 days, email in 21. Then{' '}
                <span className="font-semibold text-text">{MEETINGS_PER_CYCLE} qualified sales calls every 30 days</span>, or cash back for
                each one we miss.
              </>
            ) : (
              <>
                We book qualified sales calls with your buyers through LinkedIn and email.{' '}
                <span className="font-semibold text-text">{MEETINGS_PER_CYCLE} a month, guaranteed, or cash back.</span>
              </>
            )}
          </p>

          <div data-hero-cta className="mt-8 flex w-full flex-col items-center gap-4">
            {offer ? (
              <>
                <DomainForm />
                <p className="text-sm text-text-muted">
                  Free, takes about 20 seconds. Ready to talk? <BookCallLink label="See if you qualify" />
                </p>
              </>
            ) : (
              <>
                <DomainForm buttonLabel="Get my free plan" />
                <p className="text-sm text-text-muted">Free, takes about 20 seconds.</p>
              </>
            )}
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
            <div className="rounded-xl border border-border bg-surface p-5 text-left shadow-lg sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="eyebrow text-text-muted">Your guarantee</span>
                <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium text-text-muted">
                  Cycle 2 · day {CYCLE_DAY} of 30
                </span>
              </div>

              <ul className="flex flex-col gap-2">
                {milestones.map((m) => (
                  <li
                    key={m.label}
                    data-hero-row
                    className="flex items-center gap-3 rounded-md bg-surface-sunken px-3.5 py-3 text-sm"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="flex-1 font-medium">{m.label}</span>
                    <span className="text-xs font-medium text-text-muted">{m.day}</span>
                  </li>
                ))}
              </ul>

              <div data-hero-row className="mt-2 flex flex-col gap-3 rounded-md bg-brand-subtle px-3.5 py-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium">Qualified meetings this cycle</span>
                  <span className="font-display text-xl font-semibold tracking-[-0.02em]">
                    {meetings.length} <span className="text-sm font-medium text-text-muted">of {MEETINGS_PER_CYCLE}</span>
                  </span>
                </div>
                <div
                  role="img"
                  aria-label={`${meetings.length} of ${MEETINGS_PER_CYCLE} guaranteed meetings booked`}
                  className="grid gap-1"
                  style={{ gridTemplateColumns: `repeat(${MEETINGS_PER_CYCLE}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: MEETINGS_PER_CYCLE }, (_, i) => (
                    <span
                      key={i}
                      className={`h-2 rounded-full ${i < meetings.length ? 'bg-mint-500' : 'bg-surface'}`}
                    />
                  ))}
                </div>
              </div>

              <p data-hero-row className="mt-4 flex items-start gap-2.5 text-sm text-text-secondary">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-text" aria-hidden="true" />
                <span>
                  Short of {MEETINGS_PER_CYCLE}?{' '}
                  <span className="font-semibold text-text">{usd(REFUND_PER_MEETING)} back</span> for each one
                  missing.
                </span>
              </p>
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
              This cycle · {meetings.length} of {MEETINGS_PER_CYCLE}
            </span>
          </div>

          <div
            className="grid grid-cols-[2.25rem_repeat(5,minmax(0,1fr))] gap-1.5"
            role="img"
            aria-label={`A 30-day cycle with ${meetings.length} qualified sales calls booked`}
          >
            <span aria-hidden="true" />
            {days.map((d) => (
              <span key={d} className="py-1 text-center text-xs font-semibold text-inverse-text-muted">
                {d}
              </span>
            ))}
            {weeks.map((label, week) => (
              <Fragment key={label}>
                <span
                  className={`flex items-start pt-1 text-[10px] ${
                    week === CURRENT_WEEK ? 'font-semibold text-accent' : 'text-inverse-text-muted'
                  }`}
                >
                  {label}
                </span>
                {days.map((d, day) => {
                  const m = meetings.find((x) => x.week === week && x.day === day);
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
              {MEETINGS_PER_CYCLE} sales calls a month, <span className="text-accent">booked for you.</span>
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
