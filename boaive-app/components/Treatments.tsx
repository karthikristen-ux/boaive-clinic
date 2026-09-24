'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Smile, Wind, Sparkles } from 'lucide-react';
import { defaultConfig as config } from '@/config/site-config';

const icons: Record<string, React.ReactNode> = {
  dental: <Smile size={18} />,
  hair: <Wind size={18} />,
  skin: <Sparkles size={18} />,
};

export default function Treatments({ showHeading = true }: { showHeading?: boolean }) {
  const services = config.services.filter(s => s.enabled);
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find(s => s.id === activeId) ?? services[0];

  return (
    <section className="section" id="treatments">
      <div className="container">
        {showHeading && (
          <div className="section-head">
            <p className="eyebrow">Our treatments</p>
            <h2 className="h2">Three departments, one clinic.</h2>
            <p className="lead">Choose an area to see what we treat. Not sure where to start? Book a consultation and the doctor will guide you.</p>
          </div>
        )}

        <div className="tabs" role="tablist" aria-label="Treatment categories">
          {services.map(s => (
            <button
              key={s.id}
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={s.id === activeId}
              aria-controls="treatment-panel"
              className="tab"
              onClick={() => setActiveId(s.id)}
            >
              {icons[s.id]}
              {s.name.replace(' Care', '')}
            </button>
          ))}
        </div>

        <div className="treat-layout" role="tabpanel" id="treatment-panel" aria-labelledby={`tab-${active.id}`}>
          <div>
            <p className="lead" style={{ padding: '16px 0 4px' }}>{active.description}</p>
            <ul className="treat-list">
              {active.treatments.map(t => (
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
              <Link href={`/appointment?service=${active.slug}`} className="btn btn-primary">
                Book {active.name} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="treat-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.image} alt={active.name} loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
