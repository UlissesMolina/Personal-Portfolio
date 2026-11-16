import { projects } from '../data';
import ProjectRow from '../components/ProjectRow';

export default function ProjectsPage() {
  return (
    <>
      <h1>Projects</h1>
      <ul className="entries">
        {projects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </ul>
    </>
  );
}
