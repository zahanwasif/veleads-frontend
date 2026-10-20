'use client';

import { AlertTriangle, Check, ChevronDown, Loader2, Mail, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { createPortal } from 'react-dom';
import type { Finding } from '@/lib/deliverability';
import { DEAL_SIZES, LeadSchema, ROLES, TIMELINES } from '@/lib/lead';
import { offers, type OfferId } from '@/lib/offers';
import { BookDemoButton } from './BookDemoButton';

type Stage = 'research' | 'form' | 'done';

/** What the visitor entered, already validated. */
export type Subject =
  | { kind: 'domain'; label: string; domain: string; favicon: string | null; findings?: Finding[] }
  | { kind: 'linkedin'; label: string; linkedinUrl: string };
type Errors = Partial<Record<'fullName' | 'email' | 'role' | 'form', string>>;

function Select({
  id,
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  optional,
}: {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label} {optional && <span className="font-normal text-text-muted">(optional)</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={`h-12 w-full appearance-none rounded-md border bg-surface pl-4 pr-10 text-base focus:border-brand focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-brand/15 ${
            error ? 'border-danger' : 'border-border'
          } ${value ? 'text-text' : 'text-text-muted'}`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}

function TextField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`h-12 rounded-md border bg-surface px-4 text-base text-text placeholder:text-text-muted focus:border-brand focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-brand/15 ${
          error ? 'border-danger' : 'border-border'
        }`}
      />
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}

function SubjectIcon({ subject }: { subject: Subject }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-surface">
      {subject.kind === 'linkedin' ? (
        <span className="font-display text-sm font-bold text-brand-text">in</span>
      ) : subject.favicon ? (
        // eslint-disable-next-line @next/next/no-img-element -- data: URL from our own site check
        <img src={subject.favicon} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
      ) : (
        <span className="font-display text-sm font-bold uppercase text-brand-text">{subject.domain.charAt(0)}</span>
      )}
    </span>
  );
}

