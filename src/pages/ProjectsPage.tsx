import { projects } from '../data';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  return (
    <>
      <h1 className="page-title">Projects</h1>
      <ul className="cards">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </>
  );
}
