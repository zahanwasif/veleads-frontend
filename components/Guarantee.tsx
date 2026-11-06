import { Clock3, Rocket, ShieldCheck } from 'lucide-react';
import {
  EMAIL_LIVE_DAY,
  LATE_REFUND_PER_WEEK,
  LINKEDIN_LIVE_DAY,
  MEETINGS_PER_CYCLE,
  REFUND_DAYS,
  REFUND_PER_MEETING,
  usd,
} from '@/lib/guarantee';
import { Eyebrow } from './ui/Eyebrow';

// The three parts of the offer, strongest first: risk, speed, ease.
const pillars = [
  {
    icon: ShieldCheck,
    label: 'Risk',
    title: `${MEETINGS_PER_CYCLE} meetings a month, or cash back`,
    body: `Every 30 days from go-live. Each missed meeting is refunded, about ${usd(REFUND_PER_MEETING)} each, within ${REFUND_DAYS} days.`,
    tone: 'bg-accent text-on-accent',
    muted: 'text-on-accent',
    chip: 'bg-inverse-bg text-inverse-text',
  },
  {
    icon: Rocket,
    label: 'Speed',
    title: `Live in ${LINKEDIN_LIVE_DAY} days`,
    body: `LinkedIn outreach by day ${LINKEDIN_LIVE_DAY}, email by day ${EMAIL_LIVE_DAY}. Late? We refund ${usd(LATE_REFUND_PER_WEEK)} a week. You don’t pay monthly until both are live.`,
    tone: 'bg-inverse-bg text-inverse-text',
    muted: 'text-inverse-text-muted',
    chip: 'bg-white/10 text-inverse-text',
  },
  {
    icon: Clock3,
    label: 'Ease',
    title: 'About 1 hour a week',
    body: 'We do the setup, the tools, the writing and the replies. You approve messages and take the calls.',
    tone: 'border border-border bg-surface text-text',
    muted: 'text-text-secondary',
    chip: 'bg-surface-sunken text-text',
  },
];

export function Guarantee() {
  return (
    <section id="guarantee" aria-labelledby="guarantee-title" className="pt-20 md:pt-28">
      <div className="container-page flex flex-col gap-10">
        <div data-reveal className="flex flex-col gap-5">
          <Eyebrow className="self-start">The guarantee</Eyebrow>
          <h2 id="guarantee-title" className="heading-1 max-w-[44rem]">
            Sales calls without the risk, <span className="text-brand-text">the wait or the work.</span>
          </h2>
        </div>

        <ul className="grid gap-3 md:grid-cols-3">
          {pillars.map(({ icon: Icon, label, title, body, tone, muted, chip }) => (
            <li key={label} data-reveal className={`flex flex-col justify-between gap-10 rounded-xl p-7 md:p-8 ${tone}`}>
              <span className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-[13px] font-medium ${chip}`}>
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="heading-3">{title}</h3>
                <p className={muted}>{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
