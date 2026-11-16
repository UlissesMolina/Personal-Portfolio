import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/geist-sans/400.css';
import '@fontsource/geist-sans/500.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/ibm-plex-mono/400.css';
import './index.css';
import { initTheme } from './components/Widgets';

// Set theme before first paint
initTheme();

// Opt into entrance animations before first paint, so nothing flashes in
// and then hides. Reduced-motion users never get the class.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
