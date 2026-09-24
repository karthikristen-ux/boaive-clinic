'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Smile, Wind, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

const iconMap: Record<string, React.ReactNode> = {
  dental: <Smile size={18} />,
  hair: <Wind size={18} />,
  skin: <Sparkles size={18} />,
};

export default function TreatmentFinder() {
  const { config } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const enabledServices = config.services.filter(s => s.enabled);
  const [activeTab, setActiveTab] = useState<string>(enabledServices[0]?.id ?? '');

  const activeService = enabledServices.find(s => s.id === activeTab) ?? enabledServices[0];
  const resolvedTab = activeService?.id ?? '';

  if (!activeService) return null;

  return (
    <section ref={ref} className="section-padding bg-[var(--color-background)]">
      <div className="container-main">
        {/* Header & Tabs */}
        <div className="flex flex-col gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-left max-w-2xl"
          >
            <p className="text-eyebrow mb-3">TREATMENT FINDER</p>
            <h2 className="heading-section mb-4">What are you looking for?</h2>
            <p className="font-body text-sm md:text-base text-[var(--color-secondary)]">
              Browse treatments by specialty to find the right care for you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          >
            {enabledServices.map((service) => {
              const isActive = resolvedTab === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center gap-2 py-3 px-6 transition-all duration-300 border whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-[var(--color-background)] border-[var(--color-primary)]'
                      : 'bg-[var(--color-card)] text-[var(--color-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  {iconMap[service.id]}
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
                    {service.name}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={resolvedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {activeService.treatments.map((treatment, index) => (
              <Link
                href={`/appointment?service=${activeService.slug}&treatment=${encodeURIComponent(treatment.name)}`}
                key={treatment.id}
                className="block h-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className="group flex flex-col justify-between p-6 border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)] hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full rounded-none"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-sm font-bold tracking-wider text-[var(--color-secondary)]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-body font-semibold text-lg lg:text-xl text-[var(--color-primary)] leading-snug mb-3">
                      {treatment.name}
                    </h3>
                    <p className="font-body text-xs sm:text-[13px] text-[var(--color-secondary)] leading-relaxed mb-6">
                      {treatment.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-muted)]/40 group-hover:scale-[1.02] transition-transform duration-300 rounded-none">
                      <img
                        src={treatment.image}
                        alt={treatment.name}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
