import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Socials from './components/Socials';
import { useReveal } from './components/useReveal';

// New page → top; "/#section" links → that section.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function RevealOnScroll() {
  useReveal(useLocation().pathname);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RevealOnScroll />
      <div className="page">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Ulisses Molina</span>
          <span className="footer-right">Auburn, AL <Socials /></span>
        </footer>
      </div>
    </BrowserRouter>
  );
}
