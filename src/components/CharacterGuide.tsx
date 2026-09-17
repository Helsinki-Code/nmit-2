import { Link } from 'react-router-dom';

export type CharacterPose = 'woman-explain' | 'woman-plan' | 'woman-review' | 'man-investigate' | 'man-welcome' | 'man-runbook';
export function Character({ pose, className = '' }: { pose: CharacterPose; className?: string }) {
  return <img key={pose} className={`brand-character ${className}`} src={`/images/characters/${pose}.webp`} alt="" width={360} height={540} loading="lazy" decoding="async" />;
}
export function ContextGuide({ pose, title, text, href, label }: { pose: CharacterPose; title: string; text: string; href: string; label: string }) {
  return <aside className="context-guide"><Character pose={pose} /><div><span className="eyebrow-mono">A useful next step</span><h2>{title}</h2><p>{text}</p><Link to={href}>{label}</Link></div></aside>;
}
