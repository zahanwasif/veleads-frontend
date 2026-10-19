'use client';

import { Button, type ButtonVariant } from './ui/Button';

// Secondary conversion: takes visitors back to the hero form and focuses it.
export function PlanCta({
  variant = 'light',
  className = '',
  label = 'See your 90 days',
  targetId = 'hero-domain',
}: {
  variant?: ButtonVariant;
  className?: string;
  label?: string;
  targetId?: string;
}) {
  return (
    <Button
      href="/#top"
      variant={variant}
      label={label}
      className={className}
      onClick={(e) => {
        const input = document.getElementById(targetId) as HTMLInputElement | null;
        // Off the homepage there's no domain field, so let the link take them there.
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
