'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MapPin } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import ClinicLogo from '@/components/ClinicLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Results', href: '/results' },
  { label: 'Contact', href: '/visit' },
];

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

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 0C5.396 0 0.016 5.379 0.016 12.016c0 2.122.554 4.188 1.606 6.012L0 24l6.168-1.618a11.97 11.97 0 005.863 1.517h.005c6.632 0 12.015-5.38 12.015-12.018C24.052 5.38 18.669 0 12.031 0zm0 21.996h-.004a9.99 9.99 0 01-5.093-1.392l-.365-.216-3.782.992 1.01-3.687-.238-.378a9.96 9.96 0 01-1.528-5.3c0-5.518 4.49-10.008 10.012-10.008 2.673 0 5.185 1.042 7.075 2.933a9.94 9.94 0 012.932 7.078c0 5.52-4.49 10.01-10.007 10.01zm5.485-7.487c-.3-.15-1.777-.876-2.052-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.49-.893-.796-1.496-1.78-1.671-2.08-.175-.3-.019-.462.131-.611.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.583-.491-.504-.675-.513l-.575-.01c-.2 0-.525.075-.8.375s-1.05 1.025-1.05 2.5 1.075 2.898 1.225 3.1c.15.2 2.115 3.23 5.124 4.53.716.31 1.275.495 1.71.633.72.228 1.375.196 1.893.118.577-.087 1.777-.726 2.027-1.427.25-.7.25-1.3.175-1.426-.075-.125-.275-.2-.575-.35z" />
    </svg>
  );
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { config, updateConfig } = useTheme();
  const [showCustomizer, setShowCustomizer] = useState(false);
  const customizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showCustomizer) setShowCustomizer(false);
        else onClose();
      }
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, showCustomizer, onClose]);

  // Close customizer if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showCustomizer &&
        customizerRef.current &&
        !customizerRef.current.contains(e.target as Node)
      ) {
        setShowCustomizer(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCustomizer]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#090a0c] text-white flex flex-col justify-between overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Top Bar: Logo & Close Button */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 z-20">
            <Link href="/" onClick={onClose} className="inline-block">
              <ClinicLogo clinicName={config.clinicName} variant="light" size="sm" />
            </Link>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={26} strokeWidth={1.5} />
            </button>
          </div>

          {/* Central Area: Centered Serif Navigation Links & Action Button */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-4">
            <nav className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 text-center w-full">
              {menuItems.map((item, i) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`font-serif text-3xl sm:text-4xl tracking-tight transition-colors duration-200 block py-1 ${
                        isActive
                          ? 'text-[#c5a880]'
                          : 'text-white/90 hover:text-[#c5a880]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Book Appointment Button (Outlined Rectangular Button) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ delay: 0.1 + menuItems.length * 0.05, duration: 0.4 }}
                className="w-full text-center pt-5"
              >
                <Link
                  href="/appointment"
                  onClick={onClose}
                  className="inline-block border border-white/20 hover:border-[#c5a880] text-white hover:text-[#c5a880] font-body text-xs font-semibold tracking-[0.2em] uppercase py-3.5 px-8 transition-all active:scale-95"
                >
                  Book Appointment
                </Link>
              </motion.div>
            </nav>
          </div>

          {/* Customization Floating Button & Popup */}
          <div ref={customizerRef} className="relative">
            {/* Customization Popup Drawer (Matches Screenshot 2) */}
            <AnimatePresence>
              {showCustomizer && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="absolute bottom-28 right-4 sm:right-6 z-50 w-[290px] sm:w-[320px] bg-[#131418] border border-white/10 rounded-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                >
                  {/* Demo Theme Section */}
                  <div className="mb-4">
                    <p className="text-[#c5a880] text-[10px] font-bold tracking-[0.2em] uppercase mb-2.5">
                      DEMO · THEME
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {themes.map((theme) => {
                        const isCurrent = config.colorPalette === theme.id;
                        return (
                          <button
                            key={theme.id}
                            onClick={() => updateConfig({ colorPalette: theme.id })}
                            className={`text-[10px] font-semibold tracking-wider uppercase py-2 px-2.5 rounded border transition-all text-center ${
                              isCurrent
                                ? 'border-[#c5a880] text-[#c5a880] bg-[#c5a880]/15 shadow-sm'
                                : 'border-white/10 text-white/60 hover:text-white hover:border-white/20 bg-white/5'
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
                    <p className="text-[#c5a880] text-[10px] font-bold tracking-[0.2em] uppercase mb-2.5">
                      DEMO · MOTION
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {motions.map((motionItem) => {
                        const isCurrent = config.animationPreset === motionItem.id;
                        return (
                          <button
                            key={motionItem.id}
                            onClick={() => updateConfig({ animationPreset: motionItem.id })}
                            className={`text-[10px] font-semibold tracking-wider uppercase py-2 px-2.5 rounded border transition-all text-center ${
                              isCurrent
                                ? 'border-[#c5a880] text-[#c5a880] bg-[#c5a880]/15 shadow-sm'
                                : 'border-white/10 text-white/60 hover:text-white hover:border-white/20 bg-white/5'
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

            {/* Floating Customization Circle Button (Matches Screenshot 1) */}
            <div className="absolute -top-16 right-5 sm:right-8 z-40">
              <button
                onClick={() => setShowCustomizer(!showCustomizer)}
                className="w-12 h-12 rounded-full bg-[#1c1d22] border border-white/15 shadow-[0_4px_25px_rgba(0,0,0,0.6)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                aria-label="Toggle Demo Customizer"
                aria-expanded={showCustomizer}
              >
                <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#b8986e] to-[#e6ca9e] shadow-[0_0_12px_rgba(200,165,120,0.8)]" />
              </button>
            </div>
          </div>

          {/* Bottom Sticky Action Bar: CALL, WHATSAPP, DIRECTIONS */}
          <div className="border-t border-white/10 bg-[#0a0b0d] py-3.5 px-6 grid grid-cols-3 gap-2 text-center z-30">
            {/* CALL */}
            <a
              href={`tel:${config.contact.phone.replace(/\s/g, '')}`}
              className="flex flex-col items-center justify-center gap-1.5 text-[#c5a880] hover:text-white transition-colors py-1"
            >
              <Phone size={17} />
              <span className="text-[10px] font-bold tracking-wider uppercase">CALL</span>
            </a>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${config.contact.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-1.5 text-[#c5a880] hover:text-white transition-colors py-1"
            >
              <WhatsAppIcon size={18} />
              <span className="text-[10px] font-bold tracking-wider uppercase">WHATSAPP</span>
            </a>

            {/* DIRECTIONS */}
            <Link
              href="/visit"
              onClick={onClose}
              className="flex flex-col items-center justify-center gap-1.5 text-[#c5a880] hover:text-white transition-colors py-1"
            >
              <MapPin size={18} />
              <span className="text-[10px] font-bold tracking-wider uppercase">DIRECTIONS</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
