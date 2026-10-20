import { AlertTriangle, Lightbulb } from 'lucide-react';

// Highlighted note inside a playbook. "tip" for advice, "warning" for mistakes that cost deliverability.
export function Callout({ tone = 'tip', title, children }: { tone?: 'tip' | 'warning'; title?: string; children: React.ReactNode }) {
  const Icon = tone === 'warning' ? AlertTriangle : Lightbulb;
  return (
    <aside
      className={`mt-6 flex gap-4 rounded-lg p-5 ${tone === 'warning' ? 'bg-[#FDF0EF]' : 'bg-accent-subtle'}`}
    >
      <Icon
        className={`mt-0.5 h-5 w-5 shrink-0 ${tone === 'warning' ? 'text-danger' : 'text-accent-text'}`}
        strokeWidth={2}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1 text-[0.9375rem] leading-relaxed text-text [&>p]:mt-0 [&>p]:text-[0.9375rem] [&>p]:text-text-secondary">
        {title && <span className="font-semibold text-text">{title}</span>}
        {children}
      </div>
    </aside>
  );
}
