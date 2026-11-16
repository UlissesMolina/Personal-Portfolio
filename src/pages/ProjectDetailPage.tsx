import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data';

function Video({ src }: { src: string }) {
  return (
    <video className="framed" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) return <Navigate to="/projects" replace />;

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <article>
      <h1 className="page-title">{project.title}</h1>
      <p className="meta">
        {project.year} · {project.tags.join(', ')}
        {project.demoUrl && <> · <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">live</a></>}
        {' · '}<a href={project.githubUrl} target="_blank" rel="noopener noreferrer">code</a>
      </p>

      <p>{project.longDescription}</p>

      {project.heroVideo && <Video src={project.heroVideo} />}

      {project.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
          {section.video && <Video src={section.video} />}
        </section>
      ))}

      <p className="more">
        Next: <Link to={`/projects/${nextProject.slug}`}>{nextProject.title}</Link>
      </p>
    </article>
  );
}
