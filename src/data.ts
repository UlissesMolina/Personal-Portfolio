export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export interface ProjectSection {
  title: string;
  body: string;
  video?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  sections: ProjectSection[];
  tags: string[];
  heroVideo?: string;
  githubUrl: string;
  demoUrl: string | null;
  year: string;
  featured?: boolean;
}

// ─── constants ───────────────────────────────────────────────────────────────

export const GITHUB_USERNAME = 'UlissesMolina';
export const EMAIL = 'umolina2005@gmail.com';
export const YOUTUBE_CHANNEL = 'https://www.youtube.com/@ulissesCodes';

// Spotify proxy endpoint (Netlify function).
// Returns { isPlaying, track, artist, progressMs, durationMs } or { isPlaying: false }
export const SPOTIFY_ENDPOINT = '/api/now-playing';

// ─── experience ──────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    title: 'student software developer',
    company: 'Auburn RFID Lab',
    period: '08.2026 – present',
    description:
      'Developing and maintaining internal software for RFID research systems',
    tags: ['go', 'node.js', 'sql'],
  },
  {
    title: 'software engineering intern',
    company: 'Room2Room Movers',
    period: '01.2026 – 05.2026',
    description:
      'Built internal dashboards in React used daily by operations staff to manage jobs and scheduling. Designed and shipped UI components focused on speed, clarity, and mobile usability.',
    tags: ['react', 'docker', 'node.js'],
  },
  {
    title: 'software engineering intern',
    company: 'OCV, LLC',
    period: '09.2025 – 08.2026',
    description:
      'Contributed to client-facing business software handling real user data and workflows. Improved reliability through bug fixes, test coverage, and code review.',
    tags: ['xcode', 'github', 'aws'],
  },
];

// ─── projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: 'trackr',
    title: 'trackr',
    description:
      'Job application tracker with a Kanban board, timeline, and GPT-4o cover letter generation.',
    longDescription:
      'A job application tracker built around a drag-and-drop Kanban board. Each application carries a status timeline, notes, interviews, and tags, and a cover letter generator sends the job description and your saved resume to GPT-4o for a first draft. Built with React, TypeScript, Express, and Prisma on PostgreSQL, with Clerk for auth.',
    sections: [
      {
        title: 'board and timeline',
        body:
          'Applications move across Saved, Applied, Interview, Offer, and Rejected columns. Every status change is recorded so the detail page can show a timeline from first apply to final outcome, alongside interview dates, online assessments, and follow-up reminders.',
      },
      {
        title: 'cover letters',
        body:
          'Paste a job description and the server combines it with your saved resume into a prompt for GPT-4o. The draft comes back as editable text you can save on the application. One resume is stored per account, so it is reused for every letter.',
      },
    ],
    tags: ['react', 'typescript', 'node.js', 'openai'],
    heroVideo: '/previews/trackrShowcase-h264.mp4',
    githubUrl: 'https://github.com/UlissesMolina/Trackr',
    demoUrl: 'https://usetrackr.netlify.app/',
    year: '2025',
    featured: true,
  },
  {
    slug: 'tiger-scheduler',
    title: 'tiger scheduler',
    description:
      'Auto-register tool for Auburn University course scheduling. Automates seat monitoring and registration.',
    longDescription:
      "A Python tool that watches Auburn's course registration system for open seats. A Selenium bot polls the target sections every 30 seconds and submits the registration form the moment a seat opens, so you are not sitting on the waitlist page refreshing by hand. Other Auburn students used it during registration week.",
    sections: [],
    tags: ['python', 'selenium'],
    githubUrl: 'https://github.com/UlissesMolina/Tiger-Scheduler-Course-Auto-Register-Tool',
    demoUrl: null,
    year: '2025',
  },
  {
    slug: 'world-cup',
    title: 'world cup predictor',
    description:
      'Full-stack prediction system for the 2026 FIFA World Cup. XGBoost & PyTorch models on 45k+ matches, FastAPI predictions, Monte Carlo simulations.',
    longDescription:
      'A prediction system for the 2026 FIFA World Cup. XGBoost and PyTorch models are trained on more than 45,000 historical international matches, and a FastAPI service serves win probabilities for any matchup. Monte Carlo simulations then run the full 48-team bracket thousands of times to estimate how far each side is likely to go.',
    sections: [],
    tags: ['python', 'pytorch', 'fastapi', 'xgboost'],
    githubUrl: 'https://github.com/UlissesMolina/worldCup',
    demoUrl: null,
    year: '2025',
    featured: true,
  },
  {
    slug: 'expense-flow',
    title: 'expense flow',
    description:
      'REST API for expense report submissions. JWT auth, role-based access, multi-step approval workflow.',
    longDescription:
      'A Spring Boot REST API for submitting and approving expense reports. JWT authentication with employee, manager, and admin roles gates a multi-step approval workflow, and every state change is written to an audit log. The service runs in Docker against PostgreSQL.',
    sections: [],
    tags: ['java', 'spring boot', 'postgresql', 'docker'],
    githubUrl: 'https://github.com/UlissesMolina/Enterprise',
    demoUrl: null,
    year: '2026',
  },
  {
    slug: 'clarity',
    title: 'clarity finance',
    description:
      'Personal finance dashboard. Income, expenses, savings, spending trends.',
    longDescription:
      'A personal finance dashboard that charts income, expenses, and savings over time, with a category-level spending breakdown and a trend view. The layout is plain CSS Grid and works down to phone widths. Built with React and TypeScript.',
    sections: [],
    tags: ['react', 'typescript', 'css'],
    heroVideo: '/previews/clarityFinance-h264.mp4',
    githubUrl: 'https://github.com/UlissesMolina/FinanceDashBoard',
    demoUrl: 'https://clarityfi.netlify.app/',
    year: '2025',
  },
];

// featured projects shown on the home page
export const featuredProjects = projects.filter((p) => p.featured);
