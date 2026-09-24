'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';

interface CaseStudy {
  title: string;
  treatment: string;
  duration: string;
  outcome: string;
  before: string;
  after: string;
}

const caseStudies: Record<string, CaseStudy> = {
  Dental: {
    title: 'Smile Rejuvenation & Cosmetic Alignment',
    treatment: 'Porcelain Veneers + Laser Whitening',
    duration: '2 Weeks (2 Sessions)',
    outcome: 'Diastema closed, shade improved by 7 levels with natural translucency.',
    before: '/images/dental-before.jpg',
    after: '/images/dental-after.jpg',
  },
  Hair: {
    title: 'Crown Density Restoration',
    treatment: 'Micro-Targeted PRP + Exosome Infusion',
    duration: '16 Weeks (4 Sessions)',
    outcome: 'Significant follicular density increase across crown & hairline.',
    before: '/images/hair-before.jpg',
    after: '/images/hair-after.jpg',
  },
  Skin: {
    title: 'Dermal Texture & Pigmentation Clarity',
    treatment: 'Fractional Resurfacing & Radiance Peel',
    duration: '6 Weeks (3 Sessions)',
    outcome: 'Blemish scars cleared, hyperpigmentation neutralized, luminous texture.',
    before: '/images/skin-before.jpg',
    after: '/images/skin-after.jpg',
  },
};

const categories = ['Dental', 'Hair', 'Skin'];

interface BeforeAfterProps {
  compact?: boolean;
}

export default function BeforeAfter({ compact = false }: BeforeAfterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeCategory, setActiveCategory] = useState('Dental');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    isDraggingRef.current = true;
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Direct non-passive touch listeners for mobile iOS/Android
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      setIsDragging(true);
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      if (e.cancelable) {
        e.preventDefault();
      }
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    slider.addEventListener('touchstart', onTouchStart, { passive: true });
    slider.addEventListener('touchmove', onTouchMove, { passive: false });
    slider.addEventListener('touchend', onTouchEnd, { passive: true });
    slider.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      slider.removeEventListener('touchstart', onTouchStart);
      slider.removeEventListener('touchmove', onTouchMove);
      slider.removeEventListener('touchend', onTouchEnd);
      slider.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [handleMove]);

  // Window pointer listeners as backup for dragging beyond bounds
  useEffect(() => {
    const onWindowPointerMove = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        handleMove(e.clientX);
      }
    };

    const onWindowPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    window.addEventListener('pointermove', onWindowPointerMove);
    window.addEventListener('pointerup', onWindowPointerUp);
    window.addEventListener('pointercancel', onWindowPointerUp);

    return () => {
      window.removeEventListener('pointermove', onWindowPointerMove);
      window.removeEventListener('pointerup', onWindowPointerUp);
      window.removeEventListener('pointercancel', onWindowPointerUp);
    };
  }, [handleMove]);

  const activeCase = caseStudies[activeCategory];

  return (
    <section ref={ref} className={`${compact ? 'py-4 sm:py-6' : 'section-padding'} section-alt`}>
      <div className="container-main">
        {/* Header */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end ${compact ? 'mb-4 sm:mb-6' : 'mb-8 md:mb-12'}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-2 sm:mb-3">BEFORE / AFTER</p>
            <h2 className={`${compact ? 'text-2xl sm:text-3xl md:text-4xl font-serif' : 'heading-section'} !mb-0`}>See the difference.</h2>
          </motion.div>

          {/* Horizontal Tabs on the Right */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={`flex gap-6 sm:gap-8 ${compact ? 'mt-3 md:mt-0' : 'mt-6 md:mt-0'}`}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setSliderPosition(50); }}
                  className={`text-xs font-bold tracking-[0.1em] uppercase transition-colors duration-300 pb-1 border-b-2 ${
                    isActive
                      ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
                      : 'text-[var(--color-secondary)] border-transparent hover:text-[var(--color-primary)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>

        <div className={`flex flex-col ${compact ? 'gap-4' : 'gap-8'}`}>
          {/* Full-width Slider Container */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full relative overflow-hidden"
          >
            <div
              ref={sliderRef}
              className={`ba-slider relative media-frame shadow-[var(--shadow-lg)] ${compact ? 'h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px] max-h-[50vh]' : 'h-[340px] sm:h-[420px] md:h-[480px] lg:h-[540px]'} select-none cursor-ew-resize touch-none`}
              style={{ touchAction: 'none' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              role="slider"
              aria-label="Before and after comparison slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') setSliderPosition((p) => Math.max(0, p - 3));
                if (e.key === 'ArrowRight') setSliderPosition((p) => Math.min(100, p + 3));
              }}
            >
              {/* After image (full width background) */}
              <img
                src={activeCase.after}
                alt={`${activeCategory} After treatment`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                draggable={false}
              />

              {/* Before image (clipped smoothly via clipPath from right) */}
              <img
                src={activeCase.before}
                alt={`${activeCategory} Before treatment`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
                style={{
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
                draggable={false}
              />

              {/* Badges */}
              <div className="absolute bottom-6 left-6 z-10 px-5 py-2 rounded-full bg-white text-[var(--color-primary)] text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase pointer-events-none shadow-md">
                Before
              </div>
              <div className="absolute bottom-6 right-6 z-10 px-5 py-2 rounded-full bg-white text-[var(--color-primary)] text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase pointer-events-none shadow-md">
                After
              </div>

              {/* Draggable Divider Line & Knob */}
              <div
                className="absolute top-0 bottom-0 z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Vertical line */}
                <div className="w-[1px] h-full bg-white mx-auto" />

                {/* Center Grab Handle Knob */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-primary)] transition-transform duration-150 hover:scale-110 active:scale-95">
                  <ArrowLeftRight size={16} strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Clinical Case Details Footer Bar */}
            <div className={`card ${compact ? 'p-4 gap-4' : 'p-6 gap-6'} mt-6 grid grid-cols-1 sm:grid-cols-3`}>
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--color-secondary)] tracking-[0.1em] block mb-2">
                  Treatment
                </span>
                <p className="font-body text-sm sm:text-base font-semibold text-[var(--color-primary)]">
                  {activeCase.treatment}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--color-secondary)] tracking-[0.1em] block mb-2">
                  Timeframe
                </span>
                <p className="font-body text-sm sm:text-base text-[var(--color-primary)] font-medium">
                  {activeCase.duration}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[var(--color-secondary)] tracking-[0.1em] block mb-2">
                  Outcome
                </span>
                <p className="font-body text-sm text-[var(--color-primary)] flex items-start gap-2">
                  <span className="leading-relaxed font-medium">{activeCase.outcome}</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
