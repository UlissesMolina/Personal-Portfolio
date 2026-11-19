import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data';

// Looping preview that only downloads and plays once a quarter of it is on screen,
// so it doesn't compete with the page's first load or keep decoding off screen.
function PreviewVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} loop muted playsInline preload="none" poster={poster} aria-hidden="true">
      <source src={src} type="video/mp4" />
    </video>
  );
}

// Looping preview when the project has one, a still cover otherwise, and the
// project name set large as the fallback.
function CardMedia({ project }: { project: Project }) {
  if (project.heroVideo) return <PreviewVideo src={project.heroVideo} poster={project.cover} />;
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
