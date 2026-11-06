'use client';

import { Button, type ButtonVariant } from './ui/Button';

// Secondary conversion: takes visitors back to the hero form and focuses it.
// Pages without a hero form send visitors to the offer page's form instead.
export function PlanCta({
  variant = 'light',
  className = '',
  label = 'See your plan',
  targetId = 'hero-domain',
}: {
  variant?: ButtonVariant;
  className?: string;
  label?: string;
  targetId?: string;
}) {
  return (
    <Button
      href="/guaranteed-meetings#top"
      variant={variant}
      label={label}
      className={className}
      onClick={(e) => {
        const input = document.getElementById(targetId) as HTMLInputElement | null;
        // No domain field on this page, so let the link take them to the offer page.
        if (!input) return;
        e.preventDefault();
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        // Focus once the scroll has settled; if smooth scrolling stalled, jump there so the field is visible.
        window.setTimeout(() => {
          if (window.scrollY > 200) window.scrollTo({ top: 0, behavior: 'auto' });
          input.focus({ preventScroll: true });
        }, 700);
      }}
    />
  );
}
