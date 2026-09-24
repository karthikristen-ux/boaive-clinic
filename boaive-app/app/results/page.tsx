import BeforeAfter from '@/components/BeforeAfter';
import Reviews from '@/components/Reviews';
import CtaBand from '@/components/CtaBand';
import { clinicStats } from '@/config/site-config';

export const metadata = { title: 'Patient Results — Boaive Clinic' };

export default function ResultsPage() {
  return (
    <>
      <section className="page-intro">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Patient results</p>
            <h1 className="h1">Real outcomes, honestly shown.</h1>
            <p className="lead">A look at what our dental, hair and skin patients have achieved.</p>
          </div>
          <div className="stats" style={{ marginTop: 36 }}>
            {clinicStats.map(s => (
              <div key={s.label}>
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BeforeAfter showHeading={false} />
      <Reviews count={5} />
      <CtaBand />
    </>
  );
}
