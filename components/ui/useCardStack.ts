'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RefObject } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Options = {
  /** Cards to stack, inside the scope. */
  selector?: string;
  /** Where the first card pins, below the fixed nav. */
  baseTop?: number;
  /** How much of each earlier card peeks out above the next. */
  step?: number;
  /** Only stack at these widths. */
  media?: string;
};

// Cards pin one after another and earlier ones shrink back as the next slides over.
// A card taller than the screen pins only once its bottom is visible, so nothing
// is covered before it has been read.
export function useCardStack(
  scope: RefObject<HTMLElement | null>,
  { selector = '[data-stack]', baseTop = 88, step = 10, media = '(max-width: 767px)' }: Options = {},
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${media} and (prefers-reduced-motion: no-preference)`, () => {
        const cards = gsap.utils.toArray<HTMLElement>(selector, scope.current);
        if (cards.length < 2) return;
        const previous = cards.map((c) => ({ position: c.style.position, top: c.style.top }));

        const pinTop = (card: HTMLElement, i: number) =>
          Math.min(baseTop + i * step, window.innerHeight - card.offsetHeight - 16);

        const place = () =>
          cards.forEach((card, i) => {
            card.style.position = 'sticky';
            card.style.top = `${pinTop(card, i)}px`;
          });
        place();
        window.addEventListener('resize', place);

        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.92,
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              // Shrink only while the next card actually covers this one.
              start: () => `top ${Math.min(pinTop(card, i) + card.offsetHeight, window.innerHeight)}px`,
              end: () => `top ${Math.max(pinTop(next, i + 1), 0)}px`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });

        return () => {
          window.removeEventListener('resize', place);
          cards.forEach((card, i) => {
            card.style.position = previous[i].position;
            card.style.top = previous[i].top;
          });
        };
      });
    },
    { scope },
  );
}
