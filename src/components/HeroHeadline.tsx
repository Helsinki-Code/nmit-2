import { useEffect, useState } from 'react';
const messages = [
  { lead:'We connect your', accent:'business systems.', rest:'From ERP and CRM to payments and cloud.', label:'Connected systems' },
  { lead:'We build your', accent:'integration layer.', rest:'One architecture for systems built apart.', label:'Integration layer' },
  { lead:'We connect your', accent:'APIs and cloud.', rest:'From existing infrastructure to connected services.', label:'APIs and cloud' }
];
function AnimatedWords({ text, offset=0 }: { text:string; offset?:number }) {
  const words = text.split(' ');
  return <>{words.map((word,i) => <span className="headline-word-mask" key={`${i}-${word}`}><span className="headline-word" style={{animationDelay:`${(offset+i)*55}ms`}}>{word}{i < words.length - 1 ? '\u00a0' : ''}</span></span>)}</>;
}
export function HeroHeadline({ playing }: { playing:boolean }) {
  const [index,setIndex] = useState(0);
  useEffect(() => {
    if(!playing) return;
    const timer=window.setInterval(() => {if(!document.hidden) setIndex(value=>(value+1)%messages.length);},6800);
    return ()=>window.clearInterval(timer);
  },[playing,index]);
  const message=messages[index];
  return <div className="hero-message" data-playing={playing}>
    <h1 className="hero-title">
      <span className="sr-only">We connect ERP, CRM, payment systems, APIs, and cloud infrastructure. We build the integration layer that brings them together.</span>
      <span className="headline-frame" key={index} aria-hidden="true">
        <span className="headline-lead"><AnimatedWords text={message.lead} /></span>{' '}
        <span className="headline-accent"><AnimatedWords text={message.accent} offset={3} /></span>{' '}
        <span className="hero-title-rest"><AnimatedWords text={message.rest} offset={6} /></span>
      </span>
    </h1>
    <div className="hero-message-controls" aria-label="Hero messages">{messages.map((item,i)=><button type="button" key={item.label} aria-label={`Show ${item.label.toLowerCase()} message`} aria-pressed={i===index} onClick={()=>setIndex(i)}><span>{String(i+1).padStart(2,'0')}</span><span className="message-progress" key={`${i}-${index}`} /></button>)}<span>{message.label}</span></div>
  </div>;
}
