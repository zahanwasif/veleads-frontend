import { CALENDLY_CONFIGURE_HINT, getCalendlyUrl } from '@/lib/calendly';

// Quiet text link to the booking page, used under the lead forms.
export function BookCallLink() {
  const url = getCalendlyUrl();
  const cls = 'font-semibold text-brand-text underline-offset-4 hover:underline';
  if (!url) {
    return (
      <span className={`${cls} cursor-not-allowed`} title={CALENDLY_CONFIGURE_HINT}>
        Book a strategy call &rarr;
      </span>
    );
  }
  return (
    <a href={url} className={cls}>
      Book a strategy call &rarr;
    </a>
  );
}
