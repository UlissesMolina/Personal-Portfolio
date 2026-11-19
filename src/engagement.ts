import { visitId } from './trackClicks';

// Measures engaged time (tab visible and someone active in the last minute), pages viewed, and
// seconds spent on each section with an id; sent with this session's visit for the stats dashboard.
const IDLE_MS = 60_000;

let seconds = 0;
const pages = new Set<string>();
const sectionSeconds = new Map<string, number>();
let sections: HTMLElement[] = [];
let lastActivity = Date.now();
let lastSent = '';

// Call on every route change: records the page and picks up its sections.
export function trackPage(pathname: string) {
  pages.add(pathname);
  sections = [];
  // Wait a frame so the new route's sections are in the DOM.
  requestAnimationFrame(() => {
    sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
  });
}

// The section under a reading line is the one being read. The line moves from 20% down the
// screen at the top of the page to 90% at the bottom, so short sections near either end still
// get their turn on tall screens.
function sectionInFocus() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  const line = window.innerHeight * (0.2 + 0.7 * progress);
  let best: HTMLElement | null = null;
  let bestDistance = Infinity;
  for (const el of sections) {
    const r = el.getBoundingClientRect();
    const distance = line < r.top ? r.top - line : line > r.bottom ? line - r.bottom : 0;
    if (distance < bestDistance) {
      best = el;
      bestDistance = distance;
    }
  }
  return best?.id ?? null;
}

function tick() {
  if (document.visibilityState !== 'visible' || Date.now() - lastActivity > IDLE_MS) return;
  seconds++;
  const id = sectionInFocus();
  if (id) sectionSeconds.set(id, (sectionSeconds.get(id) ?? 0) + 1);
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
