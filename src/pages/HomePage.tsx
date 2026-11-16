import { Link } from 'react-router-dom';
import { experiences, featuredProjects, EMAIL, GITHUB_USERNAME } from '../data';
import ProjectRow from '../components/ProjectRow';
import { NowPlaying, RecentCommits } from '../components/Widgets';

export default function HomePage() {
  return (
    <>
      <h1>Ulisses Molina</h1>
      <p>
        I study software engineering at Auburn University and work as a student developer at the
        Auburn RFID Lab. I'm mostly interested in full-stack and AI development. My five-person
        team won codeLinc 11 with Molar Money, a dental benefits copilot that estimates procedure
        costs and plans treatment across plan years.
      </p>
      <p>
        You can find me on <a href={`https://github.com/${GITHUB_USERNAME}`}>GitHub</a>{' '}
        and <a href="https://www.linkedin.com/in/ulissesmolina">LinkedIn</a>, read
        my <a href="/uliResume.pdf">resume</a>, or email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>

      <h2 id="work">Work</h2>
      <ul className="entries">
        {experiences.map((exp) => (
          <li key={`${exp.company}-${exp.title}`}>
            <div className="entry-head">
              <h3>{exp.title}, {exp.company}</h3>
              <span className="meta">{exp.period}</span>
            </div>
            <p>{exp.description}</p>
            <div className="meta">{exp.tags.join(', ')}</div>
          </li>
        ))}
      </ul>

      <h2 id="projects">Projects</h2>
      <ul className="entries">
        {featuredProjects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </ul>
      <p><Link to="/projects">All projects →</Link></p>

      <h2>Lately</h2>
      <NowPlaying />
      <RecentCommits />
    </>
  );
}
