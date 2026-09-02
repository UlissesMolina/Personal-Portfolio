export type TagColor = 'blue' | 'peach' | 'green' | 'red' | 'teal' | 'yellow' | 'mauve' | 'pink';

export interface Tag {
  label: string;
  color: TagColor;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  tags: Tag[];
}

export interface ProjectSection {
  title: string;
  body: string;
  video?: string;
}

export interface Project {
  slug: string;
  title: string;
  status: 'live' | 'shipped' | 'archived';
  description: string;
  longDescription: string;
  highlights: string[];
  sections: ProjectSection[];
  tags: Tag[];
  image: string;
  heroVideo?: string;
  githubUrl: string;
  demoUrl: string | null;
  year: string;
  buildTime: string;
  featured?: boolean;
}

// ─── constants ───────────────────────────────────────────────────────────────

export const GITHUB_USERNAME = 'UlissesMolina';
export const EMAIL = 'umolina2005@gmail.com';
export const YOUTUBE_CHANNEL = 'https://www.youtube.com/@ulissesCodes';

// ─── youtube ─────────────────────────────────────────────────────────────────

export interface Video {
  title: string;
  duration: string;
  tag: string;
  url: string;
  thumbnailUrl: string;
}

export const videos: Video[] = [
  {
    title: 'Cooked CS Student leetcodes for the first time...',
    duration: '12:57',
    tag: 'cs / career / leetcode',
    url: 'https://youtu.be/fQ8wuC7N7LU',
    thumbnailUrl: 'https://img.youtube.com/vi/fQ8wuC7N7LU/mqdefault.jpg',
  },
  {
    title: 'I applied to 200 internships...',
    duration: '10:24',
    tag: 'cs / career / internships',
    url: 'https://youtu.be/zriIScCLl5Y',
    thumbnailUrl: 'https://img.youtube.com/vi/zriIScCLl5Y/mqdefault.jpg',
  },
];

// Update this to your Spotify proxy endpoint (Cloudflare Worker / Next API route)
// Should return { isPlaying, track, artist, progressMs, durationMs } or { isPlaying: false }
export const SPOTIFY_ENDPOINT = '/api/now-playing';

export const LANGUAGE_BAR = [
  { label: 'TypeScript', color: 'blue', percent: 45 },
  { label: 'Java', color: 'peach', percent: 25 },
  { label: 'C++', color: 'red', percent: 15 },
  { label: 'CSS', color: 'pink', percent: 10 },
  { label: 'Other', color: 'overlay0', percent: 5 },
] as const;


// ─── color map ───────────────────────────────────────────────────────────────

export const tagColorMap: Record<TagColor, string> = {
  blue: 'text-ctp-blue',
  peach: 'text-ctp-peach',
  green: 'text-ctp-green',
  red: 'text-ctp-red',
  teal: 'text-ctp-teal',
  yellow: 'text-ctp-yellow',
  mauve: 'text-ctp-mauve',
  pink: 'text-ctp-pink',
};

// ─── experience ──────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    title: 'student software developer',
    company: 'Auburn RFID Lab',
    period: '08.2026 – present',
    description:
      'Developing and maintainig internal software for RFID research systems',
    tags: [],
  },
  {
    title: 'software engineering intern',
    company: 'Room2Room Movers',
    period: '01.2026 – 05.2026',
    description:
      'Built internal dashboards in React used daily by operations staff to manage jobs and scheduling. Designed and shipped UI components focused on speed, clarity, and mobile usability.',
    tags: [
      { label: 'SQL', color: 'blue' },
      { label: 'Go', color: 'mauve' },
      { label: 'node.js', color: 'green' },
    ],
  },
  {
    title: 'software engineering intern',
    company: 'OCV, LLC',
    period: '09.2025 – 08.2026',
    description:
      'Contributed to client-facing business software handling real user data and workflows. Improved reliability through bug fixes, test coverage, and code review.',
    tags: [
      { label: 'xcode', color: 'blue' },
      { label: 'github', color: 'mauve' },
      { label: 'aws', color: 'peach' },
    ],
  },
];

