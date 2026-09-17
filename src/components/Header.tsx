import { BrandLogo } from './BrandLogo';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
type Theme = 'light' | 'dark';
const navigation = [['/', 'home'], ['/services', 'services'], ['/about', 'about'], ['/careers', 'careers'], ['/blog', 'blog'], ['/contact', 'contact']];
export function Header() {
  const [open, setOpen] = useState(false);
  const [override, setOverride] = useState<Theme | null>(() => {
    try { const saved = localStorage.getItem('nmit-theme'); return saved === 'light' || saved === 'dark' ? saved : null; } catch { return null; }
  });
  const [systemTheme, setSystemTheme] = useState<Theme>(() => typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const theme = override ?? systemTheme;
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemTheme(media.matches ? 'dark' : 'light');
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#14181A' : '#EEF0E9'); }, [theme]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setOverride(next);
    try { localStorage.setItem('nmit-theme', next); } catch { /* Preferences can be disabled. */ }
  }
  return <header className="site"><div className="header-row">
    <Link className="brand" to="/" aria-label="NM IT Solutions, home"><BrandLogo /></Link>
    <nav className={`primary${open ? ' open' : ''}`} id="primary-nav">
      {navigation.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}><span className="dot" />{label}</NavLink>)}
    </nav>
    <Link className="btn btn-primary" to="/contact/workshop">book the workshop</Link>
    <button className="theme-toggle" id="theme-toggle" role="switch" aria-checked={theme === 'dark'} aria-label="Toggle dark theme" onClick={toggleTheme}>
      <span>day</span><span className="tt-track"><span className="tt-knob" /></span><span>night</span>
    </button>
    <button className="menu-btn" id="menu-btn" aria-label="Toggle menu" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}><span /><span /><span /></button>
  </div></header>;
}
