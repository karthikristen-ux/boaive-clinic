'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import ClinicLogo from '@/components/ClinicLogo';

export default function Footer() {
  const { config } = useTheme();

  return (
    <footer className="bg-[var(--color-foreground)] text-[#e5e5e5] relative overflow-hidden pt-16 md:pt-20 pb-0">
      <div className="container-main">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 pb-12 md:pb-14 border-b border-white/10 md:items-center">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="flex flex-col gap-4 md:col-span-5 pr-8">
            <Link href="/" className="inline-block">
              <ClinicLogo clinicName={config.clinicName} variant="light" size="lg" />
            </Link>
            <p className="font-display text-base md:text-lg text-[#d4d4d4] mt-1 max-w-sm leading-relaxed">
              Modern dentistry, hair restoration, and clinical dermatology unified.
            </p>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#a3a3a3]">
              SPECIALIST CLINIC - CHENNAI
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col gap-4 md:col-span-2 md:justify-center">
            <ul className="space-y-2.5 text-sm font-medium text-[#d4d4d4]">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Doctors & Team</Link></li>
              <li><Link href="/results" className="hover:text-white transition-colors">Results</Link></li>
              <li><Link href="/visit" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-4 md:col-span-3 md:justify-center">
            <ul className="space-y-3 text-sm font-medium text-[#d4d4d4]">
              <li><a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{config.contact.phone}</a></li>
              <li><a href={`mailto:${config.contact.email}`} className="hover:text-white transition-colors">{config.contact.email}</a></li>
              <li><a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@boaiveclinic</a></li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div className="flex flex-col gap-4 md:col-span-2 md:justify-center">
            <div className="space-y-3 text-sm font-medium text-[#d4d4d4]">
              <div className="flex flex-col gap-0.5">
                <span className="text-[#a3a3a3] text-xs">Mon – Fri</span>
                <span>10:00 AM – 9:00 PM</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[#a3a3a3] text-xs">Saturday</span>
                <span>10:00 AM – 1:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Perfectly balanced vertical padding */}
        <div className="py-7 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-normal text-[#888]">
          <p>© {new Date().getFullYear()} {config.clinicName.toUpperCase()}. All rights reserved.</p>
          <p className="md:text-right">{config.contact.address}</p>
        </div>
      </div>
    </footer>
  );
}
