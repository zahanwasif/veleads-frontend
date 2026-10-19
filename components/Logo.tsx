import Link from 'next/link';

type LogoProps = {
  inverse?: boolean;
  className?: string;
};

export function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" aria-hidden="true" className={className}>
      <rect width="52" height="52" rx="14" fill="#5B5BF6" />
      <path
        d="M14 16 L26 37 L38 16"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="12" r="5" fill="#5EEAD4" />
    </svg>
  );
}

export function Logo({ inverse = false, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Veleads home"
      className={`inline-flex min-h-11 items-center gap-2.5 rounded-full ${className}`}
    >
      <LogoMark />
      <span
        className={`font-display text-2xl font-bold tracking-[-0.8px] max-[380px]:sr-only ${inverse ? "text-inverse-text" : "text-text"}`}
      >
        veleads
      </span>
    </Link>
  );
}
