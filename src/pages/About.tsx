import { Readout } from '../components/Content';
import { ClientLogos } from '../components/ClientLogos';
import { ContextGuide } from '../components/CharacterGuide';
const sectors = [ ['banking',['Bank Albilad','Indian Bank','Santander Consumer Bank']], ['markets',['NSE']], ['fintech',['Finmet Technologies']], ['insurance',['Bupa']] ] as const;
export function About() {
  return <>
    <section className="prose"><h1>About NM IT Solutions</h1><p className="lede" style={{ color:'var(--ink-muted)' }}>We’re a cloud and infrastructure team based in Bengaluru, working on digital transformation for banks, exchanges, and insurers. Four-plus years in, we’re a team of 40+ across DevOps, cloud engineering, integration, and interface design.</p></section>
    <section className="tight"><Readout /></section>
    <section className="tight prose"><h2>Where we work</h2><p>Worldwide delivery, with support and maintenance that continues after a project ships.</p></section>
    <section className="tight"><h2>Clients, by sector</h2><div className="client-groups">{sectors.map(([sector,clients]) => <div className="grp" key={sector}><div className="h">{sector}</div><ClientLogos names={clients} /></div>)}</div></section>
    <ContextGuide pose="man-welcome" title="Find the right starting point." text="Our work spans integration, cloud infrastructure, DevOps, and staffing. Start with the workflow or production responsibility your team needs to improve." href="/services" label="Explore our services" />
  </>;
}
