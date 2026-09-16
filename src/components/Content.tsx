import { Link } from 'react-router-dom';
import type { Post } from '../data/posts';
export const clients = ['Bank Albilad','Indian Bank','Santander Consumer Bank','NSE','Finmet Technologies','Bupa'];
export function ServiceRow({ name, text, core = false }: { name: string; text: string; core?: boolean }) {
  return <div className="service-row"><div><div className="name">{name}</div>{core && <span className="tag">core focus</span>}</div><p>{text}</p></div>;
}
export function Readout() {
  return <div className="readout">{[['4+','years in operation'],['40+','engineers on the team'],['200+','interface themes shipped']].map(([num,label]) => <div className="cell" key={num}><div className="num">{num}</div><div className="lbl">{label}</div></div>)}</div>;
}
export function ClientNames() { return <>{clients.map(client => <span key={client}>{client}</span>)}</>; }
export function PostItem({ post }: { post: Post }) {
  return <div className="item"><div className="date">{post.date}</div><h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3><p style={{ color:'var(--ink-muted)',maxWidth:'60ch' }}>{post.excerpt}</p></div>;
}
export function Workshop({ detailed = false }: { detailed?: boolean }) {
  return <div className="workshop"><span className="eyebrow-mono">no cost · one day · on-site</span>
    <h2>{detailed ? 'The workshop, in detail' : 'Start with a one-day workshop, not a proposal.'}</h2>
    <p style={{ maxWidth:'60ch',color:'var(--ink-muted)' }}>{detailed ? 'A free, one-day, on-site integration-modernization workshop, built around your actual architecture rather than a generic template.' : 'We spend a day on-site walking through your current architecture and mapping it against what you’re trying to do. You leave with a written plan, not a sales deck.'}</p>
    {detailed && <div className="workshop-steps">{[
      ['morning','We review your current architecture with whoever owns it — engineering leads, not just procurement.'],
      ['afternoon','We map that against where you’re trying to get to, and flag the two or three integration points most likely to cause problems.'],
      ['output','A written architecture recommendation you keep, whether or not you work with us afterward.'],
      ['cost','Nothing. No contract to sit through to get the session booked.']
    ].map(([label,text]) => <div className="step" key={label}><span className="k">{label}</span>{text}</div>)}</div>}
    <Link className="btn btn-primary" to="/contact/workshop" style={{ marginTop:detailed?24:10 }}>Book the workshop</Link>
  </div>;
}
