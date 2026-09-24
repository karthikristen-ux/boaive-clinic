'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { demoReviews } from '@/config/site-config';

export default function ReviewCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [isPaused, setIsPaused] = useState(false);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const scrollAmount = 380;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (trackRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, scroll]);

  return (
    <section ref={ref} className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-4">TESTIMONIALS</p>
            <h2 className="heading-section">Patient stories.</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-none border border-[var(--color-border)] flex items-center justify-center text-[var(--color-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors bg-white"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-none border border-[var(--color-border)] flex items-center justify-center text-[var(--color-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors bg-white"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Reviews track */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div ref={trackRef} className="carousel-track">
            {[...demoReviews, ...demoReviews].map((review, i) => (
              <div
                key={`${review.id}-${i}`}
                className="carousel-card w-[320px] sm:w-[360px] p-8 border border-[var(--color-border)] bg-[var(--color-card)]"
              >
                {/* Stars */}
                <div className="star-rating mb-6">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-display text-lg lg:text-xl font-normal leading-relaxed mb-8">
                  {review.text}
                </p>

                {/* Author */}
                <div className="border-t border-[var(--color-border)] pt-4">
                  <p className="text-sm font-medium">— {review.name}</p>
                  <p className="text-xs text-[var(--color-secondary)] mt-0.5">{review.treatment}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-xs text-[var(--color-muted-foreground)] mt-6 text-center italic">
          Demo reviews — actual patient testimonials will be shown here
        </p>
      </div>
    </section>
  );
}
