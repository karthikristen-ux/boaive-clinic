'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function ServicesPage() {
  const { config } = useTheme();
  const enabledServices = config.services.filter(s => s.enabled);

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 36px)' }}>
      {/* Page header */}
      <section className="section-padding pb-0">
        <div className="container-main text-center flex flex-col items-center">
          <p className="text-eyebrow mb-4">OUR SERVICES</p>
          <h1 className="heading-hero max-w-3xl mx-auto">
            Three paths.<br />A healthier you.
          </h1>
          <p className="text-body-lg mt-6 max-w-xl mx-auto">
            Comprehensive dental, hair, and skin care — all under one roof, designed around your goals.
          </p>
        </div>
      </section>

      {/* Services */}
      {enabledServices.map((service, i) => (
        <ServiceSection key={service.id} service={service} index={i} />
      ))}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-main flex flex-col items-center justify-center text-center">
          <div className="card w-full max-w-3xl mx-auto p-10 sm:p-14 flex flex-col items-center justify-center text-center">
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[var(--color-accent)] mb-3">
              CONSULTATION
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-foreground)] mb-4 leading-tight">
              Ready to get started?
            </h2>
            <p className="font-body text-sm sm:text-base text-[var(--color-secondary)] mb-8 max-w-lg mx-auto leading-relaxed">
              Book an appointment today and take the first step toward personalized, specialist-led care.
            </p>
            <Link href="/appointment" className="btn-primary inline-flex">
              <span>Book Appointment</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceSection({ service, index }: { service: any; index: number }) {
  const { config } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id={service.slug} className={`section-padding ${index % 2 === 1 ? 'section-alt' : ''}`}>
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className={`lg:col-span-7 flex flex-col justify-between ${index % 2 === 1 ? 'lg:order-2' : ''}`}
          >
            <div>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[var(--color-accent)] mb-3">
                {service.name.toUpperCase()}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-4xl xl:text-5xl text-[var(--color-foreground)] leading-tight mb-6">
                {service.description}
              </h2>

              {/* Treatments Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
                {service.treatments.map((t: any) => (
                  <div
                    key={t.id}
                    className="card card-hover p-4 sm:p-4.5 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-body font-semibold text-sm text-[var(--color-foreground)] mb-1">
                        {t.name}
                      </h3>
                      <p className="text-xs text-[var(--color-secondary)] leading-relaxed">
                        {t.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
              <Link href={`/appointment?service=${service.slug}`} className="btn-primary inline-flex w-full sm:w-auto justify-center text-center">
                <span>Book {service.name}</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Boaive%20Clinic,%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(service.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex w-full sm:w-auto justify-center text-center"
              >
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 26px)' }}
            animate={isInView ? { opacity: 1, clipPath: 'inset(0 0 0% 0 round 26px)' } : {}}
            transition={{ delay: 0.2, duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className={`lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] max-h-[380px] xl:max-h-[420px] w-full max-w-md mx-auto shadow-[var(--shadow-lg)] mt-8 sm:mt-10 lg:mt-0 ${
              index % 2 === 1 ? 'lg:order-1' : ''
            }`}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
