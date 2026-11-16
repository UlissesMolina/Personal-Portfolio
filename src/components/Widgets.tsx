import { useEffect, useState } from 'react';
import { SPOTIFY_ENDPOINT, GITHUB_USERNAME } from '../data';

// ─── theme ───────────────────────────────────────────────────────────────────

const THEME_KEY = 'theme';

type Theme = 'light' | 'dark';

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch { /* noop */ }
  return null;
}

export function currentTheme(): Theme {
  return getStoredTheme()
    ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

export function initTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme());
}

export function toggleTheme(): Theme {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(THEME_KEY, next); } catch { /* noop */ }
  return next;
}

// ─── now playing ─────────────────────────────────────────────────────────────

interface SpotifyData {
  isPlaying: boolean;
  track?: string;
  artist?: string;
  spotifyUrl?: string;
}

interface SavedTrack {
  track: string;
  artist: string;
  spotifyUrl?: string;
}

const LAST_TRACK_KEY = 'spotify_last_track';

function loadLastTrack(): SavedTrack | null {
  try {
    const raw = localStorage.getItem(LAST_TRACK_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function NowPlaying() {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState<SavedTrack | null>(loadLastTrack);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch(SPOTIFY_ENDPOINT, { cache: 'no-store' });
        if (!res.ok) return;
        const json: SpotifyData = await res.json();
        if (json.isPlaying && json.track && json.artist) {
          const current = { track: json.track, artist: json.artist, spotifyUrl: json.spotifyUrl };
          try { localStorage.setItem(LAST_TRACK_KEY, JSON.stringify(current)); } catch { /* noop */ }
          setTrack(current);
          setPlaying(true);
        } else {
          setPlaying(false);
        }
      } catch { /* keep last known track */ }
    };

    fetchNowPlaying();
    const id = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(id);
  }, []);

  if (!track) return null;

  const title = track.spotifyUrl
    ? <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer">{track.track}</a>
    : <cite>{track.track}</cite>;

  return (
    <p>
      {playing ? 'Listening to ' : 'Last listened to '}
      {title} by {track.artist}.
    </p>
  );
}

// ─── recent commits ──────────────────────────────────────────────────────────

interface CommitData {
  repo: string;
  repoFullName: string;
  message: string;
  timestamp: string;
  sha: string;
}

function timeAgo(dateStr: string): string {
  const mins = Math.floor((Date.now() - new Date(dateStr).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function RecentCommits() {
  const [commits, setCommits] = useState<CommitData[]>([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=4&type=owner`
        );
        if (!reposRes.ok) return;
        const repos: { full_name: string; name: string }[] = await reposRes.json();

        const results = await Promise.all(
          repos.map(async (repo) => {
            const res = await fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=2`);
            if (!res.ok) return [];
            const data: { sha: string; commit: { message: string; author: { date: string } } }[] = await res.json();
            return data.map((c) => ({
              repo: repo.name,
              repoFullName: repo.full_name,
              message: c.commit.message.split('\n')[0],
              timestamp: c.commit.author.date,
              sha: c.sha,
            }));
          })
        );

        const all = results.flat();
        all.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setCommits(all.slice(0, 3));
      } catch { /* leave empty */ }
    };
    fetchCommits();
  }, []);

  if (commits.length === 0) return null;

  return (
    <>
      <p>Recent commits:</p>
      <ul className="commits meta">
        {commits.map((c) => (
          <li key={c.sha}>
            <span className="when">{timeAgo(c.timestamp)}</span>
            <a className="msg" href={`https://github.com/${c.repoFullName}/commit/${c.sha}`} target="_blank" rel="noopener noreferrer">
              {c.repo}: {c.message}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
