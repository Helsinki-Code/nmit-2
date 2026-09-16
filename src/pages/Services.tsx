import { ServiceRow, Workshop } from '../components/Content';
export function Services() {
  return <>
    <section className="prose"><h1>Four ways we get involved</h1><p className="lede" style={{ color:'var(--ink-muted)' }}>Most engagements start narrow — one integration, one migration — and grow from there once the first piece is working.</p></section>
    <section className="tight">
      <ServiceRow name="DevOps" text="We build and run the pipelines that get code into production and keep it there — release automation, environment provisioning, monitoring, and on-call response when something breaks." />
      <ServiceRow name="Cloud services" text="Migration off legacy hosting, scaling infrastructure to match load, and ongoing management so your cloud spend maps to what you’re actually using." />
      <ServiceRow name="API integration" text="Most of our work starts here. We connect systems that were never built to talk to each other — CRMs, ERPs, payment gateways, mobile apps — through microservices and a shared API layer, replacing point-to-point integrations that break every time one system changes." core />
      <ServiceRow name="Staffing" text="We place DevOps, cloud, and integration engineers on your team, for a single project or on an ongoing basis." />
    </section>
    <section className="tight"><Workshop detailed /></section>
    <section className="tight prose"><h2>Also covered</h2><div className="cap-list">
      <div className="cap"><b>Security</b>Access control and hardening across the systems we touch.</div>
      <div className="cap"><b>Performance optimization</b>Profiling first, then targeted fixes — not a rewrite.</div>
      <div className="cap"><b>Interface design</b>Front-end and UI work for the products these integrations sit behind.</div>
      <div className="cap"><b>Technology innovation</b>Evaluating new tools and frameworks before recommending them to a client.</div>
    </div></section>
  </>;
}
