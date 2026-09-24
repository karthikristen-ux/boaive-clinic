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
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      {/* Background Image - Full bleed */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${config.hero.image})`,
          }}
        />
        {/* Gradient to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/75 to-[var(--color-background)]/10 md:to-transparent w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/40 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="container-main relative z-10 w-full py-16 sm:py-20"
        style={{ opacity }}
      >
        <div className="max-w-xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-5"
          >
            {config.hero.eyebrow}
          </motion.p>

          {/* Headline */}
          <h1 className="heading-hero mb-6 text-[var(--color-primary)]">
            {config.hero.headline.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="text-base sm:text-lg text-[var(--color-secondary)] mb-9 max-w-md leading-relaxed"
          >
            {config.hero.description}
          </motion.p>

          {/* CTAs — visible at every breakpoint */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <Link href="/appointment" className="btn-primary">
              <span>{config.hero.primaryCta}</span>
              <ArrowRight size={16} className="opacity-90" />
            </Link>
            <Link href="/services" className="btn-secondary">
              <span>{config.hero.secondaryCta}</span>
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="flex items-center gap-4 sm:gap-6 flex-wrap"
          >
            <div className="flex items-center gap-1.5">
              <div className="flex text-[var(--color-accent)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-xs font-semibold text-[var(--color-primary)]">4.9/5</span>
            </div>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <span className="text-xs text-[var(--color-secondary)]">3,000+ patients treated</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <span className="text-xs text-[var(--color-secondary)]">Dental · Hair · Skin, under one roof</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
