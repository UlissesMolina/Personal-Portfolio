import { visitId } from './trackClicks';

// Measures engaged time (tab visible and someone active in the last minute), pages viewed, and
// seconds spent on each section with an id; sent with this session's visit for the stats dashboard.
const IDLE_MS = 60_000;
const IN_VIEW = 0.5; // half the section visible, or it fills half the screen

let seconds = 0;
const pages = new Set<string>();
const sectionSeconds = new Map<string, number>();
const inView = new Set<string>();
let lastActivity = Date.now();
let lastSent = '';
let observer: IntersectionObserver | null = null;

function onIntersect(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    const id = (entry.target as HTMLElement).id;
    const fillsScreen = entry.intersectionRect.height >= window.innerHeight * IN_VIEW;
    if (entry.isIntersecting && (entry.intersectionRatio >= IN_VIEW || fillsScreen)) inView.add(id);
    else inView.delete(id);
  }
}

// Call on every route change: records the page and starts watching its sections.
export function trackPage(pathname: string) {
  pages.add(pathname);
  observer?.disconnect();
  inView.clear();
  observer = new IntersectionObserver(onIntersect, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  // Wait a frame so the new route's sections are in the DOM.
  requestAnimationFrame(() => {
    document.querySelectorAll('main section[id]').forEach((el) => observer?.observe(el));
  });
}

function tick() {
  if (document.visibilityState !== 'visible' || Date.now() - lastActivity > IDLE_MS) return;
  seconds++;
  for (const id of inView) sectionSeconds.set(id, (sectionSeconds.get(id) ?? 0) + 1);
}

function flush() {
  const visit = visitId();
  if (!visit || seconds === 0) return;
  const body = JSON.stringify({
    type: 'engagement',
    visit,
    seconds,
    pages: [...pages],
    sections: Object.fromEntries(sectionSeconds),
  });
  if (body === lastSent) return;
  lastSent = body;
  fetch('/api/track', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body })
    .catch(() => {});
}

export function trackEngagement() {
  const active = () => { lastActivity = Date.now(); };
  for (const type of ['scroll', 'wheel', 'pointerdown', 'pointermove', 'keydown', 'touchstart']) {
    window.addEventListener(type, active, { passive: true, capture: true });
  }
  setInterval(tick, 1000);
  setInterval(flush, 30_000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
    else active();
  });
  window.addEventListener('pagehide', flush);
}
