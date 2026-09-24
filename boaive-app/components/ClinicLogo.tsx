import Link from 'next/link';

export default function ClinicLogo({ onClick, light = false }: { onClick?: () => void; light?: boolean }) {
  return (
    <Link href="/" className={`brand ${light ? 'footer-brand' : ''}`} onClick={onClick} aria-label="Boaive Clinic — home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-icon.png" alt="" width={38} height={38} />
      <span className="brand-text">
        <span className="brand-name">BOAIVE</span>
        <span className="brand-sub">Clinic</span>
      </span>
    </Link>
  );
}
