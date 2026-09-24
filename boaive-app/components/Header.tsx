'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Phone } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import ClinicLogo from '@/components/ClinicLogo';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Treatments', href: '/services' },
  { label: 'Results', href: '/results' },
  { label: 'About', href: '/about' },
  { label: 'Visit Us', href: '/visit' },
];

export default function Header() {
  const { config } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const tel = `tel:${config.contact.phone.replace(/\s/g, '')}`;

  return (
    <>
      <header className="site-header">
        <div className="container">
          <ClinicLogo />

          <nav className="nav-desktop" aria-label="Main">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? 'active' : ''}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link href="/appointment" className="btn btn-primary btn-sm header-cta-desktop">
              Book Appointment
            </Link>
            <a href={tel} className="menu-toggle" aria-label="Call the clinic" style={{ color: 'var(--accent)' }}>
              <Phone size={22} />
            </a>
            <button className="menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div className="drawer-backdrop" onClick={() => setOpen(false)} />
          <aside className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="drawer-top">
              <ClinicLogo onClick={() => setOpen(false)} />
              <button className="menu-toggle" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={26} />
              </button>
            </div>
            <nav aria-label="Mobile">
              {navItems.map(item => (
                <Link key={item.href} href={item.href} className={isActive(item.href) ? 'active' : ''} onClick={() => setOpen(false)}>
                  {item.label}
                  <ChevronRight size={18} />
                </Link>
              ))}
            </nav>
            <div className="drawer-foot">
              <Link href="/appointment" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
                Book Appointment
              </Link>
              <a href={tel} className="btn btn-outline btn-block">
                <Phone size={18} /> {config.contact.phone}
              </a>
              <p className="drawer-hours">
                {config.contact.workingHours.weekdays}<br />
                {config.contact.workingHours.saturday}<br />
                {config.contact.workingHours.sunday}
              </p>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
