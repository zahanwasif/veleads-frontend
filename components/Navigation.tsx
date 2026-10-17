'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BookDemoButton } from './BookDemoButton';
import { Logo } from './Logo';

const links = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Results', href: '#results' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navigation() {
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
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                i === 0
                  ? 'bg-surface-sunken text-text'
                  : 'text-text-secondary hover:bg-surface-sunken hover:text-text'
              }`}
            >
              {link.label}
            </a>
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
          className="fixed inset-0 z-[100] flex flex-col bg-surface"
        >
          <div className="flex h-[72px] items-center justify-between px-5">
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
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 px-5 pt-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="heading-1 py-2 text-text"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="p-5">
            <BookDemoButton variant="primary" className="w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
