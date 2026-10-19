import { Check } from 'lucide-react';
import type { ServiceSlug } from '@/lib/services';

// Product mockups for each service, shared by the homepage sprint tabs and the service pages.

function Row({ label, value, tone = 'muted' }: { label: string; value: string; tone?: 'muted' | 'mint' }) {
  return (
      <li className="flex items-center justify-between gap-4 rounded-md bg-surface px-4 py-3 text-sm">
        <span className="font-medium text-text">{label}</span>
        <span className={`flex shrink-0 items-center gap-2 ${tone === 'mint' ? 'text-accent-text' : 'text-text-muted'}`}>
          <span aria-hidden="true" className={`h-2 w-2 rounded-full ${tone === 'mint' ? 'bg-mint-500' : 'bg-border-strong'}`} />
          {value}
        </span>
      </li>
  );
}

function LinkedInContentVisual() {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg bg-surface p-4 text-sm shadow-md">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="h-8 w-8 rounded-full bg-brand-subtle" aria-hidden="true" />
          <span className="flex flex-col leading-tight">
            <span className="font-semibold text-text">Your founder post</span>
            <span className="text-xs text-text-muted">Scheduled · Tuesday 9:00</span>
          </span>
        </div>
        <p className="leading-relaxed text-text-secondary">
          Most cold outreach fails before anyone reads it. Here is what we check before a single message goes out&hellip;
        </p>
        <span className="mt-2 block text-xs text-text-muted">Draft · ready for your approval</span>
      </div>
      <ul className="flex flex-col gap-2">
        <Row label="Head of Sales, Series A SaaS" value="ICP match" tone="mint" />
        <Row label="Founder, HR tech" value="ICP match" tone="mint" />
        <Row label="Student" value="Not ICP" />
      </ul>
    </div>
  );
}

function LinkedInOutreachVisual() {
  return (
    <div className="flex flex-col gap-3">
      <span className="inline-flex items-center gap-2 self-start rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-text shadow-sm">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-mint-500" />
        Hiring 4 SDRs this quarter
      </span>
      <div className="max-w-[340px] self-start rounded-[18px_18px_18px_4px] bg-surface px-4 py-3 text-sm leading-relaxed text-text shadow-md">
        &ldquo;Saw you&rsquo;re hiring four SDRs. Congrats. Curious how you&rsquo;re planning to ramp them&hellip;&rdquo;
        <span className="mt-1.5 block text-xs text-text-muted">First message</span>
      </div>
      <div className="max-w-[260px] self-end rounded-[18px_18px_4px_18px] bg-inverse-bg px-4 py-3 text-sm text-inverse-text shadow-md">
        Good timing, actually. Free Thursday?
        <span className="mt-1.5 block text-xs text-accent">Reply</span>
      </div>
      <span className="inline-flex items-center gap-1.5 self-end rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-on-accent">
        <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" /> Call booked
      </span>
    </div>
  );
}

function EmailOutboundVisual() {
  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-2">
        <Row label="getyourbrand.com" value="Warmed" tone="mint" />
        <Row label="tryyourbrand.com" value="Warmed" tone="mint" />
        <Row label="yourbrandhq.com" value="Warming up" />
      </ul>
      <div className="grid grid-cols-3 gap-2">
        {['SPF', 'DKIM', 'DMARC'].map((rec) => (
          <span
            key={rec}
            className="flex items-center justify-center gap-1.5 rounded-md bg-surface px-3 py-2.5 text-sm font-semibold text-text"
          >
            <Check className="h-4 w-4 text-accent-text" strokeWidth={2.5} aria-hidden="true" />
            {rec}
          </span>
        ))}
      </div>
      <span className="text-xs text-text-muted">Your main domain is never used for cold email</span>
    </div>
  );
}

export function ServiceVisual({ slug }: { slug: ServiceSlug }) {
  if (slug === 'linkedin-content') return <LinkedInContentVisual />;
  if (slug === 'linkedin-outreach') return <LinkedInOutreachVisual />;
  return <EmailOutboundVisual />;
}
