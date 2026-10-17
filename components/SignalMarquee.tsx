import { Bot, Radar, UserCheck } from 'lucide-react';

const signals = [
  'Hiring for sales roles',
  'Funding rounds',
  'New Head of Sales',
  'New offices',
  'Engaging with your posts',
  'Engaging with competitors',
  'Tech stack changes',
  'Product launches',
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {signals.map((signal) => (
        <li key={signal} className="flex items-center gap-10 pr-10">
          <span className="whitespace-nowrap font-display text-xl font-semibold tracking-[-0.4px] text-text-secondary">
            {signal}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-border-strong" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

const icons = [
  { icon: Radar, cls: 'bg-brand text-on-brand' },
  { icon: Bot, cls: 'bg-inverse-bg text-inverse-text' },
  { icon: UserCheck, cls: 'bg-accent text-on-accent' },
];

export function SignalMarquee() {
  return (
    <section aria-label="Buying signals our agents track" className="py-14 md:py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-6 lg:flex-row lg:gap-10">
        <div data-reveal className="flex shrink-0 items-center gap-4">
          <div className="flex -space-x-2.5">
            {icons.map(({ icon: Icon, cls }, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`flex h-11 w-11 items-center justify-center rounded-full ring-[3px] ring-surface ${cls}`}
              >
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
            ))}
          </div>
          <p className="max-w-[16rem] text-sm leading-snug text-text-secondary">
            <span className="block font-semibold text-text">We reach out when they&rsquo;re ready.</span>
            Our agents watch your target accounts every week for buying signals.
          </p>
        </div>
        <span aria-hidden="true" className="hidden h-12 w-px bg-border lg:block" />
        <div className="marquee-fade relative flex w-full min-w-0 overflow-hidden">
          <div className="animate-marquee flex w-max">
            <Row />
            <Row hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
