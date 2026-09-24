import { Suspense } from 'react';
import { ShieldCheck, Clock, MessageCircle, Phone } from 'lucide-react';
import AppointmentWizard from '@/components/AppointmentWizard';
import { defaultConfig as config } from '@/config/site-config';

export const metadata = { title: 'Book an Appointment — Boaive Clinic' };

export default function AppointmentPage() {
  return (
    <section className="page-intro" style={{ paddingBottom: 'var(--section-y)' }}>
      <div className="container">
        <div className="apt-layout">
          <div>
            <p className="eyebrow">Book online</p>
            <h1 className="h1" style={{ marginBottom: 12 }}>Book an appointment.</h1>
            <p className="lead">Choose a department, pick a time and we will confirm your visit.</p>

            <ul className="bullets hide-mobile" style={{ marginTop: 20 }}>
              <li><ShieldCheck size={20} /><div><strong>Experienced doctors</strong><span>Specialists in dental, dermatology and trichology.</span></div></li>
              <li><Clock size={20} /><div><strong>Minimal waiting</strong><span>Your slot is reserved, so you are seen on time.</span></div></li>
              <li><MessageCircle size={20} /><div><strong>Confirmation on WhatsApp</strong><span>Directions and reminders sent to your phone.</span></div></li>
            </ul>

            <p className="small muted" style={{ marginTop: 16 }}>
              Prefer to talk? <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} className="link-arrow"><Phone size={14} /> {config.contact.phone}</a>
            </p>
          </div>

          <div className="apt-panel">
            <Suspense>
              <AppointmentWizard />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
