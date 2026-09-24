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

          <div className="flex flex-col gap-6 mb-8">

            {/* Address */}
            <div className="flex gap-4 sm:gap-5 items-start">
              <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-muted)] text-[var(--color-accent)] flex items-center justify-center">
                <MapPin size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-body font-bold text-sm mb-1.5 text-[var(--color-foreground)]">Address</h3>
                <p className="font-body text-sm text-[var(--color-secondary)] leading-relaxed max-w-sm">
                  {config.contact.address}
                </p>
              </div>
            </div>

            {/* Landmark */}
            <div className="flex gap-4 sm:gap-5 items-start">
              <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-muted)] text-[var(--color-accent)] flex items-center justify-center">
                <Users size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-body font-bold text-sm mb-1.5 text-[var(--color-foreground)]">Landmark</h3>
                <p className="font-body text-sm text-[var(--color-secondary)] leading-relaxed max-w-sm">
                  {config.contact.landmark}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 sm:gap-5 items-start">
              <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-muted)] text-[var(--color-accent)] flex items-center justify-center">
                <Phone size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-body font-bold text-sm mb-1.5 text-[var(--color-foreground)]">Phone</h3>
                <p className="font-body text-sm text-[var(--color-secondary)] leading-relaxed max-w-sm">
                  {config.contact.phone}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 sm:gap-5 items-start">
              <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-muted)] text-[var(--color-accent)] flex items-center justify-center">
                <Mail size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-body font-bold text-sm mb-1.5 text-[var(--color-foreground)]">Email</h3>
                <p className="font-body text-sm text-[var(--color-secondary)] leading-relaxed max-w-sm">
                  {config.contact.email}
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex gap-4 sm:gap-5 items-start">
              <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-muted)] text-[var(--color-accent)] flex items-center justify-center">
                <Clock size={20} strokeWidth={2} />
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

          <a
            href={config.contact.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center text-center"
          >
             <span>Open in Google Maps</span>
             <ArrowRight size={16} />
          </a>
        </div>

        {/* Right Column: Map */}
        <div className="w-full h-[350px] lg:h-[450px] media-frame relative shadow-[var(--shadow-lg)]">
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
