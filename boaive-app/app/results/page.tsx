import BeforeAfter from '@/components/BeforeAfter';

const stats = [
  { value: '3,000+', label: 'Patients Treated' },
  { value: '15+', label: 'Years Combined Experience' },
  { value: '98%', label: 'Patient Satisfaction' },
  { value: '3', label: 'Specialties Under One Roof' },
];

export default function ResultsPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 36px)' }}>
      <section className="section-padding pb-0">
        <div className="container-main">
          <p className="text-eyebrow mb-4">RESULTS</p>
          <h1 className="heading-hero max-w-3xl">
            Real outcomes, honestly shown.
          </h1>
          <p className="text-body-lg mt-6 max-w-xl">
            A look at the outcomes our dental, hair and skin patients have achieved — drag the slider to compare before and after.
          </p>
        </div>
      </section>

      <BeforeAfter />

      <section className="pb-16 md:pb-24">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-10 border-t border-[var(--color-border)]">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="font-display text-3xl sm:text-4xl font-semibold text-[var(--color-primary)]">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-[var(--color-secondary)] mt-1.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
