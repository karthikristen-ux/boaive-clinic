'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import type { Treatment } from '@/config/site-config';

export default function TreatmentCarousel() {
  const { config } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [activeCategory, setActiveCategory] = useState('all');

  const enabledServices = config.services.filter(s => s.enabled);
  const categories = [{ id: 'all', name: 'All' }, ...enabledServices.map(s => ({ id: s.id, name: s.name.replace(' Care', '') }))];

  const allTreatments: Treatment[] = enabledServices.flatMap(s => s.treatments);
  const filteredTreatments = activeCategory === 'all'
    ? allTreatments
    : allTreatments.filter(t => t.category === activeCategory);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = 400;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section ref={ref} className="section-padding overflow-hidden bg-[var(--color-muted)]">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-4">POPULAR TREATMENTS</p>
            <h2 className="heading-section">
              Science-backed. Patient-focused.
            </h2>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* Category tabs */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 flex-wrap"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-bold tracking-[0.1em] uppercase transition-all duration-300 rounded-none border ${
                    activeCategory === cat.id
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
                      : 'bg-white text-[var(--color-secondary)] border-transparent hover:border-[var(--color-border)] shadow-sm'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </motion.div>

            {/* Navigation arrows (desktop) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden md:flex gap-3"
            >
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-none border border-[var(--color-border)] flex items-center justify-center text-[var(--color-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors bg-white"
                aria-label="Previous treatments"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-none border border-[var(--color-border)] flex items-center justify-center text-[var(--color-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors bg-white"
                aria-label="Next treatments"
              >
                <ChevronRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative"
        >
          <div ref={trackRef} className="carousel-track pb-8">
            {filteredTreatments.map((treatment, i) => (
              <div key={treatment.id} className="carousel-card w-[280px] sm:w-[320px] lg:w-[360px]">
                <div className="group cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden mb-5">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>
                  <h3 className="font-body font-semibold text-sm lg:text-base mb-1 text-[var(--color-primary)]">
                    {treatment.name}
                  </h3>
                  <p className="text-xs text-[var(--color-secondary)] mb-4 line-clamp-2 max-w-[90%]">
                    {treatment.description}
                  </p>
                  <div className="w-8 h-8 rounded-none border border-[var(--color-border)] flex items-center justify-center text-[var(--color-secondary)] group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
