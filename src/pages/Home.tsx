import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroHeadline } from '../components/HeroHeadline';
import { IntegrationDiagram } from '../components/IntegrationDiagram';
import { Readout, ServiceRow, Workshop } from '../components/Content';
import { ClientLogos } from '../components/ClientLogos';
import { WorkflowExplorer } from '../components/WorkflowExplorer';
import { ReadingDesk } from '../components/ReadingDesk';
import { ContextGuide } from '../components/CharacterGuide';
import '../home.css';
const IntegrationModel = lazy(() => import('../components/IntegrationModel'));
export function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [paused,setPaused] = useState(false);
  const [reduced,setReduced] = useState(false);
  const [visible,setVisible] = useState(true);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change',update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(heroRef.current!);
    return () => { media.removeEventListener('change',update); observer.disconnect(); };
  }, []);
  const playing = !paused && !reduced && visible;
  return <>
    <section className="hero hero-modern" ref={heroRef} data-playing={playing}><div className="hero-copy">
      <HeroHeadline playing={playing} />
      <p className="lede">NM IT Solutions is a Bengaluru-based team of 40+ engineers working on cloud infrastructure, DevOps, and API integration for banks, exchanges, and insurers.</p>
      <div className="cta-row"><Link className="btn btn-primary" to="/contact/workshop">Book the free integration workshop</Link><Link className="btn btn-outline" to="/services">See how the four services fit together</Link></div>
    </div><div className="hero-visual"><Suspense fallback={<div className="model-placeholder"><IntegrationDiagram /></div>}><IntegrationModel playing={playing} reduced={reduced} onToggle={()=>setPaused(value=>!value)} /></Suspense></div></section>
    <div className="wrap"><div className="rule" /></div>
    <section className="tight prose"><h2>What we do</h2>
      <ServiceRow name="DevOps" text="Release pipelines, monitoring, and incident response for teams running production systems." />
      <ServiceRow name="Cloud services" text="Migration, scaling, and ongoing management of cloud infrastructure." />
      <ServiceRow name="API integration" text="Connecting CRMs, ERPs, payment systems, and internal tools through a shared API layer." core />
      <ServiceRow name="Staffing" text="Engineers placed on your team for the length of a project or on an ongoing basis." />
      <p style={{ marginTop:20 }}><Link to="/services">Read the full breakdown →</Link></p>
    </section>
    <WorkflowExplorer />
    <section id="delivery-path" className="delivery-path"><div className="section-intro"><span className="eyebrow-mono">From first boundary to production</span><h2>A delivery plan you can inspect.</h2><p>Define what must work, how it will fail, and who will run it. Agree the outputs and acceptance criteria for your engagement before implementation begins.</p></div><ol>{[
      ['01','Map the existing workflow','List systems, owners, dependencies, and the result the business needs. Identify what stays in place and where a new boundary can be introduced.','hybrid-cloud-migration-checklist','Map dependencies'],
      ['02','Agree contracts and ownership','Document identifiers, field authority, API or event contracts, and update frequency. Include partner limits and the meaning of an unknown outcome.','erp-crm-integration','Define data ownership'],
      ['03','Prove failure and recovery','Test invalid records, unavailable partners, duplicates, and lost responses. Use observable pass criteria and controlled release checkpoints.','payment-api-testing-checklist','Build a failure checklist'],
      ['04','Hand over the operating model','Make monitoring, access, escalation, runbooks, and unresolved exceptions usable by the receiving team. Agree coverage and demonstrate safe investigation.','integration-handover-checklist','Prepare the handover'],
    ].map(([number,title,text,slug,label])=><li key={number}><span className="delivery-number">{number}</span><h3>{title}</h3><div><p>{text}</p><Link to={`/blog/${slug}`}>{label}</Link></div></li>)}</ol></section>
    <section id="integration-questions" className="home-faq"><div className="section-intro"><span className="eyebrow-mono">Before we start</span><h2>Questions worth settling early.</h2><p>These choices shape the scope, the migration plan, and the responsibilities after release.</p></div><dl>
      <div><dt>Do we need to replace our ERP or CRM?</dt><dd>Many integrations can retain useful systems and add adapters or contracts around a defined workflow. Replacement depends on access, vendor constraints, and the capability you need. <Link to="/blog/legacy-system-integration">Read the legacy integration guide.</Link></dd></div>
      <div><dt>Should everything synchronize in real time?</dt><dd>Choose frequency by business need. A user-facing decision may need an immediate response; reporting may tolerate a scheduled transfer. <Link to="/blog/api-vs-event-driven-vs-batch-integration">Compare API, event-driven, and batch patterns.</Link></dd></div>
      <div><dt>What should we bring to the workshop?</dt><dd>Bring one workflow, a current system map, known failure examples, available interface documentation, and the people who own the systems. Avoid sending production credentials or customer records. <Link to="/contact/workshop">Enquire about the workshop.</Link></dd></div>
      <div><dt>How is an integration quote scoped?</dt><dd>Operations, mapping, partner constraints, testing, environments, recovery, and handover all affect effort. A documented boundary makes proposals easier to compare. <Link to="/blog/api-integration-project-cost">Prepare a quote-ready brief.</Link></dd></div>
      <div><dt>How do we know the workflow completed?</dt><dd>Agree durable completion evidence, an expected deadline, and an owned exception path. A successful API response can still leave downstream work pending. <Link to="/blog/api-integration-monitoring">Connect monitoring to outcomes.</Link></dd></div>
      <div><dt>Who owns support after delivery?</dt><dd>Agree receiving-team responsibilities, access, escalation, and coverage in the engagement. A handover should include a demonstrated recovery drill. <Link to="/blog/integration-handover-checklist">Review the handover checklist.</Link></dd></div>
    </dl></section>
    <section className="tight"><Workshop /></section>
    <section className="tight"><h2>By the numbers</h2><Readout /></section>
    <section id="clients" className="tight"><span className="eyebrow-mono">Across financial services and insurance</span><h2>Organizations we’ve worked with</h2><ClientLogos /></section>
    <ReadingDesk />
    <ContextGuide pose="woman-plan" title="Bring one workflow. Define the next step." text="Tell us which systems are involved, the result you need, and where the current process gets stuck. We can discuss API integration, cloud services, DevOps, or engineers joining your team." href="/contact" label="Discuss your project" />
  </>;
}
