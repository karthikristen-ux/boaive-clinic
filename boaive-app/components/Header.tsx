'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import ClinicLogo from '@/components/ClinicLogo';
import MobileMenu from './MobileMenu';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Visit', href: '/visit' },
];

export default function Header() {
  const { config } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          menuOpen
            ? 'bg-[var(--color-primary)] border-b border-white/10'
            : scrolled
            ? 'bg-[var(--color-background)]/95 backdrop-blur-md border-b border-[var(--color-border)]'
            : 'bg-gradient-to-b from-[var(--color-background)]/80 via-[var(--color-background)]/40 to-transparent'
        }`}
        style={{
          height: scrolled ? 'var(--header-height-scrolled)' : 'var(--header-height)',
        }}
      >
        <div className="container-main h-full grid grid-cols-2 lg:grid-cols-3 items-center">
          {/* Logo - Left */}
          <div className="flex items-center justify-start">
            <Link href="/" className="relative z-10" onClick={() => setMenuOpen(false)}>
              <ClinicLogo clinicName={config.clinicName} variant={menuOpen ? "light" : "dark"} size="sm" />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center gap-8" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-[10px] font-semibold tracking-[0.15em] uppercase text-[var(--color-primary)] transition-colors duration-300 hover:text-[var(--color-secondary)] group py-2"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Actions - Button + Menu */}
          <div className="flex items-center justify-end gap-6">
            <div className="hidden lg:block">
              <Link
                href="/appointment"
                className="btn-primary !py-2.5 !px-5 !text-[10px] !tracking-[0.1em] !font-medium !rounded-none"
              >
                <span>Book Appointment</span>
                <ArrowRight size={14} className="opacity-70" />
              </Link>
            </div>
            
            {/* Hamburger Menu */}
            <button
              className="relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5 hover:opacity-70 transition-opacity lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-6 h-[1.5px] transition-all duration-300 ${
                  menuOpen ? 'bg-white rotate-45 translate-y-[3.5px]' : 'bg-[var(--color-primary)]'
                }`}
              />
              <span
                className={`block w-6 h-[1.5px] transition-all duration-300 ${
                  menuOpen ? 'opacity-0 bg-white' : 'bg-[var(--color-primary)]'
                }`}
              />
              <span
                className={`block w-6 h-[1.5px] transition-all duration-300 ${
                  menuOpen ? 'bg-white -rotate-45 -translate-y-[3.5px]' : 'bg-[var(--color-primary)]'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
