import { brandImageUrl } from './BrandLogo';
const inputs = [[10, 'Legacy ERP'], [100, 'CRM'], [190, 'Payment gateway'], [280, 'Mobile app'], [370, 'Data warehouse']] as const;
const outputs = [[60, 'Unified API layer'], [206, 'Cloud infrastructure'], [352, 'Reporting & analytics']] as const;
export function IntegrationDiagram() {
  return <div className="diagram-wrap"><svg viewBox="0 0 960 460" role="img" aria-label="Diagram: five disparate systems (legacy ERP, CRM, payment gateway, mobile app, data warehouse) routed through an NM IT integration hub into a unified API layer, cloud infrastructure, and reporting layer.">
    {inputs.map(([y,label]) => <g key={label}><rect x="20" y={y} width="190" height="42" rx="4" fill="var(--panel)" stroke="var(--border)" /><text x="34" y={y+25} fontFamily="var(--font-mono)" fontSize="12.5" fill="var(--ink)">{label}</text></g>)}
    <circle cx="480" cy="230" r="60" fill="#EEF0E9" stroke="var(--accent-amber)" strokeWidth="2" />
    <image href={brandImageUrl} x="447" y="183" width="66" height="66" />
    <text x="480" y="267" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fontWeight="600" fill="#1B211E">NMIT</text>
    <text x="480" y="281" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#1B211E">integration hub</text>
    {outputs.map(([y,label]) => <g key={label}><rect x="750" y={y} width="190" height="48" rx="4" fill="var(--panel)" stroke="var(--border)" /><text x="764" y={y+28} fontFamily="var(--font-mono)" fontSize="12.5" fill="var(--ink)">{label}</text></g>)}
    {[31,121,211,301,391].map(y => <g key={y}><path d={`M210,${y} C320,${y} 350,230 420,230`} fill="none" stroke="var(--accent-teal)" strokeWidth="1.6" opacity="0.85" /><circle cx="210" cy={y} r="3.5" fill="var(--accent-teal)" /></g>)}
    {[84,230,376].map(y => <g key={y}><path d={`M540,230 C610,230 640,${y} 750,${y}`} fill="none" stroke="var(--accent-amber)" strokeWidth="1.6" opacity="0.9" /><circle cx="750" cy={y} r="3.5" fill="var(--accent-amber)" /></g>)}
  </svg></div>;
}
