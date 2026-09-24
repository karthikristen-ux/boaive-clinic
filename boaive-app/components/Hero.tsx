import Link from 'next/link';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import { defaultConfig as config } from '@/config/site-config';

export default function Hero() {
  const { hero, contact } = config;
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="h1">{hero.headline.join(' ')}</h1>
            <p className="lead" style={{ marginBottom: 24 }}>{hero.description}</p>
            <div className="btn-row">
              <Link href="/appointment" className="btn btn-primary">
                {hero.primaryCta} <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="btn btn-outline">{hero.secondaryCta}</Link>
            </div>
          </div>
          <div className="hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.image} alt="Doctor consulting a patient at Boaive Clinic" />
          </div>
        </div>

        <div className="hero-facts">
          <div className="hero-fact">
            <MapPin size={22} />
            <div><strong>Mahalingapuram, Chennai</strong><span>{contact.landmark}</span></div>
          </div>
          <div className="hero-fact">
            <Clock size={22} />
            <div><strong>Mon – Sat</strong><span>10 AM – 1 PM · 5 – 9 PM</span></div>
          </div>
          <div className="hero-fact">
            <Phone size={22} />
            <div><strong>{contact.phone}</strong><span>Call or WhatsApp us</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
