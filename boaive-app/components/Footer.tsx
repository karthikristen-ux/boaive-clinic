import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import ClinicLogo from '@/components/ClinicLogo';
import { defaultConfig as config } from '@/config/site-config';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/SocialIcons';

export default function Footer() {
  const { contact, social } = config;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <ClinicLogo light />
            <p>Dental, hair and skin care under one roof — with experienced doctors and honest advice.</p>
            <div className="footer-social">
              <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><InstagramIcon size={18} /></a>
              <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FacebookIcon size={18} /></a>
              <a href={social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer"><YoutubeIcon size={18} /></a>
            </div>
          </div>

          <div>
            <h4>Treatments</h4>
            <ul>
              {config.services.map(s => (
                <li key={s.id}><Link href={`/services#${s.slug}`}>{s.name}</Link></li>
              ))}
              <li><Link href="/results">Patient results</Link></li>
            </ul>
          </div>

          <div>
            <h4>Clinic</h4>
            <ul>
              <li><Link href="/about">About &amp; doctors</Link></li>
              <li><Link href="/appointment">Book appointment</Link></li>
              <li><Link href="/visit">Find us</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li style={{ display: 'flex', gap: 10 }}><MapPin size={17} style={{ flexShrink: 0, marginTop: 4 }} />{contact.address}</li>
              <li style={{ display: 'flex', gap: 10 }}><Phone size={17} style={{ flexShrink: 0, marginTop: 4 }} /><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
              <li style={{ display: 'flex', gap: 10 }}><Mail size={17} style={{ flexShrink: 0, marginTop: 4 }} /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Boaive Clinic. All rights reserved.</span>
          <span>{contact.workingHours.weekdays} · {contact.workingHours.saturday}</span>
        </div>
      </div>
    </footer>
  );
}
