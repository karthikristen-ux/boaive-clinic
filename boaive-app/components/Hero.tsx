'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Hero() {
  const { config } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      {/* Background Image - Full bleed */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${config.hero.image})`,
          }}
        />
        {/* Gradient to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/75 to-[var(--color-background)]/10 md:to-transparent w-full" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="container-main relative z-10 w-full py-14 sm:py-16"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          {/* Eyebrow */}
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-4">
            {config.hero.eyebrow}
          </p>

          {/* Headline */}
          <h1 className="heading-hero mb-5 text-[var(--color-primary)]">
            {config.hero.headline.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[var(--color-secondary)] mb-8 max-w-md leading-relaxed">
            {config.hero.description}
          </p>

          {/* CTAs — visible at every breakpoint */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link href="/appointment" className="btn-primary">
              <span>{config.hero.primaryCta}</span>
              <ArrowRight size={16} className="opacity-90" />
            </Link>
            <Link href="/services" className="btn-secondary">
              <span>{config.hero.secondaryCta}</span>
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <div className="flex items-center gap-1.5">
              <div className="flex text-[var(--color-accent)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-xs font-semibold text-[var(--color-primary)]">4.9/5</span>
            </div>
            <p className="text-xs text-[var(--color-secondary)]">
              3,000+ patients treated · Dental, Hair &amp; Skin under one roof
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
