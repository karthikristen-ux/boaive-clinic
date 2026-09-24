import Link from 'next/link';
import { Phone, CalendarCheck } from 'lucide-react';
import { defaultConfig as config } from '@/config/site-config';

export default function CtaBand() {
  return (
    <section className="section section--ink">
      <div className="container cta-band">
        <h2 className="h2">Ready to book your visit?</h2>
        <p>Pick a time that suits you. We will confirm by WhatsApp or phone.</p>
        <div className="btn-row">
          <Link href="/appointment" className="btn btn-primary"><CalendarCheck size={18} /> Book Appointment</Link>
          <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} className="btn btn-outline"><Phone size={18} /> {config.contact.phone}</a>
        </div>
      </div>
    </section>
  );
}
