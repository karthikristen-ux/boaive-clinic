'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '@/components/SocialIcons';
import { useTheme } from '@/context/ThemeContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Visit', href: '/visit' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { config } = useTheme();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-40 bg-[var(--color-primary)] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-16">
            <nav className="space-y-4 flex flex-col items-center justify-center text-center w-full">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="mobile-menu-item text-center inline-block"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Book Appointment */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1 + menuItems.length * 0.06, duration: 0.5 }}
                className="w-full text-center pt-2"
              >
                <Link
                  href="/appointment"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-3 mt-6 text-[var(--color-background)] font-body text-sm font-semibold tracking-[0.15em] uppercase border-b border-[var(--color-background)]/40 pb-1.5 hover:border-[var(--color-background)] transition-colors mx-auto"
                >
                  <span>Book Appointment</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Customize Demo */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.15 + menuItems.length * 0.06, duration: 0.5 }}
                className="w-full text-center"
              >
                <Link
                  href="/customize"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-3 mt-3 text-[var(--color-background)]/60 font-body text-xs font-medium tracking-[0.15em] uppercase hover:text-[var(--color-background)] transition-colors mx-auto"
                >
                  <span>Customize Demo</span>
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </nav>
          </div>

          {/* Bottom section - Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="px-6 pb-10 flex flex-col items-center justify-center text-center"
          >
            <div className="flex items-center justify-center gap-7 mb-4">
              <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--color-background)]/60 hover:text-[var(--color-background)] transition-colors p-1" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--color-background)]/60 hover:text-[var(--color-background)] transition-colors p-1" aria-label="Facebook">
                <FacebookIcon size={20} />
              </a>
              <a href={config.social.youtube} target="_blank" rel="noopener noreferrer" className="text-[var(--color-background)]/60 hover:text-[var(--color-background)] transition-colors p-1" aria-label="YouTube">
                <YoutubeIcon size={20} />
              </a>
            </div>
            <p className="text-[var(--color-background)]/40 text-[10px] tracking-[0.25em] uppercase text-center">
              {config.tagline}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
