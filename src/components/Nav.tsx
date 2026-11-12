import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getThemeState, toggleLightDark } from './Widgets';

const navItem = 'text-xs transition-colors';
const inactive = 'text-ctp-subtext0 hover:text-ctp-text';
const active = 'text-ctp-text';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => getThemeState().isDark);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const onProjects = location.pathname.startsWith('/projects');

  const goToWork = () => {
    if (isHome) {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
    setMenuOpen(false);
  };

  const items = (
    <>
      <button type="button" onClick={goToWork} className={`${navItem} ${inactive}`}>
        work
      </button>
      <Link to="/projects" onClick={() => setMenuOpen(false)} className={`${navItem} ${onProjects ? active : inactive}`}>
        projects
      </Link>
      <a href="/uliResume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className={`${navItem} ${inactive}`}>
        resume
      </a>
    </>
  );

  return (
    <header className="nav-header sticky top-0 z-40 bg-ctp-base/90 backdrop-blur-md">
      <div className="mx-auto max-w-content w-full flex items-center justify-between px-8 py-4">
        <Link
          to="/"
          className="text-sm font-medium text-ctp-text tracking-tight hover:text-ctp-accent transition-colors"
        >
          umolina.com
        </Link>

        {/* desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">{items}</nav>

        <div className="flex items-center gap-2">
          {/* light/dark toggle */}
          <button
            type="button"
            onClick={() => setIsDark(toggleLightDark())}
            className="text-ctp-subtext0 hover:text-ctp-text transition-colors p-1.5"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            )}
          </button>

          {/* mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="sm:hidden text-ctp-subtext0 hover:text-ctp-text transition-colors p-1"
            aria-label={menuOpen ? 'close menu' : 'open menu'}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="14" y2="14" />
                  <line x1="14" y1="4" x2="4" y2="14" />
                </>
              ) : (
                <>
                  <line x1="3" y1="5" x2="15" y2="5" />
                  <line x1="3" y1="9" x2="15" y2="9" />
                  <line x1="3" y1="13" x2="15" y2="13" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
        <nav id="mobile-nav" className="sm:hidden flex flex-col items-start gap-1 border-t border-ctp-surface0/50 bg-ctp-base/95 backdrop-blur-md px-6 pb-4 pt-2 [&>*]:py-2">
          {items}
        </nav>
      )}
    </header>
  );
}