// ─── projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: 'trackr',
    title: 'trackr',
    status: 'live',
    description: 'Job application tracker with a Kanban board, timeline, and GPT-4o cover letter generation.',
    longDescription:
      'Job application tracker with a Kanban board, timeline, and GPT-4o cover letter generation.',
    highlights: [
      'Drag-and-drop Kanban board with real-time state persistence',
      'GPT-4o generates tailored cover letters from job descriptions',
      'Timeline view tracks application lifecycle from apply → offer',
    ],
    sections: [],
    tags: [
      { label: 'react', color: 'blue' },
      { label: 'typescript', color: 'blue' },
      { label: 'node.js', color: 'green' },
      { label: 'openai', color: 'mauve' },
    ],
    image: '/thumbnails/trackr_cover.png',
    heroVideo: '/previews/trackrShowcase-h264.mp4',
    githubUrl: 'https://github.com/UlissesMolina/Trackr',
    demoUrl: 'https://usetrackr.netlify.app/',
    year: '2025',
    buildTime: '2025',
    featured: true,
  },
  {
    slug: 'tiger-scheduler',
    title: 'tiger scheduler',
    status: 'shipped',
    description: 'Auto-register tool for Auburn University course scheduling. Automates seat monitoring and registration.',
    longDescription:
      'Auto-register tool for Auburn University course scheduling. Automates seat monitoring and registration.',
    highlights: [
      'Selenium bot polls seat availability every 30s across target sections',
      'Auto-registers the moment a seat opens — zero manual intervention',
      'Used by Auburn students to beat waitlist bottlenecks',
    ],
    sections: [],
    tags: [
      { label: 'python', color: 'green' },
      { label: 'selenium', color: 'teal' },
    ],
    image: '/thumbnails/placeholder.svg',
    githubUrl: 'https://github.com/UlissesMolina/Tiger-Scheduler-Course-Auto-Register-Tool',
    demoUrl: null,
    year: '2025',
    buildTime: '2025',
  },
  {
    slug: 'world-cup',
    title: 'world cup predictor',
    status: 'shipped',
    description: 'Full-stack prediction system for the 2026 FIFA World Cup. XGBoost & PyTorch models on 45k+ matches, FastAPI predictions, Monte Carlo simulations.',
    longDescription:
      'Full-stack prediction system for the 2026 FIFA World Cup. Trains XGBoost and PyTorch models on 45,000+ historical international matches, serves live win-probability predictions via FastAPI, and runs Monte Carlo tournament simulations across all 48 teams.',
    highlights: [
      'Trained on 45,000+ international matches — XGBoost + PyTorch ensemble',
      'FastAPI serves live win-probability predictions per matchup',
      'Monte Carlo simulations model full 48-team tournament brackets',
    ],
    sections: [],
    tags: [
      { label: 'python', color: 'green' },
      { label: 'pytorch', color: 'red' },
      { label: 'fastapi', color: 'teal' },
      { label: 'xgboost', color: 'peach' },
    ],
    image: '/thumbnails/placeholder.svg',
    githubUrl: 'https://github.com/UlissesMolina/worldCup',
    demoUrl: null,
    year: '2025',
    buildTime: '2025',
    featured: true,
  },
  {
    slug: 'expense-flow',
    title: 'expense flow',
    status: 'shipped',
    description: 'REST API for expense report submissions. JWT auth, role-based access, multi-step approval workflow.',
    longDescription:
      'REST API for expense report submissions. JWT auth, role-based access, multi-step approval workflow.',
    highlights: [
      'JWT auth with role-based access control (employee → manager → admin)',
      'Multi-step approval workflow with audit trail logging',
      'Dockerized Spring Boot service with PostgreSQL persistence',
    ],
    sections: [],
    tags: [
      { label: 'java', color: 'peach' },
      { label: 'spring boot', color: 'green' },
      { label: 'postgresql', color: 'blue' },
      { label: 'docker', color: 'blue' },
    ],
    image: '/thumbnails/placeholder.svg',
    githubUrl: 'https://github.com/UlissesMolina/Enterprise',
    demoUrl: null,
    year: '2026',
    buildTime: '2026',
  },
  {
    slug: 'clarity',
    title: 'clarity finance',
    status: 'live',
    description: 'Personal finance dashboard. Income, expenses, savings, spending trends.',
    longDescription:
      'Personal finance dashboard. Income, expenses, savings, spending trends.',
    highlights: [
      'Interactive charts visualize income, expenses & savings over time',
      'Category-level spending breakdown with trend analysis',
      'Responsive dashboard layout built with pure CSS Grid',
    ],
    sections: [],
    tags: [
      { label: 'react', color: 'blue' },
      { label: 'typescript', color: 'blue' },
      { label: 'css', color: 'peach' },
    ],
    image: '/previews/clarity_finance_cover.png',
    heroVideo: '/previews/clarityFinance-h264.mp4',
    githubUrl: 'https://github.com/UlissesMolina/FinanceDashBoard',
    demoUrl: 'https://clarityfi.netlify.app/',
    year: '2025',
    buildTime: '2025',
  },
];

// featured projects shown on homepage (slugs)
export const FEATURED_SLUGS = ['trackr', 'tiger-scheduler'];
export const featuredProjects = projects.filter((p) =>
  FEATURED_SLUGS.includes(p.slug),
);

// ─── blog ───────────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  body: string;
  tags: Tag[];
}

export const blogPosts: BlogPost[] = [];
