import { useState } from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
const topics = [
  { name:'All guides', keys:[] },
  { name:'Architecture', keys:['legacy-integration','integration-patterns','erp-crm','modernization'] },
  { name:'Payments', keys:['payment-integration','payment-testing'] },
  { name:'Operations', keys:['monitoring','handover'] },
  { name:'Planning', keys:['hybrid-migration','integration-cost'] },
];
export function ReadingDesk() {
  const [selected,setSelected] = useState(0);
  const topic=topics[selected];
  const guides=posts.filter(p=>p.contentKey && (!topic.keys.length || topic.keys.includes(p.contentKey)));
  const [lead,...rest]=guides;
  return <section id="engineering-guides" className="reading-desk"><div className="reading-title"><div><span className="eyebrow-mono">The engineering reading desk</span><h2>Decisions before diagrams.</h2><p>Practical guides for choosing a boundary, proving a workflow, and running what you release.</p></div><Link to="/blog">Browse the full library →</Link></div><div className="reading-topics" role="group" aria-label="Filter engineering guides">{topics.map((t,i)=><button key={t.name} type="button" aria-pressed={selected===i} aria-controls="reading-results" onClick={()=>setSelected(i)}>{t.name}</button>)}</div><div className="reading-results" id="reading-results"><article className="reading-feature" key={lead.slug}><Link to={`/blog/${lead.slug}`} className="reading-image"><img src={lead.featuredImage} alt={lead.featuredImageAlt} width={768} height={512} loading="lazy" decoding="async" /></Link><div className="eyebrow-mono">Start here · {lead.articleSection}</div><h3><Link to={`/blog/${lead.slug}`}>{lead.title}</Link></h3><p>{lead.excerpt}</p><Link to={`/blog/${lead.slug}`}>Read the guide →</Link></article><div className="reading-index"><div className="reading-index-label"><span>{topic.name}</span><span>{guides.length} guides</span></div><ol>{rest.map((p,i)=><li key={p.slug}><span className="reading-number">{String(i+2).padStart(2,'0')}</span><div><span className="eyebrow-mono">{p.articleSection}</span><h3><Link to={`/blog/${p.slug}`}>{p.title}</Link></h3></div><span aria-hidden="true">↗</span></li>)}</ol></div></div></section>;
}
