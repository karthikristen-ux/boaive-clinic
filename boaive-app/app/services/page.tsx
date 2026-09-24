import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { defaultConfig as config } from '@/config/site-config';
import CtaBand from '@/components/CtaBand';

export const metadata = { title: 'Treatments — Boaive Clinic' };

export default function ServicesPage() {
  const services = config.services.filter(s => s.enabled);

  return (
    <>
      <section className="page-intro">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Our treatments</p>
            <h1 className="h1">Dental, hair and skin care.</h1>
            <p className="lead">Everything you need, in one clinic. Jump to a department below.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
              {services.map(s => (
                <a key={s.id} href={`#${s.slug}`} className="btn btn-outline btn-sm">{s.name}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {services.map((service, i) => (
        <section key={service.id} id={service.slug} className={`section ${i % 2 === 0 ? '' : 'section--tint'}`} style={{ scrollMarginTop: 'var(--header-h)' }}>
          <div className="container">
            <div className="treat-layout">
              <div>
                <p className="eyebrow">{service.name}</p>
                <h2 className="h2">{service.description}</h2>
                <ul className="treat-list" style={{ marginTop: 16 }}>
                  {service.treatments.map(t => (
                    <li key={t.id}>
                      <Check size={18} />
                      <div>
                        <h3>{t.name}</h3>
                        <p>{t.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="btn-row" style={{ marginTop: 20 }}>
                  <Link href={`/appointment?service=${service.slug}`} className="btn btn-primary">
                    Book {service.name} <ArrowRight size={18} />
                  </Link>
                  <a
                    href={`https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(`Hi Boaive Clinic, I would like to enquire about ${service.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    WhatsApp enquiry
                  </a>
                </div>
              </div>
              <div className="treat-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.image} alt={service.name} loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
