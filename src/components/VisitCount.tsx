import { useEffect, useState } from 'react';

const SEEN_KEY = 'visit-counted';

// Counts once per browser session; later page loads just read the total.
export default function VisitCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch { /* storage blocked */ }

    fetch('/api/visits', { method: seen ? 'GET' : 'POST', cache: 'no-store' })
      .then((res) => res.json())
      .then((data: { count: number | null }) => {
        if (typeof data.count !== 'number') return;
        setCount(data.count);
        try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage blocked */ }
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;
  return <span className="visit-count">{count.toLocaleString()} visits</span>;
}
