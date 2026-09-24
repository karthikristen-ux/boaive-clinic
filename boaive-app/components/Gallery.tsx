'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { galleryImages } from '@/config/site-config';

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section ref={ref} className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-4">OUR CLINIC</p>
          <h2 className="heading-section">A space designed around you.</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* Category tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {galleryImages.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(i)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase whitespace-nowrap transition-all duration-300 ${
                  activeImage === i
                    ? 'bg-[var(--color-accent)] text-white shadow-[var(--shadow-accent)]'
                    : 'bg-[var(--color-muted)] text-[var(--color-secondary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {img.category}
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="relative aspect-[16/9] media-frame mb-4 shadow-[var(--shadow-lg)]">
            {galleryImages.map((img, i) => (
              <img
                key={img.id}
                src={img.src}
                alt={img.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  activeImage === i ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div className="hidden md:grid grid-cols-5 gap-3">
            {galleryImages.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(i)}
                className={`relative aspect-[4/3] rounded-[var(--radius-sm)] overflow-hidden transition-all duration-300 ${
                  activeImage === i ? 'ring-2 ring-[var(--color-accent)] ring-offset-2' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="md:hidden carousel-track mt-3">
            {galleryImages.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActiveImage(i)}
                className={`carousel-card w-24 aspect-[4/3] rounded-[var(--radius-sm)] overflow-hidden transition-all duration-300 shrink-0 ${
                  activeImage === i ? 'ring-2 ring-[var(--color-accent)]' : 'opacity-60'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
