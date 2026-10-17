'use client';

import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useId, useState } from 'react';
import { normalizeDomain } from '@/lib/domain';
import { ReportDialog } from './ReportDialog';

type Site = { domain: string; favicon: string | null };

export function DomainForm() {
  const id = useId();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [site, setSite] = useState<Site | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (checking) return;
    const domain = normalizeDomain(value);
    if (!domain) {
      setError('Enter your company’s website, like acme.com');
      return;
    }
    setError(null);
    setChecking(true);
    try {
      // Confirm the website exists (and grab its favicon) before opening the popup.
      const res = await fetch(`/api/site-check?domain=${encodeURIComponent(domain)}`);
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? 'check failed');
      if (!data?.found) {
        setError(`We couldn’t find ${domain}. Check the spelling and try again.`);
        return;
      }
      setSite({ domain, favicon: data.favicon ?? null });
    } catch {
      setError('We couldn’t check that website right now. Please try again.');
    } finally {
      setChecking(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate className="flex w-full max-w-[34rem] flex-col items-center gap-2">
      <label htmlFor="hero-domain" className="sr-only">
        Your company website
      </label>
      <div
        className={`flex w-full flex-col gap-2 rounded-[34px] border bg-surface p-2 shadow-md transition-[border-color,box-shadow] focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15 sm:flex-row sm:items-center sm:rounded-full sm:pl-6 ${
          error ? 'border-danger' : 'border-border'
        }`}
      >
        <input
          id="hero-domain"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="yourcompany.com"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-[52px] w-full min-w-0 shrink-0 bg-transparent sm:w-auto sm:flex-1 px-4 text-center text-base text-text placeholder:text-text-muted focus:outline-none focus-visible:outline-none sm:px-0 sm:text-left"
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
              <span className="flex-1 text-center">See your 90 days</span>
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
      {site && <ReportDialog domain={site.domain} favicon={site.favicon} onClose={() => setSite(null)} />}
    </form>
  );
}
