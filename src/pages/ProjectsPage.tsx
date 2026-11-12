import { projects } from '../data';
import ProjectRow from '../components/ProjectRow';

export default function ProjectsPage() {
  return (
    <section className="section-strip pt-16 pb-20">
      <h1 className="text-2xl font-medium text-ctp-text mb-8">projects</h1>
      <div className="flex flex-col">
        {projects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
