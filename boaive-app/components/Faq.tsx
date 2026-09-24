import { ChevronDown } from 'lucide-react';
import { faqs } from '@/config/site-config';

export default function Faq() {
  return (
    <section className="section">
      <div className="container">
        <div className="split">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Good to know</p>
            <h2 className="h2">Common questions.</h2>
            <p className="lead">Can&apos;t find your answer? Call or WhatsApp us — we&apos;re happy to help.</p>
          </div>
          <div className="faq">
            {faqs.map(f => (
              <details key={f.q}>
                <summary>{f.q}<ChevronDown size={20} /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
