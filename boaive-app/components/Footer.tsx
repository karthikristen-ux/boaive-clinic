'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import ClinicLogo from '@/components/ClinicLogo';

export default function Footer() {
  const { config } = useTheme();

  return (
    <footer className="bg-[var(--color-foreground)] text-[#e5e5e5] relative overflow-hidden pt-10 md:pt-12 pb-4">
      <div className="container-main">
        {/* Main Columns Grid - Matches reference image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-6 md:pb-8 border-b border-white/10 items-start">
          
          {/* Column 1: Brand & Philosophy */}
          <div className="flex flex-col justify-between md:col-span-5 pr-6">
            <div>
              <Link href="/" className="inline-block">
                <ClinicLogo clinicName={config.clinicName} variant="light" size="lg" />
              </Link>
              <p className="font-display text-sm md:text-base text-[#d4d4d4] mt-3 max-w-sm leading-relaxed">
                Modern dentistry, hair restoration, and clinical dermatology unified.
              </p>
            </div>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-[#a3a3a3] mt-5 md:mt-7">
              SPECIALIST CLINIC - CHENNAI
            </p>
          </div>

          {/* Right Columns Container: Top-aligned exactly with the 'Modern dentistry...' text */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 md:pt-9">
            {/* Column 2: Navigation Links */}
            <div>
              <ul className="space-y-2 text-xs md:text-sm font-medium text-[#d4d4d4]">
                <li><Link href="/" className="hover:text-white transition-colors block">Home</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors block">Our Services</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors block">Doctors & Team</Link></li>
                <li><Link href="/results" className="hover:text-white transition-colors block">Results</Link></li>
                <li><Link href="/visit" className="hover:text-white transition-colors block">Contact</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <ul className="space-y-2 text-xs md:text-sm font-medium text-[#d4d4d4]">
                <li>
                  <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors block">
                    {config.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${config.contact.email}`} className="hover:text-white transition-colors block">
                    {config.contact.email}
                  </a>
                </li>
                <li>
                  <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">
                    @boaiveclinic
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Hours */}
            <div>
              <div className="space-y-2.5 text-xs md:text-sm font-medium text-[#d4d4d4]">
                <div>
                  <span className="text-[#a3a3a3] text-[10px] uppercase tracking-wider block">MON – FRI</span>
                  <span className="text-[#f5f5f5]">10:00 AM – 9:00 PM</span>
                </div>
                <div>
                  <span className="text-[#a3a3a3] text-[10px] uppercase tracking-wider block">SATURDAY</span>
                  <span className="text-[#f5f5f5]">10:00 AM – 1:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Slim and clean */}
        <div className="py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] font-normal text-[#888]">
          <p>© {new Date().getFullYear()} {config.clinicName.toUpperCase()}. All rights reserved.</p>
          <p className="md:text-right">{config.contact.address}</p>
        </div>
      </div>
    </footer>
  );
}
