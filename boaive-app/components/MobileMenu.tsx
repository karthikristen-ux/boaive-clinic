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
          <div className="flex-1 flex flex-col justify-center px-8 pt-20">
            <nav className="space-y-2">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="mobile-menu-item"
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
              >
                <Link
                  href="/appointment"
                  onClick={onClose}
                  className="inline-flex items-center gap-3 mt-6 text-[var(--color-background)] font-body text-sm font-medium tracking-[0.1em] uppercase border-b border-[var(--color-background)]/30 pb-1 hover:border-[var(--color-background)] transition-colors"
                >
                  Book Appointment
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Customize Demo */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.15 + menuItems.length * 0.06, duration: 0.5 }}
              >
                <Link
                  href="/customize"
                  onClick={onClose}
                  className="inline-flex items-center gap-3 mt-3 text-[var(--color-background)]/60 font-body text-sm font-medium tracking-[0.1em] uppercase hover:text-[var(--color-background)] transition-colors"
                >
                  Customize Demo
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </nav>
          </div>

          {/* Bottom section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="px-8 pb-10"
          >
            <div className="flex items-center gap-6 mb-6">
              <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[var(--color-background)]/60 hover:text-[var(--color-background)] transition-colors" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[var(--color-background)]/60 hover:text-[var(--color-background)] transition-colors" aria-label="Facebook">
                <FacebookIcon size={20} />
              </a>
              <a href={config.social.youtube} target="_blank" rel="noopener noreferrer" className="text-[var(--color-background)]/60 hover:text-[var(--color-background)] transition-colors" aria-label="YouTube">
                <YoutubeIcon size={20} />
              </a>
            </div>
            <p className="text-[var(--color-background)]/40 text-xs tracking-wider uppercase">
              {config.tagline}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
