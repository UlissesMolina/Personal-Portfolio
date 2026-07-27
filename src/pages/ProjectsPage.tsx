import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { projects } from '../data';
import type { Project } from '../data';

const cardReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index % 2 === 1 ? 0.12 : 0 }}
    >
      <Link to={`/projects/${project.slug}`} className="group block">
        <div className="project-card-img">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-4">
          <h2 className="text-sm font-medium text-ctp-text group-hover:text-ctp-accent transition-colors duration-200">
            {project.title}
          </h2>
          <p className="text-[11px] text-ctp-overlay0 mt-1 leading-relaxed">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <div>
      <section className="section-strip pt-20 pb-16">
        <motion.h1
          className="text-2xl font-medium text-ctp-text mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          projects
        </motion.h1>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
