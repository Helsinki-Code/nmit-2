const clients = [
  { name:'Bank Albilad', file:'albidad.png', width:401, height:126 },
  { name:'Indian Bank', file:'indianbank.png', width:271, height:72 },
  { name:'Santander Consumer Bank', file:'santanderbank.png', width:357, height:141 },
  { name:'NSE', file:'nse.png', width:333, height:151 },
  { name:'Finmet Technologies', file:'finmet.webp', width:1024, height:737 },
  { name:'Bupa', file:'bupa.png', width:318, height:159 },
];
export function ClientLogos({ names }: { names?: readonly string[] }) {
  return <ul className="client-logos" aria-label="Client organizations">{clients.filter(c => !names || names.includes(c.name)).map(c => <li key={c.file}><div className={`client-logo-plate ${c.file==='finmet.webp'?'client-logo-finmet':''}`}><img src={`/images/client-logos/${c.file}`} alt={`${c.name} logo`} width={c.width} height={c.height} loading="lazy" decoding="async" /></div><span>{c.name}</span></li>)}</ul>;
}
