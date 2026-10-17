'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Bot, Check, Mail, PenLine, Radar, Search, Send, UserCheck, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { PlanCta } from './PlanCta';
import { Eyebrow } from './ui/Eyebrow';
import { useCardStack } from './ui/useCardStack';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const statement = {
  before:
    'Most founders pick one. Post on LinkedIn and hope, or send cold email and pray. We run both as one system. Your posts warm up the market, signals tell us who\u2019s ready, and',
  highlight: 'every message has a reason to exist.',
  after: '',
};

function Row({ label, value, tone = 'muted' }: { label: string; value: string; tone?: 'muted' | 'mint' }) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-md bg-surface px-4 py-3 text-sm">
      <span className="font-medium text-text">{label}</span>
      <span className={`flex shrink-0 items-center gap-2 ${tone === 'mint' ? 'text-accent-text' : 'text-text-muted'}`}>
        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${tone === 'mint' ? 'bg-mint-500' : 'bg-border-strong'}`} />
        {value}
      </span>
    </li>
  );
}

// href: set once the service's own page exists.
type Service = { slug: string; title: string; desc: string; icon: LucideIcon; visual: ReactNode; href?: string };

const services: Service[] = [
  {
    slug: 'linkedin-content',
    title: 'LinkedIn Content',
    desc: 'Three text posts a week in your voice, from one 30-minute call a month. We optimise your profile, engage with your buyers\u2019 posts, and capture everyone who engages.',
    icon: PenLine,
    visual: (
      <div className="flex flex-col gap-3">
        <div className="rounded-lg bg-surface p-4 text-sm shadow-md">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="h-8 w-8 rounded-full bg-brand-subtle" aria-hidden="true" />
            <span className="flex flex-col leading-tight">
              <span className="font-semibold text-text">Your founder post</span>
              <span className="text-xs text-text-muted">Scheduled · Tuesday 9:00</span>
            </span>
          </div>
          <p className="leading-relaxed text-text-secondary">
            Most cold outreach fails before anyone reads it. Here is what we check before a single message goes out&hellip;
          </p>
          <span className="mt-2 block text-xs text-text-muted">Draft · ready for your approval</span>
        </div>
        <ul className="flex flex-col gap-2">
          <Row label="Head of Sales, Series A SaaS" value="ICP match" tone="mint" />
          <Row label="Founder, HR tech" value="ICP match" tone="mint" />
          <Row label="Student" value="Not ICP" />
        </ul>
      </div>
    ),
  },
  {
    slug: 'lead-generation',
    title: 'Lead Generation',
    desc: 'Outreach from your own LinkedIn profile to accounts showing buying signals. We start the conversation and book the call. You just show up.',
    icon: Radar,
    visual: (
      <div className="flex flex-col gap-3">
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-surface px-3 py-1.5 text-sm font-medium text-text shadow-sm">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-mint-500" />
          Signal: hiring 4 SDRs
        </span>
        <div className="max-w-[340px] self-start rounded-[18px_18px_18px_4px] bg-surface px-4 py-3 text-sm leading-relaxed text-text shadow-md">
          &ldquo;Saw you&rsquo;re hiring four SDRs. Congrats. Curious how you&rsquo;re planning to ramp them&hellip;&rdquo;
          <span className="mt-1.5 block text-xs text-text-muted">First message</span>
        </div>
        <div className="max-w-[260px] self-end rounded-[18px_18px_4px_18px] bg-inverse-bg px-4 py-3 text-sm text-inverse-text shadow-md">
          Good timing, actually. Free Thursday?
          <span className="mt-1.5 block text-xs text-accent">Reply</span>
        </div>
        <span className="inline-flex items-center gap-1.5 self-end rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-on-accent">
          <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" /> Call booked
        </span>
      </div>
    ),
  },
  {
    slug: 'email-outbound',
    title: 'Email Outbound',
    desc: 'Cold email infrastructure in your name: secondary domains, warmed mailboxes, monitored deliverability. Inside the sprint, we write and run the campaigns on it too.',
    icon: Mail,
    visual: (
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-2">
          <Row label="getyourbrand.com" value="Warmed" tone="mint" />
          <Row label="tryyourbrand.com" value="Warmed" tone="mint" />
          <Row label="yourbrandhq.com" value="Warming up" />
        </ul>
        <div className="grid grid-cols-3 gap-2">
          {['SPF', 'DKIM', 'DMARC'].map((rec) => (
            <span
              key={rec}
              className="flex items-center justify-center gap-1.5 rounded-md bg-surface px-3 py-2.5 text-sm font-semibold text-text"
            >
              <Check className="h-4 w-4 text-accent-text" strokeWidth={2.5} aria-hidden="true" />
              {rec}
            </span>
          ))}
        </div>
        <span className="text-xs text-text-muted">Your main domain is never used for cold email</span>
      </div>
    ),
  },
];

const loop = [
  { icon: Search, label: 'Research' },
  { icon: PenLine, label: 'Write' },
  { icon: UserCheck, label: 'Review' },
  { icon: Send, label: 'Send' },
];

const bandItems = [
  'LinkedIn content',
  'Signal outreach',
  'Email infrastructure',
  'ICP research',
  'Gold-tier ABM',
  'Reply handling',
  'Weekly reports',
  'You own everything',
];

export function Services() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Desktop tabs rotate on their own (every 3.5s, the --animate-tab-progress duration in globals.css).
  // Paused while hovered, off screen, or with reduced motion.
  const tabsArea = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const rotating = !hovered && onScreen && !reduceMotion;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    const el = tabsArea.current;
    if (!el) return () => media.removeEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => {
      media.removeEventListener('change', sync);
      observer.disconnect();
    };
  }, []);
  // The progress bar drives rotation: when it finishes filling, move to the next tab.
  // Pausing the bar pauses rotation, and a click restarts it from zero.
  const next = () => setActive((a) => (a + 1) % services.length);

  useCardStack(root, { media: '(max-width: 1023px)' });

  // Links like #sprint-lead-generation open that tab.
  useEffect(() => {
    const openFromHash = () => {
      const i = services.findIndex((sv) => `#sprint-${sv.slug}` === window.location.hash);
      if (i >= 0) setActive(i);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);
  const current = services[active];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-word]',
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-words]', start: 'top 80%', end: 'bottom 50%', scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  const words = (text: string, className = '') =>
    text.split(' ').map((word, i) => (
      <span key={`${word}-${i}`} data-word className={className}>
        {word}{' '}
      </span>
    ));

  return (
    <section ref={root} id="services">
      <div className="panel relative z-10 overflow-clip bg-inverse-bg text-inverse-text">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden justify-between px-[7%] md:flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="h-full w-px bg-white/[0.05]" />
          ))}
        </div>

        <div className="container-page relative flex flex-col gap-16 py-16 md:gap-40 md:py-36">
          <div className="flex flex-col gap-8 md:gap-10">
            <Eyebrow tone="dark" className="self-start">Our point of view</Eyebrow>
            <p data-words className="heading-1 max-w-[56rem] max-md:text-[1.625rem] max-md:leading-[1.25]">
              {words(statement.before)}
              {words(statement.highlight, 'text-accent')}
              {statement.after && words(statement.after)}
            </p>
            <div data-reveal className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex gap-2">
                {loop.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    title={label}
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-inverse-surface md:h-16 md:w-16"
                  >
                    <Icon className="h-6 w-6 text-accent" strokeWidth={2} aria-hidden="true" />
                    <span className="sr-only">{label}</span>
                  </span>
                ))}
              </div>
              <p className="max-w-[22rem] text-inverse-text-muted">
                A named strategist on every account. Agents do the volume, people own the judgement.
              </p>
            </div>
          </div>

          <div
            ref={tabsArea}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative grid gap-10 lg:grid-cols-2 lg:gap-16"
          >
            {services.map((sv) => (
              <span key={sv.slug} id={`sprint-${sv.slug}`} aria-hidden="true" className="absolute -top-28" />
            ))}
            <div className="flex min-w-0 flex-col gap-8 lg:gap-10">
              <div className="flex flex-col gap-5">
                <Eyebrow tone="dark" className="self-start">Inside the sprint</Eyebrow>
                <h2 className="heading-1 max-w-[30rem]">
                  They see your posts. <span className="text-accent">Then they get your message.</span>
                </h2>
                <p className="max-w-[30rem] text-inverse-text-muted">
                  We research ~3,300 best-fit buyers, write to each one personally, and book the calls on your calendar.
                  You keep everything we build.
                </p>
              </div>

              {/* Desktop: tabs, panel on the right */}
              <div role="tablist" aria-label="Services" className="hidden flex-col gap-1 lg:flex">
                {services.map((s, i) => (
                  <button
                    key={s.title}
                    id={`service-tab-${i}`}
                    role="tab"
                    type="button"
                    aria-selected={active === i}
                    aria-controls="service-panel"
                    onClick={() => setActive(i)}
                    className={`relative flex items-baseline gap-4 overflow-hidden rounded-lg px-5 py-4 text-left transition-colors duration-300 ${
                      active === i ? 'bg-inverse-surface text-inverse-text' : 'text-inverse-text-muted hover:text-inverse-text'
                    }`}
                  >
                    <span className={`text-sm font-semibold ${active === i ? 'text-accent' : ''}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="heading-3">{s.title}</span>
                    {active === i && !reduceMotion && (
                      <span
                        key={active}
                        aria-hidden="true"
                        className="animate-tab-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                        style={{ animationPlayState: rotating ? 'running' : 'paused' }}
                        onAnimationEnd={next}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Phones and tablets: full cards that stack as you scroll */}
              <ul className="flex flex-col gap-4 lg:hidden">
                {services.map((s, i) => (
                  <li
                    key={s.slug}
                    data-stack
                    className="flex flex-col gap-4 rounded-xl bg-inverse-surface p-5 shadow-[0_-12px_32px_rgba(8,10,31,0.45)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-inverse-bg/60">
                        <s.icon className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
                        <h3 className="heading-4">{s.title}</h3>
                      </span>
                    </div>
                    <p className="text-[0.9375rem] leading-relaxed text-inverse-text-muted">{s.desc}</p>
                    <div className="rounded-lg bg-brand-subtle p-4">{s.visual}</div>
                    {s.href && (
                      <a href={s.href} className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-accent">
                        Available on its own <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-start gap-3">
                <PlanCta variant="light" />
                <span className="text-sm text-inverse-text-muted">
                  Enter your website and see how your sprint would run.
                </span>
              </div>
            </div>

            <div
              id="service-panel"
              role="tabpanel"
              aria-labelledby={`service-tab-${active}`}
              className="hidden flex-col gap-6 lg:flex"
            >
              {/* Icon sits in its own row so it never overlaps the mockup. */}
              <div className="flex min-h-[440px] flex-col gap-6 overflow-hidden rounded-xl bg-brand-subtle p-6 xl:p-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-surface">
                  <current.icon className="h-5 w-5 text-brand-text" strokeWidth={2} aria-hidden="true" />
                </span>
                <div key={active} className="animate-tab-in flex flex-1 flex-col justify-center px-2 pb-2 xl:px-4">
                  {current.visual}
                </div>
              </div>
              <p className="max-w-[30rem] text-inverse-text-muted">{current.desc}</p>
              {current.href && (
                <a
                  href={current.href}
                  className="inline-flex items-center gap-2 self-start text-sm font-semibold text-accent hover:underline"
                >
                  Available on its own <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="panel -mt-8 overflow-hidden rounded-t-none bg-accent pt-8 text-on-accent">
        <div className="flex overflow-hidden py-4">
          <div className="animate-marquee flex w-max">
            {[0, 1].map((k) => (
              <ul key={k} aria-hidden={k === 1 || undefined} className="flex shrink-0 items-center">
                {bandItems.map((item) => (
                  <li key={item} className="flex items-center gap-6 pr-6">
                    <span className="whitespace-nowrap font-display text-lg font-semibold">{item}</span>
                    <Bot className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
