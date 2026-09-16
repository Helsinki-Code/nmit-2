import { Link } from 'react-router-dom';
import { IntegrationDiagram } from '../components/IntegrationDiagram';
import { ClientNames, PostItem, Readout, ServiceRow, Workshop } from '../components/Content';
import { posts } from '../data/posts';
export function Home() {
  return <>
    <section className="hero hero-anim"><div>
      <h1>Your ERP doesn’t talk to your payment gateway. We build the layer that does.</h1>
      <p className="lede">NM IT Solutions is a Bengaluru-based team of 40+ engineers working on cloud infrastructure, DevOps, and API integration for banks, exchanges, and insurers.</p>
      <div className="cta-row"><Link className="btn btn-primary" to="/contact/workshop">Book the free integration workshop</Link><Link className="btn btn-outline" to="/services">See how the four services fit together</Link></div>
    </div><div><IntegrationDiagram /></div></section>
    <div className="wrap"><div className="rule" /></div>
    <section className="tight prose"><h2>What we do</h2>
      <ServiceRow name="DevOps" text="Release pipelines, monitoring, and incident response for teams running production systems." />
      <ServiceRow name="Cloud services" text="Migration, scaling, and ongoing management of cloud infrastructure." />
      <ServiceRow name="API integration" text="Connecting CRMs, ERPs, payment systems, and internal tools through a shared API layer." core />
      <ServiceRow name="Staffing" text="Engineers placed on your team for the length of a project or on an ongoing basis." />
      <p style={{ marginTop:20 }}><Link to="/services">Read the full breakdown →</Link></p>
    </section>
    <section className="tight"><Workshop /></section>
    <section className="tight"><h2>By the numbers</h2><Readout /></section>
    <section className="tight"><h2>Organizations we’ve worked with</h2><div className="clients-grid"><ClientNames /></div></section>
    <section className="tight"><h2>From the blog</h2><div className="post-list">{posts.slice(0,3).map(post => <PostItem key={post.slug} post={post} />)}</div><p style={{ marginTop:16 }}><Link to="/blog">All posts →</Link></p></section>
  </>;
}
