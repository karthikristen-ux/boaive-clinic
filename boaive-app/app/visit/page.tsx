import { MapPin, Landmark, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { defaultConfig as config } from '@/config/site-config';

export const metadata = { title: 'Visit Us — Boaive Clinic' };

export default function VisitPage() {
  const { contact } = config;
  const tel = `tel:${contact.phone.replace(/\s/g, '')}`;

  return (
    <section className="page-intro" style={{ paddingBottom: 'var(--section-y)' }}>
      <div className="container">
        <div className="split" style={{ gap: 32 }}>
          <div>
            <p className="eyebrow">Visit us</p>
            <h1 className="h1" style={{ marginBottom: 12 }}>Find the clinic.</h1>
            <p className="lead">Easy to reach, with parking nearby.</p>

            <ul className="info-list" style={{ marginTop: 20 }}>
              <li><MapPin size={22} /><div><h3>Address</h3><p>{contact.address}</p></div></li>
              <li><Landmark size={22} /><div><h3>Landmark</h3><p>{contact.landmark}</p></div></li>
              <li><Phone size={22} /><div><h3>Phone</h3><a href={tel}>{contact.phone}</a></div></li>
              <li><Mail size={22} /><div><h3>Email</h3><a href={`mailto:${contact.email}`}>{contact.email}</a></div></li>
              <li>
                <Clock size={22} />
                <div>
                  <h3>Working hours</h3>
                  <p>{contact.workingHours.weekdays}<br />{contact.workingHours.saturday}<br />{contact.workingHours.sunday}</p>
                </div>
              </li>
            </ul>

            <div className="btn-row" style={{ marginTop: 24 }}>
              <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Get directions <ArrowRight size={18} />
              </a>
              <a href={tel} className="btn btn-outline"><Phone size={18} /> Call us</a>
            </div>
          </div>

          <div className="map-frame">
            <iframe
              src={contact.mapEmbed}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Boaive Clinic location map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
