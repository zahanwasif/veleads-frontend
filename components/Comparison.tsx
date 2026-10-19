'use client';

import { Check, X } from 'lucide-react';
import { useRef } from 'react';
import { LogoMark } from './Logo';
import { BookDemoButton } from './BookDemoButton';
import { PlanCta } from './PlanCta';
import { Eyebrow } from './ui/Eyebrow';
import { useCardStack } from './ui/useCardStack';

const options = ['Hiring an SDR', 'Typical agency'] as const;

const rows: { label: string; sdr: string; agency: string; us: string }[] = [
  {
    label: 'Getting started',
    sdr: 'Months to hire and ramp',
    agency: 'Fast, on their templates',
    us: 'Outreach live by day 31',
  },
  {
    label: 'Inbound',
    sdr: 'None',
    agency: 'Outbound only',
    us: 'LinkedIn content warms up your market',
  },
  {
    label: 'Messages',
    sdr: 'Depends on one person',
    agency: 'Templates with a {first_name} token',
    us: 'A researched first line per prospect, checked by a person',
  },
  {
    label: 'Reporting',
    sdr: 'Whatever they track',
    agency: 'Monthly PDFs of sends and opens',
    us: 'Weekly, tied to replies and meetings',
  },
  {
    label: 'Ownership',
    sdr: 'Leaves when they leave',
    agency: 'The agency keeps domains and lists',
    us: 'You own every account, list and automation',
  },
  {
    label: 'Commitment',
    sdr: 'Salary, benefits, management',
    agency: 'Long retainers',
    us: '90 days, then month to month or take the keys',
  },
];

function Them({ text, who }: { text: string; who: string }) {
  return (
    <span className="flex items-start gap-2.5 text-sm text-text-muted md:text-base">
      <X className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
      <span>
        <span className="sr-only">{who}. </span>
        {text}
      </span>
    </span>
  );
}

function Us({ text }: { text: string }) {
  return (
    <span className="flex items-start gap-2.5 text-sm font-medium text-text md:text-base">
      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
      </span>
      <span>
        <span className="sr-only">Veleads sprint. </span>
        {text}
      </span>
    </span>
  );
}

export function Comparison() {
  const root = useRef<HTMLElement>(null);
  useCardStack(root);

  return (
    <section ref={root} aria-labelledby="comparison-title" className="pb-16 md:pb-36">
      <div className="panel bg-bg">
        <div className="container-page flex flex-col items-center gap-10 py-16 md:gap-14 md:py-32">
          <div data-reveal className="flex flex-col items-center gap-6 text-center">
            <Eyebrow>Why founders choose a sprint</Eyebrow>
            <h2 id="comparison-title" className="display-l max-w-[52rem] max-md:text-[2.25rem]">
              Hire an SDR. Hire an agency. <span className="text-brand-text">Or own the engine.</span>
            </h2>
          </div>

          <div data-reveal className="w-full max-w-[1100px]">
            {/* Column headers (desktop) */}
            <div className="hidden grid-cols-[10rem_1fr_1fr_1.2fr] gap-3 md:grid">
              <span />
              {options.map((o) => (
                <span
                  key={o}
                  className="flex h-14 items-center justify-center rounded-lg border border-border bg-surface text-sm font-medium text-text-secondary"
                >
                  {o}
                </span>
              ))}
              <span className="flex h-14 items-center justify-center gap-2 rounded-lg bg-brand text-on-brand">
                <LogoMark size={24} />
                <span className="font-display text-lg font-bold tracking-[-0.5px]">veleads sprint</span>
              </span>
            </div>

            {/* Phones: one compact card per row, our answer first */}
            <ul className="flex flex-col gap-2 md:hidden">
              {rows.map((row) => (
                <li key={row.label} data-stack className="flex flex-col gap-2.5 rounded-lg bg-surface p-4 shadow-[0_-8px_24px_rgba(16,18,51,0.06)]">
                  <span className="text-xs font-semibold uppercase tracking-[1.2px] text-text-muted">{row.label}</span>
                  <Us text={row.us} />
                  <div className="flex flex-col gap-1.5 text-sm text-text-muted">
                    <p className="flex items-baseline gap-2">
                      <span className="shrink-0 rounded bg-surface-sunken px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide">SDR</span>
                      {row.sdr}
                    </p>
                    <p className="flex items-baseline gap-2">
                      <span className="shrink-0 rounded bg-surface-sunken px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide">Agency</span>
                      {row.agency}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Desktop: full table */}
            <ul className="mt-2 hidden flex-col md:flex">
              {rows.map((row) => (
                <li
                  key={row.label}
                  className="grid grid-cols-[10rem_1fr_1fr_1.2fr] gap-3 border-b border-border py-5 last:border-b-0"
                >
                  <span className="text-sm font-semibold text-text">{row.label}</span>
                  <span className="px-4">
                    <Them text={row.sdr} who="Hiring an SDR" />
                  </span>
                  <span className="px-4">
                    <Them text={row.agency} who="Typical agency" />
                  </span>
                  <span className="px-4">
                    <Us text={row.us} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <BookDemoButton variant="primary" label="Check if we’re a fit" className="w-full sm:w-auto" />
            <PlanCta className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
