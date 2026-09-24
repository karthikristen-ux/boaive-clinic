'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, Calendar, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function DoctorSection() {
  const { config } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const doctor = config.doctors.find(d => d.id === selectedDoctor);

  return (
    <section ref={ref} className="section-padding">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16 text-center lg:text-left"
        >
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-4">OUR TEAM</p>
          <h2 className="heading-section">Meet your doctors.</h2>
          <p className="font-body text-sm text-[var(--color-secondary)] mt-3">Expertise. Empathy. Excellence.</p>
        </motion.div>

        {/* Doctor cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {config.doctors.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.7 }}
              className="group cursor-pointer"
              onClick={() => setSelectedDoctor(doc.id)}
            >
              <div className="relative aspect-[3/4] media-frame mb-6 shadow-[var(--shadow-sm)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-lg)]">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <h3 className="font-display text-2xl lg:text-[1.75rem] font-medium mb-1 text-[var(--color-primary)]">
                {doc.name}
              </h3>
              <p className="text-xs text-[var(--color-secondary)] mb-2 uppercase tracking-wider font-semibold">
                {doc.qualification}
              </p>
              <p className="text-sm text-[var(--color-secondary)] mb-4 max-w-[280px]">
                {doc.specialization}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                View Profile
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-[var(--color-muted-foreground)] mt-8 text-center italic">
          Demo content — actual doctor information will be shown here
        </p>
      </div>

      {/* Doctor Modal / Side Panel */}
      <AnimatePresence>
        {doctor && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedDoctor(null)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[var(--color-background)] z-50 overflow-y-auto"
            >
              <div className="p-6 lg:p-10">
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-muted)] hover:bg-[var(--color-border)] transition-colors"
                  aria-label="Close profile"
                >
                  <X size={18} />
                </button>

                <div className="aspect-[3/4] media-frame shadow-[var(--shadow-md)] mb-8 mt-8">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-display text-3xl font-normal mb-2">{doctor.name}</h3>
                <p className="text-sm text-[var(--color-secondary)] mb-1">{doctor.qualification}</p>
                <p className="text-sm text-[var(--color-accent)] mb-1">{doctor.specialization}</p>
                <p className="text-sm text-[var(--color-secondary)] mb-6">{doctor.experience} experience</p>

                <p className="text-sm text-[var(--color-secondary)] leading-relaxed mb-6">
                  {doctor.biography}
                </p>

                {doctor.expertise.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xs font-medium tracking-wider uppercase text-[var(--color-secondary)] mb-3">
                      Areas of Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.expertise.map((e) => (
                        <span key={e} className="px-3 py-1.5 rounded-full text-xs bg-[var(--color-muted)] text-[var(--color-secondary)]">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`tel:${doctor.phone}`} className="btn-secondary flex-1 justify-center">
                    <Phone size={14} />
                    <span>Call Doctor</span>
                  </a>
                  <a href="/appointment" className="btn-primary flex-1 justify-center">
                    <Calendar size={14} />
                    <span>Book Appointment</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
