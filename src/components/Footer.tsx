import { Link } from 'react-router-dom';
export function Footer() {
  return <footer className="site"><div className="wrap"><div className="footer-grid">
    <div><Link className="brand" to="/"><span className="mark" aria-hidden="true" /><span className="word">NM<em>IT Solutions</em></span></Link>
      <p style={{ marginTop: 12, color: 'var(--ink-muted)', maxWidth: '34ch' }}>Cloud infrastructure, DevOps, and API integration for banks, exchanges, and insurers.</p>
    </div>
    <div><h4>site</h4><ul>{[['/services','Services'],['/about','About'],['/careers','Careers'],['/blog','Blog'],['/contact','Contact']].map(([to,label]) => <li key={to}><Link to={to}>{label}</Link></li>)}</ul></div>
    <div><h4>reach us</h4><ul><li><a href="tel:+919886970483">+91 98869 70483</a></li><li><a href="mailto:info@nmit-solutions.com">info@nmit-solutions.com</a></li><li><a href="https://www.linkedin.com/company/nmit-solutions-pvt-ltd/" target="_blank" rel="noopener">LinkedIn</a></li></ul></div>
  </div><div className="copyright">© 2026 NM IT Solutions Pvt Ltd · 5th Floor, Samhitha Aspire, 1st Main Road, Pai Layout, Old Madras Road, Bengaluru 560016</div></div></footer>;
}
