import { Link } from 'react-router-dom';
import type { Project } from '../data';

const linkClass =
  'text-[11px] text-ctp-subtext0 hover:text-ctp-text transition-colors shrink-0';

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="project-row">
      <span className="text-[11px] text-ctp-overlay0 tabular-nums pt-[3px]">
        {project.year}
      </span>

      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-4">
          <Link
            to={`/projects/${project.slug}`}
            className="text-sm font-medium text-ctp-text hover:text-ctp-accent transition-colors truncate"
          >
            {project.title}
          </Link>
          <div className="flex items-center gap-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
                aria-label={`${project.title} live site`}
              >
                live <span aria-hidden="true">↗</span>
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              aria-label={`${project.title} source code`}
            >
              code <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <p className="text-xs text-ctp-subtext0 leading-relaxed mt-1 max-w-[65ch]">
          {project.description}
        </p>

        <p className="text-[11px] text-ctp-overlay0 mt-1.5">
          {project.tags.join(' · ')}
        </p>
      </div>
    </article>
  );
}
