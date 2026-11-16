import { Link } from 'react-router-dom';
import type { Project } from '../data';

// Looping preview when the project has one, a still cover otherwise, and the
// project name set large as the fallback.
function CardMedia({ project }: { project: Project }) {
  if (project.heroVideo) {
    return (
      <video autoPlay loop muted playsInline preload="metadata" poster={project.cover} aria-hidden="true">
        <source src={project.heroVideo} type="video/mp4" />
      </video>
    );
  }
  if (project.cover) return <img src={project.cover} alt="" loading="lazy" />;
  return <span className="placeholder" aria-hidden="true">{project.title}</span>;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="card">
      <Link to={`/projects/${project.slug}`} className="card-link">
        <div className="card-media"><CardMedia project={project} /></div>
        <div className="card-head">
          <span>{project.title}</span>
          <span className="faint">{project.year}</span>
        </div>
        <div className="dim">{project.tags.join(' · ')}</div>
        <p>{project.description}</p>
      </Link>
    </li>
  );
}
