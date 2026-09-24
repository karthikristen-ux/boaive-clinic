'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Smile, Wind, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

interface CardItem {
  id: string;
  number: string;
  name: string;
  description: string;
  image: string;
  tag: string;
}

const treatmentCatalog: Record<string, CardItem[]> = {
  dental: [
    {
      id: 'd-ortho',
      number: '01',
      name: 'Orthodontics',
      description: 'Discreet aligners and precision-guided braces that straighten your smile with comfort and efficiency.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      tag: 'Alignment',
    },
    {
      id: 'd-crowns',
      number: '02',
      name: 'Crowns and Bridges',
      description: 'Custom-crafted crowns and bridges that restore strength, function, and seamless natural beauty.',
      image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&q=80&w=600',
      tag: 'Restorative',
    },
    {
      id: 'd-modern',
      number: '03',
      name: 'Modern Dentistry',
      description: 'Comprehensive diagnostics and minimally invasive 3D scan techniques for a healthier, confident smile.',
      image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=600',
      tag: 'Technology',
    },
    {
      id: 'd-pediatric',
      number: '04',
      name: 'Pediatric Dentistry',
      description: 'Gentle, friendly care designed for children, helping young patients build healthy habits for life.',
      image: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&q=80&w=600',
      tag: 'Family Care',
    },
  ],
  hair: [
    {
      id: 'h-prp',
      number: '01',
      name: 'Targeted PRP Therapy',
      description: 'Platelet-rich plasma enriched with growth factors to stimulate and reactivate dormant hair follicles naturally.',
      image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&q=80&w=600',
      tag: 'Regeneration',
    },
    {
      id: 'h-restore',
      number: '02',
      name: 'Follicular Hair Restoration',
      description: 'Precision minimally invasive graft techniques to restore natural hairline density and volume.',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600',
      tag: 'Density',
    },
    {
      id: 'h-scalp',
      number: '03',
      name: 'Medical Scalp Detox',
      description: 'Clinical micro-exfoliation and peptide infusion to revitalize the scalp microbiome and prevent shedding.',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=600',
      tag: 'Scalp Health',
    },
    {
      id: 'h-fall',
      number: '04',
      name: 'Anti-Hair Fall Protocol',
      description: 'Multi-action botanical and DHT-inhibiting therapies custom formulated to arrest active hair fall.',
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=600',
      tag: 'Prevention',
    },
  ],
  skin: [
    {
      id: 's-laser',
      number: '01',
      name: 'Laser Resurfacing',
      description: 'Fractional gentle laser technology targeting pigmentation, fine lines, and uneven tone with minimal downtime.',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=600',
      tag: 'Radiance',
    },
    {
      id: 's-acne',
      number: '02',
      name: 'Clinical Acne Clearing',
      description: 'Targeted dermal peel solutions and blue light therapy to purify pores and prevent future scarring.',
      image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?auto=format&fit=crop&q=80&w=600',
      tag: 'Clarity',
    },
    {
      id: 's-rejuv',
      number: '03',
      name: 'Skin Rejuvenation',
      description: 'Hydra-infusion facial therapies that replenish deep hydration and restore immediate glass-skin luminosity.',
      image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&q=80&w=600',
      tag: 'Hydration',
    },
    {
      id: 's-antiaging',
      number: '04',
      name: 'Collagen Architecture',
      description: 'Non-surgical radiofrequency and peptide lifting treatments that stimulate natural elastin and dermal volume.',
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600',
      tag: 'Firming',
    },
  ],
};

const categoryTabs = [
  { id: 'dental', label: 'Dental', icon: <Smile size={24} /> },
  { id: 'hair', label: 'Hair', icon: <Wind size={24} /> },
  { id: 'skin', label: 'Skin', icon: <Sparkles size={24} /> },
];

export default function TreatmentFinder() {
  const { config } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState<string>('dental');

  const cards = treatmentCatalog[activeTab] || treatmentCatalog.dental;

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
              Find treatments tailored to your goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          >
            {categoryTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 px-6 transition-all duration-300 border whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                      : 'bg-white text-[var(--color-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
                    {tab.label} Care
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {cards.map((card, index) => (
              <Link
                href={`/appointment?service=${activeTab}&treatment=${encodeURIComponent(card.name)}`}
                key={card.id}
                className="block h-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="group flex flex-col justify-between p-6 border border-[var(--color-border)] bg-white hover:border-[var(--color-primary)] hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full rounded-none"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-sm font-bold tracking-wider text-[var(--color-secondary)]">
                        {card.number}
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--color-secondary)]">
                        {card.tag}
                      </span>
                    </div>
                    <h3 className="font-body font-semibold text-lg lg:text-xl text-[var(--color-primary)] leading-snug mb-3">
                      {card.name}
                    </h3>
                    <p className="font-body text-xs sm:text-[13px] text-[var(--color-secondary)] leading-relaxed mb-6">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-muted)]/40 group-hover:scale-[1.02] transition-transform duration-300 rounded-none">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover object-center"
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
