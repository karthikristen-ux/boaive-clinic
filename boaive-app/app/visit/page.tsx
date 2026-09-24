'use client';

import { useTheme } from '@/context/ThemeContext';
import { ArrowRight, MapPin, Users, Phone, Mail, Clock } from 'lucide-react';

export default function VisitPage() {
  const { config } = useTheme();

  return (
    <div 
      className="bg-[var(--color-background)]"
      style={{ paddingTop: 'var(--header-height)' }}
    >
      <section className="pt-8 sm:pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Column */}
        <div className="flex flex-col">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-3">
            Visit the clinic.
          </h1>
          <p className="font-body text-sm sm:text-base text-[var(--color-secondary)] mb-10">
            Conveniently located for you.
          </p>

          <div className="flex flex-col gap-7 mb-6">
            
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
                  {config.contact.workingHours.weekdays} <br />
                  {config.contact.workingHours.saturday} <br />
                  {config.contact.workingHours.sunday}
                </p>
              </div>
            </div>
            
          </div>

          {/* Separated Google Maps Button with proper margin and top border divider */}
          <div className="mt-6 sm:mt-8 pt-6 border-t border-[var(--color-border)]">
            <a 
              href={config.contact.mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary inline-flex w-full sm:w-auto justify-center text-center !py-3.5 !px-8"
            >
               <span className="font-body text-sm font-semibold tracking-wide">Open in Google Maps</span>
               <ArrowRight size={16} />
            </a>
          </div>
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
    </section>
    </div>
  );
}
