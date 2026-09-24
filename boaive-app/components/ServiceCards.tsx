'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ServiceCards() {
  const { config } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const enabledServices = config.services.filter(s => s.enabled);

  return (
    <section ref={ref} className="section-padding">
      <div className="container-main">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-12 lg:mb-16"
        >
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-4">OUR SERVICES</p>
          <h2 className="heading-section">
            Three paths.<br />A healthier you.
          </h2>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {enabledServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.7 }}
            >
              <Link href={`/services#${service.slug}`} className="group block">
                <div className="relative aspect-[4/5] media-frame mb-6 shadow-[var(--shadow-sm)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-lg)]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                    <h3 className="font-display text-xl lg:text-2xl font-semibold text-white">
                      {service.name}
                    </h3>
                    <span className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center text-[var(--color-primary)] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-[var(--color-accent)] group-hover:text-white">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[var(--color-secondary)] max-w-[300px] leading-relaxed">
                  {service.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
