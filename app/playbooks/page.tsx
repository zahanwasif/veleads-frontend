import { ArrowUpRight, Clock3, Terminal } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookDemoButton } from '@/components/BookDemoButton';
import { PageShell } from '@/components/PageShell';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GridBackdrop } from '@/components/ui/GridBackdrop';
import { listPlaybooks, topicDetails } from '@/lib/playbooks';
import { getService } from '@/lib/services';

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

// Planned playbooks for topics that don't have a published one yet. Remove an entry once its playbook is live.
const upcoming = [
  {
    topic: 'linkedin-outreach' as const,
    title: 'Signal-based LinkedIn outreach from a founder profile',
    body: 'Which signals we track, how we write the first message, and how we keep accounts safe.',
  },
];

export default async function PlaybooksPage() {
  const published = await listPlaybooks();
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
            Read the playbooks, <span className="text-brand-text">then decide.</span>
          </h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {published.map((p) => {
              const { label, service } = topicDetails(p.topic);
              return (
                <li key={p.slug} data-reveal>
                  <Link
                    href={`/playbooks/${p.slug}`}
                    className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-[translate,box-shadow] duration-300 ease-out-soft hover:shadow-[0_12px_28px_rgba(16,18,51,0.08)] motion-safe:hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-subtle">
                        {service ? (
                          <service.icon className="h-5 w-5 text-brand-text" strokeWidth={2} aria-hidden="true" />
                        ) : (
                          <Terminal className="h-5 w-5 text-brand-text" strokeWidth={2} aria-hidden="true" />
                        )}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted">
                        <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                        {p.readingMinutes} min read
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-brand-text">{label}</span>
                    <h3 className="heading-4">{p.title}</h3>
                    <p className="text-text-secondary">{p.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-text">
                      Read the playbook
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 ease-out-soft group-hover:rotate-45"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
            {upcoming.map(({ topic, title, body }) => {
              const service = getService(topic);
              return (
                <li key={title} data-reveal className="flex flex-col gap-4 rounded-xl border border-dashed border-border bg-surface p-6">
                  <div className="flex items-center justify-between gap-3">
                    {service && (
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-sunken">
                        <service.icon className="h-5 w-5 text-text-muted" strokeWidth={2} aria-hidden="true" />
                      </span>
                    )}
                    <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium text-text-muted">
                      Coming soon
                    </span>
                  </div>
                  {service && <span className="text-sm font-semibold text-text-muted">{service.title}</span>}
                  <h3 className="heading-4">{title}</h3>
                  <p className="text-text-secondary">{body}</p>
                </li>
              );
            })}
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
