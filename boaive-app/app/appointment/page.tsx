import AppointmentWizard from '@/components/AppointmentWizard';
import { ShieldCheck, Clock, MessageSquare, Phone } from 'lucide-react';

export default function AppointmentPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 12px)' }} className="lg:!pt-[calc(var(--header-height)+36px)] min-h-[calc(100vh-var(--header-height))]">
      <section className="pt-2 pb-16 sm:pt-6 sm:pb-24">
        <div className="container-main">
          {/* Mobile Header (< lg) */}
          <div className="lg:hidden text-center mb-6 w-full max-w-xl mx-auto flex flex-col items-center">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-secondary)] mb-1.5">ONLINE APPOINTMENT</p>
            <h1 className="heading-section !text-3xl sm:!text-5xl text-[var(--color-foreground)] leading-tight text-center mb-2">
              Book an appointment.
            </h1>
            <p className="font-body text-xs sm:text-sm text-[var(--color-secondary)] text-center leading-relaxed max-w-md mx-auto px-4">
              Choose your specialty, pick a convenient time, and we'll prepare your personalized consultation.
            </p>
          </div>

          {/* Desktop Split Layout (Hero Left, Square Form Tab Right) */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-14 items-start max-w-6xl mx-auto">
            {/* Desktop Left Column: Hero Text & Spread-out Feature Cards */}
            <div className="hidden lg:flex lg:col-span-6 flex-col justify-between py-1 pr-2 xl:pr-6 space-y-6">
              <div>
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[var(--color-secondary)] mb-2.5">
                  ONLINE APPOINTMENT
                </p>
                <h1 className="font-serif text-3xl xl:text-4xl text-[var(--color-foreground)] leading-tight mb-2.5">
                  Book an appointment.
                </h1>
                <p className="font-body text-sm text-[var(--color-secondary)] leading-relaxed">
                  Choose your specialty, pick a convenient time, and we'll prepare your personalized consultation.
                </p>
              </div>

              {/* 3 Spread-out Feature Cards */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 p-4.5 bg-[var(--color-card)] border border-[var(--color-border)] shadow-2xs">
                  <div className="w-11 h-11 shrink-0 bg-[var(--color-muted)]/60 text-[var(--color-primary)] flex items-center justify-center p-2.5">
                    <ShieldCheck size={22} />
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

                <div className="flex items-start gap-4 p-4.5 bg-[var(--color-card)] border border-[var(--color-border)] shadow-2xs">
                  <div className="w-11 h-11 shrink-0 bg-[var(--color-muted)]/60 text-[var(--color-primary)] flex items-center justify-center p-2.5">
                    <Clock size={22} />
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

                <div className="flex items-start gap-4 p-4.5 bg-[var(--color-card)] border border-[var(--color-border)] shadow-2xs">
                  <div className="w-11 h-11 shrink-0 bg-[var(--color-muted)]/60 text-[var(--color-primary)] flex items-center justify-center p-2.5">
                    <MessageSquare size={22} />
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
              <div className="mt-5 sm:mt-6 p-4.5 bg-[var(--color-card)] border border-[var(--color-border)] shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-[var(--color-secondary)] mb-0.5">
                    PREFER TO SPEAK WITH US?
                  </p>
                  <p className="font-body font-semibold text-sm text-[var(--color-foreground)]">
                    Mon – Sat: 9:00 AM – 8:00 PM
                  </p>
                </div>
                <a
                  href="tel:+919999999999"
                  className="px-4 py-2.5 border border-[var(--color-primary)] text-xs font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Phone size={13} />
                  <span>Call Clinic</span>
                </a>
              </div>
            </div>

            {/* Right Column: Appointment Wizard Form Tab (Square / Mini Rectangle Card) */}
            <div className="w-full lg:col-span-6 flex flex-col">
              <div className="w-full bg-[var(--color-card)] border border-[var(--color-border)] p-5 sm:p-7 lg:p-7 shadow-sm flex flex-col justify-between">
                <AppointmentWizard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


