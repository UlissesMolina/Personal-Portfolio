// Logs clicks on outbound links, email, the résumé, and project pages, tied to this session's visit.
const VISIT_KEY = 'visit-id';
const VISITOR_KEY = 'visitor-id';

// A random ID kept in this browser so return visits can be recognized; it identifies nothing else.
export function visitorId() {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

export function saveVisitId(id: string) {
  try { sessionStorage.setItem(VISIT_KEY, id); } catch { /* storage blocked */ }
}

function visitId() {
  try { return sessionStorage.getItem(VISIT_KEY); } catch { return null; }
}

function worthLogging(url: URL) {
  if (url.protocol === 'mailto:' || url.protocol === 'tel:') return true;
  if (url.origin !== location.origin) return true;
  return /\.pdf$/i.test(url.pathname) || url.pathname.startsWith('/projects/');
}

function onClick(e: MouseEvent) {
  if (e.type === 'auxclick' && e.button !== 1) return; // middle-click opens a new tab too
  const link = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  const visit = visitId();
  if (!link || !visit) return;

  let url: URL;
  try { url = new URL(link.href, location.href); } catch { return; }
  if (!worthLogging(url)) return;

  const label = (link.getAttribute('aria-label') || link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120);
  fetch('/api/track', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'click', visit, href: url.href, label }),
  }).catch(() => {});
}

export function trackClicks() {
  document.addEventListener('click', onClick, true);
  document.addEventListener('auxclick', onClick, true);
}
