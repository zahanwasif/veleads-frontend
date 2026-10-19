'use client';

import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { services } from '@/lib/services';
import { BookDemoButton } from './BookDemoButton';
import { Logo } from './Logo';

// Links that point at homepage sections use "/#id" so they work from every page.
const links = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Playbooks', href: '/playbooks' },
];

const linkCls = (active: boolean) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    active ? 'bg-surface-sunken text-text' : 'text-text-secondary hover:bg-surface-sunken hover:text-text'
  }`;

function ServicesMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // When hover just opened the menu, the click that follows should keep it open, not toggle it shut.
  const openedByHover = useRef(false);
  const active = pathname.startsWith('/services');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  // Hover opens it on desktop; a short delay stops it closing while the pointer crosses the gap.
  const show = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    if (!open) openedByHover.current = true;
    setOpen(true);
  };
  const hide = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    closeTimer.current = window.setTimeout(() => {
      openedByHover.current = false;
      setOpen(false);
    }, 120);
  };

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerEnter={show}
      onPointerLeave={hide}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            return;
          }
          setOpen((o) => !o);
        }}
        className={`${linkCls(active || open)} inline-flex items-center gap-1.5`}
      >
        Services
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ease-out-soft ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id="services-menu"
        className={`absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-3 transition-[opacity,translate] duration-200 ease-out-soft ${
          open ? 'visible opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        <div className="rounded-xl border border-border bg-surface p-2 shadow-[0_24px_48px_rgba(16,18,51,0.14)]">
          <ul className="flex flex-col">
            {services.map((s) => {
              const current = pathname === `/services/${s.slug}`;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    aria-current={current ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={`group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-bg ${current ? 'bg-bg' : ''}`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-subtle transition-colors group-hover:bg-brand">
                      <s.icon
                        className="h-5 w-5 text-brand-text transition-colors group-hover:text-on-brand"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-text">{s.title}</span>
                      <span className="text-sm text-text-muted">{s.short}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/#services"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-lg bg-inverse-bg px-4 py-3 text-sm text-inverse-text transition-colors hover:bg-inverse-surface"
          >
            <span>
              <span className="font-semibold">All three together.</span>{' '}
              <span className="text-inverse-text-muted">The 90-Day Pipeline Sprint</span>
            </span>
            <ArrowRight className="h-4 w-4 text-accent" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? 'bg-surface/95 shadow-[0_1px_0_var(--color-border)] backdrop-blur-md' : 'bg-surface'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1408px] items-center justify-between px-5 md:px-8">
        <Logo />

        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          <ServicesMenu pathname={pathname} />
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkCls(pathname === link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <BookDemoButton variant="dark" size="sm" label="Book a call" />
        </div>

        {/* Phones: keep the main action one tap away */}
        <div className="flex items-center gap-2 lg:hidden">
          <BookDemoButton variant="dark" size="sm" label="Book a call" arrow={false} className="h-11" />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-sunken text-text"
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-surface"
        >
          <div className="flex h-[72px] shrink-0 items-center justify-between px-5">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-sunken text-text"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-6 px-5 pt-6">
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-medium text-text-muted">Services</span>
              <ul className="flex flex-col gap-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg py-2"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-subtle">
                        <s.icon className="h-5 w-5 text-brand-text" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-semibold text-text">{s.title}</span>
                        <span className="text-sm text-text-muted">{s.short}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-1 border-t border-border pt-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="heading-3 py-1.5 text-text"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="p-5">
            <BookDemoButton variant="primary" className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
