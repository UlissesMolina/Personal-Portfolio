import { Link } from 'react-router-dom';
import { experiences, featuredProjects, EMAIL, GITHUB_USERNAME, YOUTUBE_CHANNEL } from '../data';
import ProjectRow from '../components/ProjectRow';
import { NowPlayingWidget, RecentCommitsWidget } from '../components/Widgets';

const textLink = 'text-ctp-subtext0 hover:text-ctp-text transition-colors';

function SectionHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <h2 className="text-[13px] font-medium tracking-[0.08em] shrink-0 text-ctp-subtext1">
        {title}
      </h2>
      <div className="divider-line" />
      {right}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── hero ── */}
      <section className="section-strip pt-[72px] pb-[52px] border-t-0">
        <p className="text-[11px] tracking-[0.2em] text-ctp-subtext0 mb-4 flex items-center gap-1.5">
          <span>software engineer · auburn university</span>
          <span className="text-ctp-surface2">·</span>
          <svg className="w-3 h-3 text-ctp-overlay0 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span>Auburn, AL</span>
        </p>
        <h1 className="text-[44px] leading-none font-medium text-ctp-text mb-5 tracking-[-0.04em]">
          ulisses molina<span className="text-ctp-accent">.</span>
        </h1>
        <p className="text-[15px] text-ctp-subtext1 leading-[1.75] max-w-[620px]">
          Student software developer @ Auburn RFID Lab. Studying at Auburn University. Interested in full-stack development or AI development. Feel free to{' '}
          <button type="button" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-ctp-accent hover:text-ctp-accent/80 transition-colors">reach out</button>!
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-5 text-xs">
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className={textLink}>github</a>
          <span className="text-ctp-surface1">·</span>
          <a href="https://www.linkedin.com/in/ulissesmolina" target="_blank" rel="noopener noreferrer" className={textLink}>linkedin</a>
          <span className="text-ctp-surface1">·</span>
          <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className={textLink}>youtube</a>
          <span className="text-ctp-surface1">·</span>
          <a href={`mailto:${EMAIL}`} className={textLink}>email</a>
          <span className="text-ctp-surface1">·</span>
          <a href="/uliResume.pdf" target="_blank" rel="noopener noreferrer" className={textLink}>resume</a>
        </div>
      </section>

      {/* ── experience ── */}
      <section id="work" className="section-strip scroll-mt-20">
        <SectionHeader title="experience" />
        <div className="flex flex-col">
          {experiences.map((exp) => (
            <div key={`${exp.company}-${exp.title}`} className="exp-row">
              <div className="flex items-baseline justify-between gap-4 mb-1.5">
                <div className="flex items-baseline gap-2 min-w-0">
                  <span className="text-sm font-medium text-ctp-text truncate">{exp.title}</span>
                  <span className="text-xs text-ctp-accent shrink-0">{exp.company}</span>
                </div>
                <span className="text-[11px] text-ctp-overlay0 shrink-0 tabular-nums">
                  {exp.period}
                </span>
              </div>
              <p className="text-xs text-ctp-subtext1 leading-relaxed mb-2">
                {exp.description}
              </p>
              <p className="text-[11px] text-ctp-overlay0">{exp.tags.join(' · ')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── featured projects ── */}
      <section id="projects" className="section-strip scroll-mt-20">
        <SectionHeader
          title="featured work"
          right={
            <Link
              to="/projects"
              className="text-[11px] text-ctp-accent hover:text-ctp-accent/80 transition-colors shrink-0"
            >
              view all <span aria-hidden="true">→</span>
            </Link>
          }
        />
        <div className="flex flex-col">
          {featuredProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* ── listening ── */}
      <section className="section-strip">
        <SectionHeader title="listening" />
        <NowPlayingWidget />
      </section>

      {/* ── recent activity ── */}
      <section className="section-strip">
        <SectionHeader title="recent activity" />
        <RecentCommitsWidget />
      </section>

      {/* ── footer / contact ── */}
      <footer id="contact" className="section-strip scroll-mt-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-medium text-ctp-text mb-2">get in touch</h2>
            <a href={`mailto:${EMAIL}`} className="text-sm text-ctp-accent hover:text-ctp-accent/80 transition-colors">
              {EMAIL}
            </a>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" className={textLink}>github</a>
            <a href="https://www.linkedin.com/in/ulissesmolina" target="_blank" rel="noopener noreferrer" className={textLink}>linkedin</a>
            <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className={textLink}>youtube</a>
            <a href="/uliResume.pdf" target="_blank" rel="noopener noreferrer" className={textLink}>resume</a>
          </div>
        </div>
        <div className="text-[10px] text-ctp-subtext0 border-t border-ctp-surface0/30 pt-4">
          © {new Date().getFullYear()} Ulisses Molina
        </div>
      </footer>
    </>
  );
}
