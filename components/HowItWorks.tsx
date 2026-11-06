'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import {
  CYCLE_DAYS,
  EMAIL_LIVE_DAY,
  LINKEDIN_LIVE_DAY,
  MEETINGS_PER_CYCLE,
  REFUND_PER_MEETING,
  usd,
} from '@/lib/guarantee';
import { BookDemoButton } from './BookDemoButton';
import { useCardStack } from './ui/useCardStack';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Step = {
  tags: string[];
  title: string;
  desc: string;
  outcome: string;
  outcomeLabel: string;
  visual: ReactNode;
};

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text shadow-sm">
      {children}
    </span>
  );
}

function Checklist({ items }: { items: [string, boolean][] }) {
  return (
    <ul className="flex w-full max-w-[380px] flex-col gap-2">
      {items.map(([label, done]) => (
        <li key={label} className="flex items-center justify-between rounded-md bg-surface px-4 py-3 text-sm shadow-sm">
          <span className="font-medium">{label}</span>
          <span className={`flex items-center gap-2 ${done ? 'text-accent-text' : 'text-text-muted'}`}>
            <span aria-hidden="true" className={`h-2 w-2 rounded-full ${done ? 'bg-mint-500' : 'bg-border-strong'}`} />
            {done ? 'Done' : 'In progress'}
          </span>
        </li>
      ))}
    </ul>
  );
}

const meetingsThisCycle = ['VP Sales', 'Founder', 'Head of Growth', 'CTO', 'Head of RevOps', 'COO', 'Head of Sales', 'CEO'];

const steps: Step[] = [
  {
    tags: [`Days 0\u2013${LINKEDIN_LIVE_DAY}`, 'Onboarding'],
    title: 'We set everything up. You approve the plan.',
    desc: 'One kickoff call. We agree your ideal customer with you, set up sending domains and mailboxes in your name, optimise your LinkedIn profile and build your first target list. You never touch a tool.',
    outcome: `Day ${LINKEDIN_LIVE_DAY}`,
    outcomeLabel: 'LinkedIn outreach live',
    visual: (
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex max-w-[420px] flex-wrap justify-center gap-2">
          <Chip>B2B, 50 to 500 staff</Chip>
          <Chip>Hiring SDRs</Chip>
          <Chip>Recently funded</Chip>
        </div>
        <Checklist
          items={[
            ['Ideal customer signed off', true],
            ['Domains bought', true],
            ['Profile optimised', true],
            ['Mailboxes warming', false],
          ]}
        />
      </div>
    ),
  },
  {
    tags: [`Days ${LINKEDIN_LIVE_DAY}\u2013${EMAIL_LIVE_DAY}`, 'LinkedIn first'],
    title: 'LinkedIn goes live while email warms up.',
    desc: 'Signal-based outreach starts from your profile and your posts go out three times a week. Replies come to us and calls land on your calendar, while your mailboxes warm up for email.',
    outcome: `Day ${EMAIL_LIVE_DAY}`,
    outcomeLabel: 'Email live, guarantee starts',
    visual: (
      <ol className="flex w-full max-w-[360px] flex-col gap-3">
        {['LinkedIn connection', 'Email, day 3', 'LinkedIn message, day 6', 'Email follow-up, day 10'].map((touch, i) => (
          <li key={touch} className="flex items-center gap-3 rounded-md bg-surface px-4 py-3 text-sm shadow-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs font-semibold text-on-brand">
              {i + 1}
            </span>
            <span className="text-text-secondary">{touch}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    tags: [`Every ${CYCLE_DAYS} days`, 'Guaranteed'],
    title: `${MEETINGS_PER_CYCLE} qualified meetings, or cash back.`,
    desc: `Both channels work the accounts showing buying signals. A report every week, a call every two weeks. If a cycle ends short of ${MEETINGS_PER_CYCLE} qualified meetings, we refund ${usd(REFUND_PER_MEETING)} for each one missing.`,
    outcome: `${MEETINGS_PER_CYCLE}+`,
    outcomeLabel: 'Qualified meetings every cycle',
    visual: (
      <div className="flex w-full max-w-[380px] flex-col gap-4 rounded-lg bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-muted">Meetings this cycle</span>
          <span className="text-xs font-semibold text-accent-text">
            {meetingsThisCycle.length} of {MEETINGS_PER_CYCLE}
          </span>
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {meetingsThisCycle.map((who, i) => (
            <li key={`${who}-${i}`} className="flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-on-accent">
              <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={3} aria-hidden="true" />
              <span className="truncate">{who}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
];

export function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  useCardStack(root, { selector: '[data-stack-card]' });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Stacking only on desktop: on phones a card is taller than the screen.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector('[data-stack-inner]'), {
            scale: 0.92,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 140px', scrub: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="how-it-works" className="py-16 md:py-36">
      <div className="container-page flex flex-col gap-10 md:gap-12">
        <div data-reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-[40rem] flex-col gap-5">
            <h2 className="heading-1">
              From kickoff to booked calls <span className="text-brand-text">in {EMAIL_LIVE_DAY} days.</span>
            </h2>
            <p className="text-text-secondary">
              A report every week, a call every two weeks. You don&rsquo;t pay a monthly fee until both channels are
              live.
            </p>
          </div>
          <BookDemoButton variant="dark" label="See if you qualify" className="shrink-0 self-start sm:self-auto" />
        </div>

        <div className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <article
              key={step.title}
              data-stack-card
              className="md:sticky"
              style={{ top: `${104 + i * 14}px` }}
            >
              <div
                data-stack-inner
                className="grid origin-top overflow-hidden rounded-xl bg-brand-subtle p-3 md:min-h-[460px] md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
              >
                <div className="flex items-center justify-center p-4 md:min-h-[280px] md:p-10">{step.visual}</div>
                <div className="flex flex-col justify-between gap-8 rounded-lg bg-inverse-bg p-6 text-inverse-text max-md:order-first md:gap-10 md:p-8">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-[13px] font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-display text-[1.625rem] font-semibold leading-tight tracking-[-0.03em] md:text-[2rem]">
                      {step.title}
                    </h3>
                    <p className="text-inverse-text-muted">{step.desc}</p>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                    <span className="stat whitespace-nowrap text-accent max-sm:text-[2.25rem]">{step.outcome}</span>
                    <span className="text-sm text-inverse-text-muted sm:max-w-[9rem] sm:text-right">{step.outcomeLabel}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
