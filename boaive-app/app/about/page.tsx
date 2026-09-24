'use client';

import DoctorSection from '@/components/DoctorSection';

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      {/* Hero */}
      <section className="pt-8 sm:pt-12 md:pt-16 pb-12 md:pb-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-eyebrow mb-4">ABOUT US</p>
              <h1 className="heading-hero mb-6">
                Small changes.<br />A brighter you.
              </h1>
              <p className="text-body-lg max-w-md">
                We believe great healthcare is personal. That&apos;s why we bring together dental, hair, and skin specialists under one roof — so your care is connected, consistent, and built entirely around you.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&q=80&w=800"
                alt="Boaive Clinic interior"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[var(--color-primary)] text-[var(--color-background)]">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Patient First', desc: 'Every decision starts with what\'s best for you.' },
              { title: 'Modern Methods', desc: 'We use the latest equipment and evidence-based techniques.' },
              { title: 'Honest Care', desc: 'Transparent guidance without unnecessary procedures.' },
            ].map((v, i) => (
              <div key={i}>
                <span className="text-[var(--color-accent)] font-display text-4xl font-light">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl font-light mt-3 mb-3">{v.title}</h3>
                <p className="text-sm opacity-60">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <DoctorSection />
    </div>
  );
}
