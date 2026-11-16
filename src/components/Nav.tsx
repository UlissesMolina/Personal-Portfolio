import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { currentTheme, toggleTheme } from './Widgets';

export default function Nav() {
  const [theme, setTheme] = useState(currentTheme);
  const onProjects = useLocation().pathname.startsWith('/projects');

  return (
    <nav className="site-nav">
      <Link to="/" className="home">Ulisses Molina</Link>
      <Link to="/projects" aria-current={onProjects ? 'page' : undefined}>projects</Link>
      <a href="/uliResume.pdf" target="_blank" rel="noopener noreferrer">resume</a>
      <button type="button" className="theme-toggle" onClick={() => setTheme(toggleTheme())}>
        {theme === 'dark' ? 'light' : 'dark'}
      </button>
    </nav>
  );
}
