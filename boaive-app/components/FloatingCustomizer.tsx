'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const themes = [
  { id: 'dark', label: 'DARK' },
  { id: 'light', label: 'LIGHT' },
  { id: 'glass', label: 'GLASS' },
  { id: 'classic', label: 'CLASSIC' },
  { id: 'cafe', label: 'CAFE' },
];

const motions = [
  { id: 'minimal', label: 'MINIMAL' },
  { id: 'smooth', label: 'SMOOTH' },
  { id: 'cinematic', label: 'CINEMATIC' },
  { id: 'luxury', label: 'LUXURY' },
];

export default function FloatingCustomizer() {
  const { config, updateConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-40">
      {/* Customizer Drawer Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute bottom-16 right-0 w-[290px] sm:w-[320px] bg-[#121316]/95 border border-white/10 rounded-2xl p-5 shadow-[0_16px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-white"
          >
            {/* Demo Theme Section */}
            <div className="mb-4">
              <p className="text-[#c5a880] text-[10px] font-bold tracking-[0.2em] uppercase mb-2.5 flex items-center justify-between">
                <span>DEMO · THEME</span>
                <span className="text-[9px] text-white/40 tracking-normal capitalize">{config.colorPalette}</span>
              </p>
              <div className="grid grid-cols-3 gap-2">
                {themes.map((theme) => {
                  const isCurrent = config.colorPalette === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => updateConfig({ colorPalette: theme.id })}
                      className={`text-[10px] font-semibold tracking-wider uppercase py-2 px-2 rounded-md border transition-all text-center ${
                        isCurrent
                          ? 'border-[#c5a880] text-[#c5a880] bg-[#c5a880]/15 shadow-sm'
                          : 'border-white/10 text-white/60 hover:text-white hover:border-white/25 bg-white/5'
                      }`}
                    >
                      {theme.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Demo Motion Section */}
            <div>
              <p className="text-[#c5a880] text-[10px] font-bold tracking-[0.2em] uppercase mb-2.5 flex items-center justify-between">
                <span>DEMO · MOTION</span>
                <span className="text-[9px] text-white/40 tracking-normal capitalize">{config.animationPreset}</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {motions.map((motionItem) => {
                  const isCurrent = config.animationPreset === motionItem.id;
                  return (
                    <button
                      key={motionItem.id}
                      onClick={() => updateConfig({ animationPreset: motionItem.id })}
                      className={`text-[10px] font-semibold tracking-wider uppercase py-2 px-2.5 rounded-md border transition-all text-center ${
                        isCurrent
                          ? 'border-[#c5a880] text-[#c5a880] bg-[#c5a880]/15 shadow-sm'
                          : 'border-white/10 text-white/60 hover:text-white hover:border-white/25 bg-white/5'
                      }`}
                    >
                      {motionItem.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button (visible outside the menu) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#18191c] border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.65)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        aria-label="Toggle Demo Customizer"
        aria-expanded={isOpen}
      >
        <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#b8986e] to-[#e6ca9e] shadow-[0_0_12px_rgba(200,165,120,0.8)] group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
