'use client';

import { Button, type ButtonVariant } from './ui/Button';

// Secondary conversion: takes visitors back to this page's form and focuses it.
// Only use it on a page that has the form; the plain #link is the no-JavaScript fallback.
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
      href={`#${targetId}`}
      variant={variant}
      label={label}
      className={className}
      onClick={(e) => {
        const input = document.getElementById(targetId) as HTMLInputElement | null;
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
