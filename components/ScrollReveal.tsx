'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Fades up every [data-reveal] element as it enters the viewport.
export function ScrollReveal() {
  useEffect(() => {
    // Fonts change line heights, so recompute scroll-driven positions once they land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
    const pending = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
    gsap.set(pending, { y: 32, opacity: 0, filter: 'blur(6px)' });

    const observer = new IntersectionObserver(
      (entries) => {
        // Anything already scrolled past (e.g. after an anchor jump) shows immediately.
        const passed = entries
          .filter((e) => !e.isIntersecting && e.boundingClientRect.top < 0)
          .map((e) => e.target);
        passed.forEach((el) => observer.unobserve(el));
        if (passed.length) gsap.set(passed, { y: 0, opacity: 1, filter: 'none' });

        const entering = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        if (!entering.length) return;
        entering.forEach((el) => observer.unobserve(el));
        const tween = gsap.to(entering, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
        });
        // Throttled animation frames must not leave content faded.
        window.setTimeout(() => tween.progress(1), 2000);
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    pending.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
