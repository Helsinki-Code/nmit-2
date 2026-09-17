import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles.css';
import './article.css';
// Preserve shared links from the earlier static-hosting design.
if (window.location.hash.startsWith('#/')) {
  const legacyPath = window.location.hash.slice(1);
  window.history.replaceState(null, '', legacyPath);
}
createRoot(document.getElementById('root')!).render(
  <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>
);
