'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image - Full bleed */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale: imageScale }}
      >
        {/* We use the hero image from config */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${config.hero.image})`,
          }}
        />
        {/* Subtle gradient to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/70 to-transparent w-full md:w-2/3" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="container-main relative z-10 w-full h-screen flex flex-col justify-center pt-20"
        style={{ opacity }}
      >
        <div className="max-w-2xl mt-12 md:mt-24">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-6"
          >
            CARE, REFINED.
          </motion.p>

          {/* Headline */}
          <h1 className="heading-hero mb-8 text-[var(--color-primary)]">
            {["Your skin.", "Your smile.", "Your confidence."].map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-lg md:text-xl text-[var(--color-primary)] mb-10 max-w-sm"
          >
            Advanced dental, hair and skin care designed around you.
          </motion.p>

          {/* CTA - visible on mobile only (desktop has it in header) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap items-center gap-8 mb-12 lg:hidden"
          >
            <Link href="/appointment" className="btn-primary !py-4 !px-8 !rounded-none">
              <span className="text-xs tracking-[0.1em] font-medium">Book Appointment</span>
              <ArrowRight size={16} className="opacity-70" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom Elements Removed as requested */}
      </motion.div>
    </section>
  );
}
