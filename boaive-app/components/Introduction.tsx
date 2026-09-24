'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Introduction() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-padding overflow-hidden">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-eyebrow mb-6"
            >
              ONE CLINIC. COMPLETE CARE.
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="heading-section mb-6"
            >
              Where modern medicine<br />meets personal care.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-body-lg max-w-md"
            >
              We bring together dental, hair and skin specialists under one roof — 
              so your care is connected, consistent, and built around you.
            </motion.p>
          </div>

          {/* Image */}
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={isInView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
            transition={{ delay: 0.2, duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
              alt="Modern clinic interior"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
