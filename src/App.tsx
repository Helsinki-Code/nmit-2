import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Blog, BlogPost } from './pages/Blog';
import { Contact } from './pages/Contact';
import { applyPageSeo } from './seo';
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    applyPageSeo(pathname);
    if (window.location.hash && !window.location.hash.startsWith('#/')) {
      requestAnimationFrame(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView());
    } else window.scrollTo(0,0);
  }, [pathname]);
  return null;
}
export function App() {
  return <><a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a><Header /><RouteEffects />
    <main id="main" tabIndex={-1}><div className="wrap" id="app"><Routes>
      <Route path="/" element={<Home />} /><Route path="/services" element={<Services />} /><Route path="/about" element={<About />} /><Route path="/careers" element={<Careers />} /><Route path="/blog" element={<Blog />} /><Route path="/blog/:slug" element={<BlogPost />} /><Route path="/contact" element={<Contact />} /><Route path="/contact/:preset" element={<Contact />} />
      <Route path="*" element={<section><h1>Page not found</h1><p><Link to="/">Back home</Link></p></section>} />
    </Routes></div></main><Footer />
  </>;
}
