import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { services } from '@/lib/services';
import { BookDemoButton } from './BookDemoButton';
import { LogoMark } from './Logo';

const pieces = services.map((s) => ({ title: s.title, desc: s.short, href: `/services/${s.slug}` }));

const pages = [
  { label: 'Home', href: '/' },
  { label: 'Inside the sprint', href: '/#services' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Results', href: '/#results' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Playbooks', href: '/playbooks' },
  { label: 'FAQ', href: '/#faq' },
];

export function Footer() {
  return (
    <footer id="get-started" className="pb-3 md:pb-4">
      <div className="panel relative overflow-hidden bg-brand text-on-brand">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent md:-right-10 md:-top-28 md:h-[300px] md:w-[300px]"
        />

        <div className="container-page relative flex flex-col items-center gap-6 pt-24 pb-12 text-center md:gap-8 md:pt-36 md:pb-16">
          <h2 data-reveal className="display-xl max-w-[56rem]">
            Start your 90 days.
          </h2>
          <p data-reveal className="lead max-w-[34rem] max-md:text-[1.0625rem]">
            Book a 30-minute strategy call. We research 3 of your target accounts live.
          </p>
          <div data-reveal className="mt-2 -rotate-[4deg] transition-transform duration-500 ease-out-soft hover:rotate-0">
            <BookDemoButton variant="dark" label="Claim a founding spot" />
          </div>
        </div>

        <div className="container-page relative flex flex-col gap-4 pb-12 md:pb-16">
          <span className="text-center text-sm font-semibold">Need just one piece?</span>
          <ul className="grid gap-3 sm:grid-cols-3">
            {pieces.map((p) => (
              <li key={p.title}>
                <Link
                  href={p.href}
                  className="group flex h-full items-start justify-between gap-4 rounded-lg bg-brand-hover p-4 md:p-5 transition-colors hover:bg-inverse-bg/30"
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-semibold">{p.title}</span>
                    <span className="text-sm">{p.desc}</span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 transition-transform duration-300 ease-out-soft group-hover:rotate-45"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="container-page relative grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/15 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12 md:py-14">
          <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
            <span className="heading-4">Inbound and outbound, engineered like software.</span>
            <p className="max-w-[24rem] text-sm">
              Veleads runs the 90-Day Pipeline Sprint for B2B founders, with LinkedIn content, signal-based outreach
              and email built as one system you own.
            </p>
          </div>
          <nav aria-label="Footer pages" className="flex flex-col gap-3">
            <span className="text-[13px]">Pages</span>
            {pages.map((p) => (
              <Link key={p.href} href={p.href} className="w-fit py-1 text-base transition-opacity hover:opacity-70 md:text-lg">
                {p.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Footer services" className="flex flex-col gap-3">
            <span className="text-[13px]">Services</span>
            {pieces.map((p) => (
              <Link key={p.href} href={p.href} className="w-fit py-1 text-base transition-opacity hover:opacity-70 md:text-lg">
                {p.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sized in container units so the lockup spans exactly the page container, edge to edge.
            Text is 3.368em wide, mark 0.75em, gap 0.1em: 4.218em = 100cqw, so 1em ≈ 23.7cqw. */}
        <div aria-hidden="true" className="container-page relative pb-3">
          <div className="@container">
            <div className="flex items-center gap-[2.37cqw]">
              <LogoMark className="h-[17.8cqw] w-[17.8cqw] shrink-0 [&_rect]:fill-on-brand [&_path]:stroke-brand" />
              <span className="font-display text-[23.7cqw] font-bold leading-[0.8] tracking-[-0.05em] text-on-brand">
                veleads
              </span>
            </div>
          </div>
        </div>

        <div className="container-page relative flex flex-col gap-2 border-t border-white/15 py-6 text-[13px] text-on-brand sm:flex-row sm:justify-between">
          <span>© 2026 Veleads · The 90-Day Pipeline Sprint</span>
          <span>Agents do the heavy lifting. People make it good.</span>
        </div>
      </div>
    </footer>
  );
}
