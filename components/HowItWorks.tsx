'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, type ReactNode } from 'react';
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

const steps: Step[] = [
  {
    tags: ['Days 1\u201330', 'Foundation'],
    title: 'Find your buyers. Build the engine.',
    desc: 'We research 3\u20134 ICPs and map your market, set up sending domains and mailboxes in your name, optimise your LinkedIn profile and start posting.',
    outcome: '3\u20134 ICPs',
    outcomeLabel: 'Researched and signed off with you',
    visual: (
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex max-w-[420px] flex-wrap justify-center gap-2">
          <Chip>B2B SaaS, 50 to 500 staff</Chip>
          <Chip>Hiring SDRs</Chip>
          <Chip>Recently funded</Chip>
        </div>
        <Checklist
          items={[
            ['Domains bought', true],
            ['Mailboxes warming', false],
            ['Profile optimised', true],
            ['First posts live', true],
          ]}
        />
      </div>
    ),
  },
  {
    tags: ['Days 31\u201360', 'Launch'],
    title: 'Go live on LinkedIn and email.',
    desc: 'Signal-based outreach goes live on both channels, your posts run three times a week, and we work ABM plays on your gold-tier accounts, typically around 200. Replies come to us; meetings land on your calendar.',
    outcome: 'Top accounts',
    outcomeLabel: 'Worked across LinkedIn and email',
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
    tags: ['Days 61\u201390', 'Focus'],
    title: 'Double down on what books meetings.',
    desc: 'We compare every ICP across both channels, pick the winner, and tune copy and content to it. On day 90 you get a review and a plan, then you decide: keep us on, or take the keys.',
    outcome: '1 ICP',
    outcomeLabel: 'Proven by real replies',
    visual: (
      <div className="flex w-full max-w-[380px] flex-col gap-4 rounded-lg bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-muted">Replies by ICP</span>
          <span className="text-xs text-text-muted">Day 75</span>
        </div>
        <ul className="flex flex-col gap-3">
          {[
            ['ICP A', 38, false],
            ['ICP B', 86, true],
            ['ICP C', 52, false],
            ['ICP D', 24, false],
          ].map(([name, w, win]) => (
            <li key={name as string} className="flex items-center gap-3 text-sm">
              <span className="w-12 shrink-0 font-medium">{name}</span>
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-surface-sunken" aria-hidden="true">
                <span
                  style={{ width: `${w}%` }}
                  className={`block h-full rounded-full ${win ? 'bg-accent' : 'bg-brand-subtle'}`}
                />
              </span>
              {win && <span className="text-xs font-semibold text-accent-text">Winner</span>}
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
              What happens in <span className="text-brand-text">your 90 days.</span>
            </h2>
            <p className="text-text-secondary">
              A report every week, a call every two weeks. Days 1&ndash;30 produce few meetings by design: that&rsquo;s
              when your profile, mailboxes and lists warm up.
            </p>
          </div>
          <BookDemoButton variant="dark" className="shrink-0 self-start sm:self-auto" />
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
