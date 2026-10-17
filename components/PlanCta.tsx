'use client';

import { Button, type ButtonVariant } from './ui/Button';

// Secondary conversion: takes visitors back to the hero domain field and focuses it.
export function PlanCta({ variant = 'light', className = '' }: { variant?: ButtonVariant; className?: string }) {
  return (
    <Button
      href="#top"
      variant={variant}
      label="See your 90 days"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        const input = document.getElementById('hero-domain') as HTMLInputElement | null;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        // Focus once the scroll has settled; if smooth scrolling stalled, jump there so the field is visible.
        window.setTimeout(() => {
          if (window.scrollY > 200) window.scrollTo({ top: 0, behavior: 'auto' });
          input?.focus({ preventScroll: true });
        }, 700);
      }}
    />
  );
}
