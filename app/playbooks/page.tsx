import { Clock3, Mail, PenLine, Radar } from 'lucide-react';
import type { Metadata } from 'next';
import { BookDemoButton } from '@/components/BookDemoButton';
import { PageShell } from '@/components/PageShell';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GridBackdrop } from '@/components/ui/GridBackdrop';

const title = 'Playbooks | Veleads';
const description =
  'The outbound and LinkedIn playbooks we run for B2B AI & SaaS founders, written up step by step so you can see exactly how the sprint works.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/playbooks' },
  openGraph: { title, description, url: '/playbooks' },
  twitter: { title, description },
};

// Planned playbooks. Each becomes a link once it's published.
const playbooks = [
  {
    icon: Mail,
    topic: 'Email Outbound',
    title: 'Cold email infrastructure that stays out of spam',
    body: 'Domains, mailboxes, authentication and warm-up, the way we set it up for every client.',
  },
  {
    icon: Radar,
    topic: 'LinkedIn Outreach',
    title: 'Signal-based LinkedIn outreach from a founder profile',
    body: 'Which signals we track, how we write the first message, and how we keep accounts safe.',
  },
  {
    icon: PenLine,
    topic: 'LinkedIn Content',
    title: 'A founder content system that runs on one call a month',
    body: 'How one 30-minute interview turns into three posts a week in your own voice.',
  },
];

export default function PlaybooksPage() {
  return (
    <PageShell>
      <section className="pt-[72px]">
        <div className="panel relative isolate overflow-hidden bg-bg py-16 md:py-28">
          <GridBackdrop />
          <div className="container-page flex flex-col items-center gap-6 text-center">
            <Eyebrow>Playbooks</Eyebrow>
            <h1 className="display-l max-w-[48rem]">
              How we build pipeline, <span className="text-brand-text">step by step.</span>
            </h1>
            <p className="lead max-w-[38rem] text-text-secondary max-md:text-[1.0625rem] max-md:leading-relaxed">
              The playbooks we run for B2B AI &amp; SaaS founders, written up in full. Use them yourself, or let us run
              them for you.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="playbooks-title" className="py-16 md:py-28">
        <div className="container-page flex flex-col gap-10">
          <h2 id="playbooks-title" data-reveal className="heading-1">
            First playbooks, <span className="text-brand-text">coming soon.</span>
          </h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {playbooks.map(({ icon: Icon, topic, title, body }) => (
              <li key={title} data-reveal className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-subtle">
                    <Icon className="h-5 w-5 text-brand-text" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium text-text-muted">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                    Coming soon
                  </span>
                </div>
                <span className="text-sm font-semibold text-brand-text">{topic}</span>
                <h3 className="heading-4">{title}</h3>
                <p className="text-text-secondary">{body}</p>
              </li>
            ))}
          </ul>

          <div data-reveal className="flex flex-col items-start gap-4 rounded-xl bg-inverse-bg p-7 text-inverse-text md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex flex-col gap-2">
              <span className="heading-3">Rather we just run it for you?</span>
              <p className="text-inverse-text-muted">Book a 30-minute strategy call. We research 3 of your target accounts live.</p>
            </div>
            <BookDemoButton variant="light" className="shrink-0" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
