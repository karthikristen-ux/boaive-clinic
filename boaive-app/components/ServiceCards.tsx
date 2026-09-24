'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Smile, Wind, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const iconMap: Record<string, React.ReactNode> = {
  smile: <Smile size={28} />,
  wind: <Wind size={28} />,
  sparkles: <Sparkles size={28} />,
};

export default function ServiceCards() {
  const { config } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const enabledServices = config.services.filter(s => s.enabled);

  return (
    <section ref={ref} className="section-padding">
      <div className="container-main">
        {/* Section header */}
        <div className="flex flex-row justify-between items-end mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-4">OUR SERVICES</p>
            <h2 className="heading-section">
              Three paths.<br />A healthier you.
            </h2>
          </motion.div>

          {/* Navigation Arrows (Decorative for now, could be wired to a slider later) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden md:flex gap-4"
          >
            <button className="w-10 h-10 rounded-none border border-[var(--color-border)] flex items-center justify-center text-[var(--color-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button className="w-10 h-10 rounded-none border border-[var(--color-border)] flex items-center justify-center text-[var(--color-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {enabledServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.7 }}
            >
              <Link href={`/services#${service.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden mb-6">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                
                <h3 className="font-display text-2xl lg:text-[1.75rem] font-medium mb-3 text-[var(--color-primary)]">
                  {service.name}
                </h3>
                <p className="text-sm text-[var(--color-secondary)] max-w-[280px] mb-4">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                  Explore
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
