export function Eyebrow({
  children,
  tone = 'light',
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'light' | 'dark' | 'sunken';
  className?: string;
}) {
  const tones = {
    light: 'border border-border bg-surface text-text',
    sunken: 'bg-surface-sunken text-text',
    dark: 'bg-white/10 text-inverse-text',
  };
  const dot = tone === 'dark' ? 'bg-accent' : 'bg-mint-500';
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-medium max-[380px]:gap-1.5 max-[380px]:px-2.5 max-[380px]:text-xs ${tones[tone]} ${className}`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
    </span>
  );
}
