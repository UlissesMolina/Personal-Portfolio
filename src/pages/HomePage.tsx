import { Link } from 'react-router-dom';
import { experiences, featuredProjects } from '../data';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { RecentCommits } from '../components/Widgets';

// "08.2026 – present" → "8/26 – Now"
function shortPeriod(period: string) {
  return period
    .replace(/(\d{2})\.\d{2}(\d{2})/g, (_, m: string, y: string) => `${Number(m)}/${y}`)
    .replace('present', 'Now');
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="experience">
        <h2>Experience</h2>
        <ul className="timeline">
          {experiences.map((exp, i) => (
            <li key={`${exp.company}-${exp.title}`}>
              <span className={i === 0 ? 'when now' : 'when'}>{shortPeriod(exp.period)}</span>
              <div>
                <div>{exp.company}</div>
                <div className="dim">{exp.title}</div>
                <p className="desc">{exp.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <ul className="cards">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ul>
        <Link to="/projects" className="more">View all projects →</Link>
      </section>

      <section id="lately">
        <h2>Lately</h2>
        {/* <NowPlaying /> hidden until the Spotify refresh token is renewed */}
        <RecentCommits />
      </section>
    </>
  );
}
