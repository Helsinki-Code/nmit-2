import { ContextGuide } from '../components/CharacterGuide';
export function Careers() {
  return <>
    <section className="prose"><h1>Careers</h1><p className="lede" style={{ color:'var(--ink-muted)' }}>We’re 40+ people working on cloud infrastructure and integration problems for financial and insurance clients. Most of the team is in Bengaluru.</p></section>
    <section className="tight prose"><h2>Where people usually fit in</h2><div className="role-grid">{['DevOps engineers','Cloud engineers','API / integration engineers','Interface and product designers'].map(role => <span key={role}>{role}</span>)}</div>
      <div className="apply-box"><h3>Open roles</h3><p style={{ color:'var(--ink-muted)' }}>We don’t have specific openings listed here right now. If one of the areas above matches what you do, send your resume with the role you’re interested in, and someone will get back to you.</p><a className="btn btn-primary" href="mailto:info@nmit-solutions.com?subject=Application">Email your resume</a></div>
    </section>
    <ContextGuide pose="man-welcome" title="See the problems our work touches." text="Our guides cover data contracts, ambiguous payment outcomes, migration dependencies, and production recovery. They offer a useful introduction to the engineering decisions behind an integration." href="/blog" label="Read the engineering guides" />
  </>;
}
