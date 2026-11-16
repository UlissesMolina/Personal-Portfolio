import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { currentTheme, toggleTheme } from './Widgets';

export default function Nav() {
  const [theme, setTheme] = useState(currentTheme);
  const onProjects = useLocation().pathname.startsWith('/projects');

  return (
    <nav className="site-nav">
      <Link to="/" className="home">Ulisses Molina</Link>
      <ul>
        <li><Link to="/#experience">experience</Link></li>
        <li><Link to="/projects" aria-current={onProjects ? 'page' : undefined}>projects</Link></li>
        <li><a href="/uliResume.pdf" target="_blank" rel="noopener noreferrer">resume</a></li>
        <li>
          <button type="button" className="theme-toggle" onClick={() => setTheme(toggleTheme())}>
            {theme === 'dark' ? 'light' : 'dark'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
