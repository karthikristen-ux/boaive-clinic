import { clinicStats, whyUs } from '@/config/site-config';

export default function WhyUs() {
  return (
    <section className="section section--tint">
      <div className="container">
        <div className="split">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Why patients choose us</p>
            <h2 className="h2">Care you can trust, close to home.</h2>
            <p className="lead">We are a neighbourhood clinic. That means familiar faces, unhurried consultations and follow-ups that actually happen.</p>
          </div>
          <div className="why-grid">
            {whyUs.map((item, i) => (
              <div className="why-item" key={item.title}>
                <span className="why-num">0{i + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats" style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
          {clinicStats.map(s => (
            <div key={s.label}>
              <p className="stat-value">{s.value}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
