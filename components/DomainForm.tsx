'use client';

import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useId, useState } from 'react';
import type { Finding } from '@/lib/deliverability';
import { normalizeDomain } from '@/lib/domain';
import { normalizeLinkedInProfile } from '@/lib/linkedin';
import { offers, type OfferId } from '@/lib/offers';
import { ReportDialog, type Subject } from './ReportDialog';

/**
 * The pill form that starts every free offer: a website (homepage, Email Outbound)
 * or a LinkedIn profile URL (the LinkedIn services). It validates, then opens the popup.
 */
export function DomainForm({ offerId = 'sprint-plan', inputId = 'hero-domain' }: { offerId?: OfferId; inputId?: string }) {
  const offer = offers[offerId];
  const id = useId();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [subject, setSubject] = useState<Subject | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (checking) return;

    if (offer.input === 'linkedin') {
      const profile = normalizeLinkedInProfile(value);
      if (!profile) {
        setError('Paste your LinkedIn profile link, like linkedin.com/in/yourname');
        return;
      }
      setError(null);
      setSubject({ kind: 'linkedin', label: `in/${profile.handle}`, linkedinUrl: profile.url });
      return;
    }

    const domain = normalizeDomain(value);
    if (!domain) {
      setError('Enter your company’s website, like acme.com');
      return;
    }
    setError(null);
    setChecking(true);
    try {
      // Confirm the website exists (and grab its favicon) before opening the popup.
      // The Email Outbound offer also runs a live DNS check to show in the popup.
      const [site, dns] = await Promise.all([
        fetch(`/api/site-check?domain=${encodeURIComponent(domain)}`).then(async (r) => ({ ok: r.ok, data: await r.json() })),
        offerId === 'deliverability-check'
          ? fetch(`/api/deliverability-check?domain=${encodeURIComponent(domain)}`)
              .then((r) => (r.ok ? r.json() : null))
              .catch(() => null)
          : null,
      ]);
      if (!site.ok) throw new Error(site.data?.error ?? 'check failed');
      if (!site.data?.found) {
        setError(`We couldn’t find ${domain}. Check the spelling and try again.`);
        return;
      }
      setSubject({
        kind: 'domain',
        label: domain,
        domain,
        favicon: site.data.favicon ?? null,
        findings: (dns?.findings as Finding[] | undefined) ?? undefined,
      });
    } catch {
      setError('We couldn’t check that website right now. Please try again.');
    } finally {
      setChecking(false);
    }
  }

  return (
    // data-hs-do-not-collect: the server already sends this lead to HubSpot, so HubSpot's
    // script must not capture the form a second time.
    <form
      onSubmit={submit}
      noValidate
      data-hs-do-not-collect="true"
      className="flex w-full max-w-[34rem] flex-col items-center gap-2"
    >
      <label htmlFor={inputId} className="sr-only">
        {offer.inputLabel}
      </label>
      <div
        className={`flex w-full flex-col gap-2 rounded-[34px] border bg-surface p-2 shadow-md transition-[border-color,box-shadow] focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15 sm:flex-row sm:items-center sm:rounded-full sm:pl-6 ${
          error ? 'border-danger' : 'border-border'
        }`}
      >
        <input
          id={inputId}
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={offer.placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-[52px] w-full min-w-0 shrink-0 bg-transparent px-4 text-center text-base text-text placeholder:text-text-muted focus:outline-none focus-visible:outline-none sm:w-auto sm:flex-1 sm:px-0 sm:text-left"
        />
        <button
          type="submit"
          disabled={checking}
          aria-busy={checking}
          className="group flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-full bg-brand pl-6 pr-2 text-base font-semibold text-on-brand shadow-[0_10px_30px_rgba(91,91,246,0.28)] transition-colors hover:bg-brand-hover disabled:opacity-80"
        >
          {checking ? (
            <>
              <span className="flex-1 text-center">Checking site</span>
              <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-on-brand text-brand">
                <Loader2 className="h-4 w-4 animate-spin" />
              </span>
            </>
          ) : (
            <>
              <span className="flex-1 text-center">{offer.button}</span>
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-on-brand text-brand transition-transform duration-500 ease-out-soft group-hover:rotate-45"
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </>
          )}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      {subject && <ReportDialog offerId={offerId} subject={subject} onClose={() => setSubject(null)} />}
    </form>
  );
}
