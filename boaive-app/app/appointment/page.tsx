'use client';

import AppointmentWizard from '@/components/AppointmentWizard';
import { useTheme } from '@/context/ThemeContext';
import { ShieldCheck, Clock, MessageSquare, Phone } from 'lucide-react';

export default function AppointmentPage() {
  const { config } = useTheme();

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 12px)' }} className="lg:!pt-[calc(var(--header-height)+36px)] min-h-[calc(100vh-var(--header-height))]">
      <section className="pt-2 pb-16 sm:pt-6 sm:pb-24">
        <div className="container-main">
          {/* Mobile Header (< lg) */}
          <div className="lg:hidden text-center mb-6 w-full max-w-xl mx-auto flex flex-col items-center">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-1.5">ONLINE APPOINTMENT</p>
            <h1 className="heading-section !text-3xl sm:!text-5xl text-[var(--color-foreground)] leading-tight text-center mb-2">
              Book an appointment.
            </h1>
            <p className="font-body text-xs sm:text-sm text-[var(--color-secondary)] text-center leading-relaxed max-w-md mx-auto px-4">
              Choose your specialty, pick a convenient time, and we'll prepare your personalized consultation.
            </p>
          </div>

          {/* Desktop Split Layout (Hero Left, Form Right) */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14 items-start max-w-6xl mx-auto">
            {/* Desktop Left Column: Hero Text & Feature Cards */}
            <div className="hidden lg:flex lg:col-span-6 flex-col justify-between py-1 pr-2 xl:pr-6 space-y-7">
              <div>
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[var(--color-accent)] mb-2.5">
                  ONLINE APPOINTMENT
                </p>
                <h1 className="font-display text-3xl xl:text-4xl text-[var(--color-foreground)] leading-tight mb-2.5">
                  Book an appointment.
                </h1>
                <p className="font-body text-sm text-[var(--color-secondary)] leading-relaxed">
                  Choose your specialty, pick a convenient time, and we'll prepare your personalized consultation.
                </p>
              </div>

              {/* Feature cards */}
              <div className="flex flex-col gap-4">
                <div className="card flex items-start gap-4 p-5">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-muted)] text-[var(--color-accent)] flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h2 className="font-body font-semibold text-base text-[var(--color-foreground)] mb-1">
                      Specialist-Led Consultations
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">
                      Every session is conducted by board-certified clinical doctors across Dental, Hair, and Dermatology disciplines.
                    </p>
                  </div>
                </div>

                <div className="card flex items-start gap-4 p-5">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-muted)] text-[var(--color-accent)] flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h2 className="font-body font-semibold text-base text-[var(--color-foreground)] mb-1">
                      Zero Waiting Protocol
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">
                      Your reserved time slot is prepared exclusively in advance. Enjoy private, prompt reception without delays.
                    </p>
                  </div>
                </div>

                <div className="card flex items-start gap-4 p-5">
                  <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-muted)] text-[var(--color-accent)] flex items-center justify-center">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h2 className="font-body font-semibold text-base text-[var(--color-foreground)] mb-1">
                      Instant WhatsApp Confirmation
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed">
                      Receive immediate directions, reminders, and flexible one-tap rescheduling directly on your phone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Call Assist Card */}
              <div className="card p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-[var(--color-secondary)] mb-0.5">
                    PREFER TO SPEAK WITH US?
                  </p>
                  <p className="font-body font-semibold text-sm text-[var(--color-foreground)]">
                    {config.contact.workingHours.weekdays}
                  </p>
                </div>
                <a
                  href={`tel:${config.contact.phone.replace(/\s/g, '')}`}
                  className="btn-secondary !py-2.5 !px-4 !text-xs shrink-0"
                >
                  <Phone size={13} />
                  <span>Call Clinic</span>
                </a>
              </div>
            </div>

            {/* Right Column: Appointment Wizard */}
            <div className="w-full lg:col-span-6 flex flex-col">
              <div className="card w-full p-5 sm:p-7 lg:p-8 flex flex-col justify-between">
                <AppointmentWizard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
