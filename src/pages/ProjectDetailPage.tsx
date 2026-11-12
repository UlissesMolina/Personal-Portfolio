import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { projects } from '../data';

/* ── animation presets ── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── video container ── */
function VideoContainer({ src }: { src: string }) {
  return (
    <div className="video-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-auto block"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

/* ── page component ── */
export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) return <Navigate to="/projects" replace />;

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div>
      <motion.section
        className="section-strip pt-16 pb-20"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* ── back nav ── */}
        <motion.div variants={fadeUp} className="mb-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase text-ctp-overlay0 hover:text-ctp-text transition-colors duration-200"
          >
            <span>&#8592;</span> All Projects
          </Link>
        </motion.div>

        {/* ── header block — clean & linear ── */}
        <motion.div variants={fadeUp} className="mb-10">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h1 className="text-xl font-medium text-ctp-text">{project.title}</h1>
            <span className="text-[10px] text-ctp-overlay0 shrink-0">{project.year}</span>
          </div>

          <p className="text-xs text-ctp-subtext0 leading-relaxed max-w-[65ch] mb-5">
            {project.longDescription}
          </p>

          <p className="text-[10px] text-ctp-overlay0 mb-5">{project.tags.join(' · ')}</p>

          <div className="flex items-center gap-6">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-link detail-link--primary"
              >
                LIVE DEMO <span className="arrow-nudge">&#8599;</span>
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-link detail-link--secondary"
            >
              SOURCE CODE <span className="arrow-nudge">&#8599;</span>
            </a>
          </div>
        </motion.div>

        {/* ── hero video ── */}
        {project.heroVideo && (
          <motion.div variants={fadeUp} className="mb-20">
            <VideoContainer src={project.heroVideo} />
          </motion.div>
        )}

        {/* ── technical sections ── */}
        {project.sections.length > 0 && (
          <motion.div variants={stagger} className="case-study-sections">
            {project.sections.map((section, i) => (
              <motion.div key={i} variants={fadeUp} className="case-study-section">
                <h2 className="text-xs font-medium text-ctp-text mb-2 tracking-wide">
                  {section.title}
                </h2>
                <p className="text-[11px] text-ctp-subtext0 leading-relaxed max-w-[60ch]">
                  {section.body}
                </p>

                {section.video && (
                  <div className="mt-6">
                    <VideoContainer src={section.video} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── next project nav ── */}
        <motion.div variants={fadeUp} className="case-study-next">
          <div className="divider-line visible mb-8" />
          <Link
            to={`/projects/${nextProject.slug}`}
            className="group inline-flex flex-col items-end text-right"
          >
            <span className="text-[10px] text-ctp-overlay0 mb-1">next project</span>
            <span className="text-sm font-medium text-ctp-text group-hover:text-ctp-accent transition-colors duration-200 flex items-center gap-2">
              {nextProject.title} <span className="arrow-nudge">&#8594;</span>
            </span>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
