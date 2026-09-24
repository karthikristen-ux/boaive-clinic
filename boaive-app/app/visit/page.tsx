'use client';

import { useTheme } from '@/context/ThemeContext';
import { ArrowRight, MapPin, Users, Phone, Mail, Clock } from 'lucide-react';

export default function VisitPage() {
  const { config } = useTheme();

  return (
    <div 
      className="pb-20 bg-[var(--color-background)] min-h-screen flex items-center"
      style={{ paddingTop: 'calc(var(--header-height) + 64px)' }}
    >
      <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Column */}
        <div className="flex flex-col">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-3">
            Visit the clinic.
          </h1>
          <p className="font-body text-sm sm:text-base text-[var(--color-secondary)] mb-12">
            Conveniently located for you.
          </p>

          <div className="flex flex-col gap-8 mb-12">
            
            {/* Address */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="text-[var(--color-primary)] mt-1">
                <MapPin size={24} strokeWidth={2} className="opacity-80" />
              </div>
              <div>
                <h3 className="font-body font-bold text-sm mb-1.5 text-[var(--color-foreground)]">Address</h3>
                <p className="font-body text-sm text-[var(--color-secondary)] leading-relaxed max-w-sm">
                  {config.contact.address}
                </p>
              </div>
            </div>

            {/* Landmark */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="text-[var(--color-primary)] mt-1">
                <Users size={24} strokeWidth={2} className="opacity-80" />
              </div>
              <div>
                <h3 className="font-body font-bold text-sm mb-1.5 text-[var(--color-foreground)]">Landmark</h3>
                <p className="font-body text-sm text-[var(--color-secondary)] leading-relaxed max-w-sm">
                  {config.contact.landmark}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="text-[var(--color-primary)] mt-1">
                <Phone size={24} strokeWidth={2} className="opacity-80" />
              </div>
              <div>
                <h3 className="font-body font-bold text-sm mb-1.5 text-[var(--color-foreground)]">Phone</h3>
                <p className="font-body text-sm text-[var(--color-secondary)] leading-relaxed max-w-sm">
                  {config.contact.phone}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="text-[var(--color-primary)] mt-1">
                <Mail size={24} strokeWidth={2} className="opacity-80" />
              </div>
              <div>
                <h3 className="font-body font-bold text-sm mb-1.5 text-[var(--color-foreground)]">Email</h3>
                <p className="font-body text-sm text-[var(--color-secondary)] leading-relaxed max-w-sm">
                  {config.contact.email}
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <div className="text-[var(--color-primary)] mt-1">
                <Clock size={24} strokeWidth={2} className="opacity-80" />
              </div>
              <div>
                <h3 className="font-body font-bold text-sm mb-1.5 text-[var(--color-foreground)]">Working Hours</h3>
                <p className="font-body text-sm text-[var(--color-secondary)] leading-relaxed max-w-sm">
                  Mon – Sat: {config.contact.workingHours.weekdays} <br />
                  Sun: {config.contact.workingHours.sunday}
                </p>
              </div>
            </div>
            
          </div>

          <a 
            href={config.contact.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-[var(--color-primary)] text-[var(--color-background)] px-8 py-5 flex items-center justify-between w-full sm:w-auto sm:max-w-sm hover:bg-[var(--color-foreground)] transition-colors rounded-none"
          >
             <span className="font-body text-sm font-semibold tracking-wide">Open in Google Maps</span>
             <ArrowRight size={18} />
          </a>
        </div>

        {/* Right Column: Map */}
        <div className="w-full h-[350px] lg:h-[450px] rounded-none overflow-hidden relative shadow-inner">
          <iframe
            src={config.contact.mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Clinic Location Map"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}
