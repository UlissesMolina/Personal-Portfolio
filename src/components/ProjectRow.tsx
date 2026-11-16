import { Link } from 'react-router-dom';
import type { Project } from '../data';

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <li>
      <div className="entry-head">
        <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <span className="meta">{project.year}</span>
      </div>
      <p>{project.description}</p>
      <div className="meta">
        {project.tags.join(', ')}
        {project.demoUrl && <> · <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">live</a></>}
        {' · '}<a href={project.githubUrl} target="_blank" rel="noopener noreferrer">code</a>
      </div>
    </li>
  );
}
