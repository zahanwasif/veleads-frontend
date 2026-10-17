import { ArrowUpRight } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

export function RollingText({ text }: { text: string }) {
  return (
    <span className="roll">
      <span className="sr-only">{text}</span>
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="roll-char"
          style={{ transitionDelay: `${i * 14}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export type ButtonVariant = 'primary' | 'dark' | 'light' | 'accent';

const variants: Record<ButtonVariant, { button: string; circle: string }> = {
  primary: {
    button: 'bg-brand text-on-brand hover:bg-brand-hover shadow-[0_10px_30px_rgba(91,91,246,0.28)]',
    circle: 'bg-on-brand text-brand',
  },
  dark: {
    button: 'bg-inverse-bg text-inverse-text shadow-[0_10px_30px_rgba(16,18,51,0.22)]',
    circle: 'bg-surface text-text',
  },
  light: {
    button: 'border border-border bg-surface text-text hover:border-border-strong',
    circle: 'bg-inverse-bg text-inverse-text',
  },
  accent: {
    button: 'bg-accent text-on-accent hover:bg-accent-hover',
    circle: 'bg-inverse-bg text-inverse-text',
  },
};

type ButtonProps = Omit<ComponentPropsWithoutRef<'a'>, 'children'> & {
  label: string;
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  arrow?: boolean;
  disabled?: boolean;
};

export function Button({
  label,
  variant = 'dark',
  size = 'md',
  arrow = true,
  disabled = false,
  className = '',
  ...rest
}: ButtonProps) {
  const v = variants[variant];
  const sizing =
    size === 'md'
      ? `h-[52px] text-base ${arrow ? 'pl-6 pr-2' : 'px-6'}`
      : `h-10 text-sm ${arrow ? 'pl-4 pr-1.5' : 'px-4'}`;
  const circle = size === 'md' ? 'h-9 w-9' : 'h-7 w-7';
  const cls = `group inline-flex items-center justify-center gap-3 rounded-full font-medium transition-[background-color,border-color,transform] duration-300 ease-out-soft active:scale-[0.98] ${sizing} ${v.button} ${className}`;

  const inner = (
    <>
      {/* Grows to fill full-width buttons so the arrow stays pinned to the right edge. */}
      <span className="flex-1 text-center">
        <RollingText text={label} />
      </span>
      {arrow && (
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-out-soft group-hover:rotate-45 ${circle} ${v.circle}`}
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </span>
      )}
    </>
  );

  if (disabled) {
    return (
      <span role="link" aria-disabled="true" title={rest.title} className={`${cls} cursor-not-allowed`}>
        {inner}
      </span>
    );
  }

  return (
    <a {...rest} className={cls}>
      {inner}
    </a>
  );
}
