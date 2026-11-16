import { useEffect } from 'react';

// Blocks that fade up the first time they scroll into view. Everything here
// must render synchronously with the page; anything that loads later (the
// "Lately" widgets) sits inside an element that is listed instead.
export const REVEAL_SELECTOR = [
  '.hero > :not(.feat-detail)',
  'main h2',
  '.timeline > li',
  '.cards > li',
  '.more',
  '#lately',
  '.page-title',
  'article > :not(h1)',
].join(', ');

// Elements that enter the viewport together are staggered in DOM order, so on
// load the hero builds top to bottom and on scroll each group ripples in.
export function useReveal(key: string) {
  useEffect(() => {
    if (!document.documentElement.classList.contains('motion')) return;

    const io = new IntersectionObserver(
      (entries) => {
        let i = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty('--reveal-delay', `${i++ * 80}ms`);
          el.classList.add('in');
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
      if (!el.classList.contains('in')) io.observe(el);
    });
    return () => io.disconnect();
  }, [key]);
}
