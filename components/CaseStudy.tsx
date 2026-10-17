'use client';

import { ArrowUpRight, Mail, Quote, TrendingUp } from 'lucide-react';
import { useRef } from 'react';
import { BookDemoButton } from './BookDemoButton';
import { Eyebrow } from './ui/Eyebrow';
import { useCardStack } from './ui/useCardStack';

// GRAIXL sprint. Email numbers from their sending dashboard (2-week window).
const caseStudy = {
  client: 'GRAIXL',
  url: 'https://graixl.com',
  about: 'An AI interview platform for recruitment teams in Europe.',
  email: { sent: 915, bounces: 3, prospects: 622, replies: 21, meetings: 2 },
  // From the sending tool's mailbox health scores, as reported by the user.
  mailboxHealth: '97%+',
  // Size of GRAIXL's mapped target list (their reachable market). Set the real count to show coverage.
  reachableAccounts: null as number | null,
  // Projection, labelled as such on the page: 622 new prospects per two weeks over ~8 weeks of sending,
  // 3 emails per prospect, minus prospects who reply early (~85).
  projectedProspects: '~2,500',
  projectedEmails: '~7,300',
  emailsPerProspect: 3,
  // Paste Bhupinder's approved words here. The quote card stays hidden until then.
  testimonial: null as null | { quote: string; name: string; title: string },
};

const bounceRate = ((caseStudy.email.bounces / caseStudy.email.sent) * 100).toFixed(1);

export function CaseStudy() {
  const root = useRef<HTMLElement>(null);
  useCardStack(root, { media: '(max-width: 767px)' });
  const { testimonial } = caseStudy;

  return (
    <section ref={root} id="results" aria-labelledby="case-title" className="pt-20 pb-16 md:pt-28 md:pb-28">
      <div className="container-page flex flex-col gap-10">
        <div data-reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5">
            <Eyebrow className="self-start">Case study</Eyebrow>
            <h2 id="case-title" className="heading-1 max-w-[40rem]">
              GRAIXL reached {caseStudy.email.prospects} <strong className="font-bold">high quality</strong> prospects{' '}
              <span className="text-brand-text">in two weeks.</span>
            </h2>
          </div>
          <a
            href={caseStudy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-text md:self-auto"
          >
            <span className="flex flex-col text-left">
              <span>graixl.com</span>
              <span className="font-normal text-text-muted">{caseStudy.about}</span>
            </span>
            <ArrowUpRight
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-45"
              aria-hidden="true"
            />
          </a>
        </div>

        {testimonial && (
          <figure data-reveal className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-7 md:p-10">
            <Quote className="h-7 w-7 text-brand-text" aria-hidden="true" />
            <blockquote className="heading-3 max-w-[48rem] font-medium">&ldquo;{testimonial.quote}&rdquo;</blockquote>
            <figcaption className="flex flex-col">
              <span className="font-semibold">{testimonial.name}</span>
              <span className="text-sm text-text-muted">{testimonial.title}</span>
            </figcaption>
          </figure>
        )}

        <div className="grid gap-3 md:grid-cols-3">
          <div data-reveal data-stack className="flex flex-col justify-between gap-8 rounded-xl bg-accent p-7 text-on-accent md:p-8">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-inverse-bg px-3 py-1 text-[13px] font-medium text-inverse-text">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Deliverability
            </span>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="stat max-sm:text-[2.25rem]">{caseStudy.mailboxHealth}</span>
                  <span className="text-sm">mailbox health score</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="stat max-sm:text-[2.25rem]">{bounceRate}%</span>
                  <span className="text-sm">bounce rate</span>
                </div>
              </div>
              <span className="border-t border-on-accent/15 pt-4 text-sm">
                {caseStudy.email.bounces} bounces across {caseStudy.email.sent} emails, from a sending setup and lists
                built by Veleads.
              </span>
            </div>
          </div>

          <div data-reveal data-stack className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-7 md:p-8">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-surface-sunken px-3 py-1 text-[13px] font-medium">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Cold email, two weeks
            </span>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              {(
                [
                  ['sent', caseStudy.email.sent.toLocaleString('en-US'), 'emails sent'],
                  [
                    'prospects',
                    String(caseStudy.email.prospects),
                    <>
                      <strong className="font-semibold text-text">high quality</strong> prospects contacted
                    </>,
                  ],
                  ['replies', String(caseStudy.email.replies), 'replies'],
                  ['meetings', String(caseStudy.email.meetings), 'meetings booked'],
                ] as const
              ).map(([key, value, label]) => (
                <div key={key} className="flex flex-col gap-0.5 border-t border-border pt-3">
                  <dt className="order-2 text-sm text-text-muted">{label}</dt>
                  <dd className="order-1 font-display text-[1.75rem] font-semibold leading-none tracking-[-0.03em]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            {caseStudy.reachableAccounts && (
              <p className="mt-auto rounded-md bg-brand-subtle px-4 py-3 text-sm text-text">
                <span className="font-semibold">~{caseStudy.reachableAccounts.toLocaleString('en-US')} reachable accounts mapped.</span>{' '}
                {caseStudy.email.prospects} contacted in two weeks (
                {Math.round((caseStudy.email.prospects / caseStudy.reachableAccounts) * 100)}% of the market).
              </p>
            )}
          </div>

          <div data-reveal data-stack className="flex flex-col justify-between gap-8 rounded-xl bg-inverse-bg p-7 text-inverse-text md:p-8">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-3 py-1 text-[13px] font-medium">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              Projection
            </span>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="stat text-accent max-sm:text-[2.25rem]">{caseStudy.projectedProspects}</span>
                  <span className="text-sm text-inverse-text-muted">
                    <strong className="font-semibold text-inverse-text">high quality</strong> prospects reached
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="stat text-accent max-sm:text-[2.25rem]">{caseStudy.projectedEmails}</span>
                  <span className="text-sm text-inverse-text-muted">emails sent</span>
                </div>
              </div>
              <span className="border-t border-white/10 pt-4 text-sm text-inverse-text-muted">
                By day 90, at the current pace of {caseStudy.email.prospects} new prospects every two weeks and{' '}
                {caseStudy.emailsPerProspect} emails per prospect.
              </span>
            </div>
          </div>
        </div>

        <div data-reveal className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <BookDemoButton variant="dark" />
          <span className="text-sm text-text-muted">Want the same for your business?</span>
        </div>
      </div>
    </section>
  );
}
