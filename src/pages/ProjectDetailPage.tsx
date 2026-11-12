import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data';

const textLink = 'text-[11px] text-ctp-subtext0 hover:text-ctp-text transition-colors';

function Video({ src }: { src: string }) {
  return (
    <div className="video-frame">
      <video autoPlay loop muted playsInline preload="auto">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) return <Navigate to="/projects" replace />;

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <section className="section-strip pt-16 pb-20">
      <div className="mb-10">
        <Link to="/projects" className={textLink}>
          <span aria-hidden="true">←</span> all projects
        </Link>
      </div>

      <div className="mb-10">
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <h1 className="text-xl font-medium text-ctp-text">{project.title}</h1>
          <span className="text-[11px] text-ctp-overlay0 shrink-0 tabular-nums">{project.year}</span>
        </div>

        <p className="text-xs text-ctp-subtext0 leading-relaxed max-w-[65ch] mb-4">
          {project.longDescription}
        </p>

        <p className="text-[11px] text-ctp-overlay0 mb-4">{project.tags.join(' · ')}</p>

        <div className="flex items-center gap-4">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
              live <span aria-hidden="true">↗</span>
            </a>
          )}
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
            code <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      {project.heroVideo && (
        <div className="mb-16">
          <Video src={project.heroVideo} />
        </div>
      )}

      {project.sections.length > 0 && (
        <div className="flex flex-col gap-12">
          {project.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xs font-medium text-ctp-text mb-2 tracking-wide">
                {section.title}
              </h2>
              <p className="text-[11px] text-ctp-subtext0 leading-relaxed max-w-[60ch]">
                {section.body}
              </p>
              {section.video && (
                <div className="mt-6">
                  <Video src={section.video} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="next-project">
        <Link to={`/projects/${nextProject.slug}`} className="flex flex-col items-end text-right">
          <span className="text-[10px] text-ctp-overlay0 mb-1">next project</span>
          <span className="text-sm font-medium text-ctp-text hover:text-ctp-accent transition-colors">
            {nextProject.title} <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