export function ReportDialog({
  offerId,
  subject,
  onClose,
}: {
  offerId: OfferId;
  subject: Subject;
  onClose: () => void;
}) {
  const offer = offers[offerId];
  const label = subject.label;
  const findings = subject.kind === 'domain' ? subject.findings : undefined;
  const id = useId();
  const panel = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>('research');
  const [done, setDone] = useState(0);
  const [form, setForm] = useState({ fullName: '', email: '', role: '', dealSize: '', timeline: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const steps = offer.steps(label);

  // Research animation: tick steps off one by one, then show the form.
  useEffect(() => {
    if (stage !== 'research') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const step = reduce ? 150 : 1500;
    const timers = steps.map((_, i) => window.setTimeout(() => setDone(i + 1), step * (i + 1)));
    timers.push(window.setTimeout(() => setStage('form'), step * steps.length + (reduce ? 100 : 900)));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // Escape closes, page doesn't scroll behind, focus moves into the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !submitting && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, submitting]);

  useEffect(() => {
    // Prefer the first field; fall back to the close button during the animation.
    const p = panel.current;
    const first = p?.querySelector<HTMLElement>('input') ?? p?.querySelector<HTMLElement>('button');
    first?.focus();
  }, [stage]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      offer: offerId,
      domain: subject.kind === 'domain' ? subject.domain : undefined,
      linkedinUrl: subject.kind === 'linkedin' ? subject.linkedinUrl : undefined,
      fullName: form.fullName,
      email: form.email,
      role: form.role || undefined,
      dealSize: form.dealSize || undefined,
      timeline: form.timeline || undefined,
      pageUri: window.location.href.split('#')[0],
      pageName: document.title,
    };
    const parsed = LeadSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch('/api/report-request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong. Please try again.');
      // For conversion tracking in Tag Manager. No personal details go into the data layer.
      sendGTMEvent({ event: 'generate_lead', offer: offerId, role: parsed.data.role });
      setStage('done');
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  const progress = stage === 'research' ? (done / steps.length) * 100 : 100;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        className="animate-fade-in absolute inset-0 bg-inverse-bg/60 backdrop-blur-sm"
        onClick={() => !submitting && onClose()}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className="animate-tab-in relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-[30rem] flex-col overflow-y-auto rounded-xl bg-surface p-6 shadow-lg sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-text-muted hover:bg-surface-sunken hover:text-text"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3 pr-12">
          <SubjectIcon subject={subject} />
          <div className="flex min-w-0 flex-col">
            <span className="eyebrow text-brand-text">{offer.dialogEyebrow}</span>
            <span className="truncate text-sm font-semibold text-text">{label}</span>
          </div>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-sunken" aria-hidden="true">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-1000 ease-out-soft"
            style={{ width: `${progress}%` }}
          />
        </div>

        {stage === 'research' && (
          <div className="mt-6 flex flex-col gap-5" aria-live="polite">
            <h2 id={`${id}-title`} className="heading-3">
              Getting to know {label}&hellip;
            </h2>
            <ol className="flex flex-col gap-2">
              {steps.map((s, i) => {
                const state = i < done ? 'done' : i === done ? 'active' : 'next';
                return (
                  <li
                    key={s}
                    className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                      state === 'done' ? 'bg-accent-subtle' : state === 'active' ? 'bg-brand-subtle' : 'bg-surface-sunken'
                    } ${state === 'next' ? 'text-text-muted' : 'text-text'}`}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {state === 'done' ? (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-on-accent">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                      ) : state === 'active' ? (
                        <Loader2 className="h-4 w-4 animate-spin text-brand-text" aria-hidden="true" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-border-strong" aria-hidden="true" />
                      )}
                    </span>
                    {s}
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        {stage === 'form' && (
          <form onSubmit={submit} noValidate data-hs-do-not-collect="true" className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 id={`${id}-title`} className="heading-3">
                {offer.formTitle}
              </h2>
              <p className="text-sm text-text-secondary">{offer.formBody(label)}</p>
            </div>
            {findings && (
              <ul className="flex flex-col gap-1.5 rounded-lg bg-bg p-3" aria-label="What we found">
                {findings.map((f) => (
                  <li key={f.label} className="flex items-start gap-2.5 text-sm">
                    {f.ok ? (
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                    ) : (
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-danger" strokeWidth={2} aria-hidden="true" />
                    )}
                    <span className={f.ok ? 'text-text' : 'font-medium text-text'}>
                      <span className="sr-only">{f.ok ? 'Good. ' : 'Needs fixing. '}</span>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <TextField
              id={`${id}-name`}
              label="Full name"
              value={form.fullName}
              onChange={(v) => setForm({ ...form, fullName: v })}
              placeholder="Jane Smith"
              autoComplete="name"
              error={errors.fullName}
            />
            <TextField
              id={`${id}-email`}
              label="Work email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder={subject.kind === 'domain' ? `jane@${subject.domain}` : 'jane@yourcompany.com'}
              autoComplete="email"
              error={errors.email}
            />
            <Select
              id={`${id}-role`}
              label="Your role"
              options={ROLES}
              value={form.role}
              onChange={(v) => setForm({ ...form, role: v })}
              placeholder="Select your role"
              error={errors.role}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                id={`${id}-deal`}
                label="Average deal size"
                options={DEAL_SIZES}
                value={form.dealSize}
                onChange={(v) => setForm({ ...form, dealSize: v })}
                placeholder="Select"
                optional
              />
              <Select
                id={`${id}-timeline`}
                label="Looking to start"
                options={TIMELINES}
                value={form.timeline}
                onChange={(v) => setForm({ ...form, timeline: v })}
                placeholder="Select"
                optional
              />
            </div>
            {errors.form && <p className="rounded-md bg-surface-sunken px-4 py-3 text-sm text-danger">{errors.form}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex h-[52px] items-center justify-center gap-2 rounded-full bg-brand px-6 text-base font-semibold text-on-brand transition-colors hover:bg-brand-hover disabled:opacity-80"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Mail className="h-4 w-4" aria-hidden="true" />}
              {submitting ? 'Sending' : offer.submit}
            </button>
          </form>
        )}

        {stage === 'done' && (
          <div className="mt-6 flex flex-col items-start gap-5" aria-live="polite">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-on-accent">
              <Check className="h-6 w-6" strokeWidth={3} aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h2 id={`${id}-title`} className="heading-3">
                {offer.doneTitle}
              </h2>
              <p className="text-text-secondary">
                Check your inbox at <span className="font-semibold text-text">{form.email}</span>.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 rounded-lg bg-brand-subtle p-5">
              <span className="font-semibold">Want it walked through live?</span>
              <BookDemoButton variant="primary" className="w-full sm:w-auto sm:self-start" />
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
