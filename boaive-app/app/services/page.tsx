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
      <section className="section-padding bg-[var(--color-primary)] text-[var(--color-background)]">
        <div className="container-main text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-light mb-6">
            Ready to get started?
          </h2>
          <p className="text-sm opacity-70 mb-10 max-w-md mx-auto">
            Book an appointment today and take the first step toward better care.
          </p>
          <Link href="/appointment" className="btn-primary !bg-[var(--color-accent)] !border-[var(--color-accent)] inline-flex">
            <span>Book Appointment</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServiceSection({ service, index }: { service: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id={service.slug} className="section-padding">
      <div className="container-main">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className={index % 2 === 1 ? 'lg:order-2' : ''}
          >
            <p className="text-eyebrow mb-4">{service.name.toUpperCase()}</p>
            <h2 className="heading-section mb-6">{service.description}</h2>
            <div className="space-y-4 mb-8">
              {service.treatments.map((t: any) => (
                <div key={t.id} className="flex items-start gap-3 py-3 border-b border-[var(--color-border)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-[var(--color-secondary)] mt-0.5">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/appointment" className="btn-primary inline-flex">
              <span>Book {service.name}</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={isInView ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' } : {}}
            transition={{ delay: 0.2, duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className={`relative aspect-[3/4] overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}
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
