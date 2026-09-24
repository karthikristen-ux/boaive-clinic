'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollStorySteps } from '@/config/site-config';

export default function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section ref={sectionRef} className="section-padding bg-[var(--color-background)] border-t border-[var(--color-border)] relative z-10">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-4">OUR APPROACH</p>
          <h2 className="heading-section max-w-lg">
            Care that goes beyond the appointment.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Steps */}
          <div className="space-y-0">
            {scrollStorySteps.map((step, i) => (
              <div
                key={step.number}
                className={`flex items-start gap-6 py-6 border-t border-[var(--color-border)] transition-all duration-300 cursor-pointer ${
                  activeStep === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
                onClick={() => setActiveStep(i)}
              >
                <span className="font-display text-3xl lg:text-4xl font-normal text-[var(--color-primary)] shrink-0 w-12">
                  0{step.number}
                </span>
                <div>
                  <h3 className="font-body font-semibold text-lg lg:text-xl mb-1 text-[var(--color-primary)]">
                    {step.title}
                  </h3>
                  <p className={`text-sm text-[var(--color-secondary)] max-w-sm transition-all duration-300 ${
                    activeStep === i ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Image */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-[var(--color-muted)] border border-[var(--color-border)] shadow-sm">
            {scrollStorySteps.map((step, i) => (
              <img
                key={step.number}
                src={step.image}
                alt={step.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  activeStep === i ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
