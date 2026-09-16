export const brandImageUrl = `${import.meta.env.BASE_URL}brand/nmit-concept.png`;
export function BrandMark({ className = '' }: { className?: string }) {
  return <img className={`brand-symbol ${className}`} src={brandImageUrl} width="42" height="42" alt="" aria-hidden="true" />;
}
export function BrandLogo() {
  return <span className="brand-lockup"><BrandMark /><span className="brand-type"><span className="brand-name">NMIT</span><span className="brand-descriptor">solutions</span></span></span>;
}
