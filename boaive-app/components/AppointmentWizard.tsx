'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Smile, Wind, Sparkles, Phone, MessageCircle, Calendar as CalIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { generateWhatsAppUrl, generateAppointmentMessage, getDaysInMonth, getFirstDayOfMonth, formatDate } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  dental: <Smile size={28} />,
  hair: <Wind size={28} />,
  skin: <Sparkles size={28} />,
};

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
];

const disabledSlots = ['12:00 PM']; // Demo: one slot unavailable

export default function AppointmentWizard() {
  const { config } = useTheme();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', age: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const enabledServices = config.services.filter(s => s.enabled);
  const activeService = enabledServices.find(s => s.id === selectedService);

  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);

  const canProceed = () => {
    switch (step) {
      case 1: return !!selectedService;
      case 2: return !!selectedTreatment;
      case 3: return !!selectedDate && !!selectedTime;
      case 4: return formData.name.trim() && formData.phone.trim();
      default: return false;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const serviceName = activeService?.name || '';
  const treatmentName = activeService?.treatments.find(t => t.id === selectedTreatment)?.name || '';

  const whatsAppMessage = generateAppointmentMessage({
    name: formData.name,
    phone: formData.phone,
    service: serviceName,
    treatment: treatmentName,
    date: selectedDate ? formatDate(selectedDate) : '',
    time: selectedTime,
    message: formData.message,
  });

  const whatsAppUrl = generateWhatsAppUrl(config.contact.whatsapp, whatsAppMessage);

  const steps = ['Service', 'Treatment', 'Date & Time', 'Your Details'];

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-16 h-16 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center mx-auto mb-8"
        >
          <Check size={28} />
        </motion.div>
        <h2 className="heading-subsection mb-4">Your appointment request is ready.</h2>
        <p className="text-body-lg mb-10">
          Continue to WhatsApp to send your request to the clinic.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {(config.appointmentMethod === 'whatsapp' || config.appointmentMethod === 'both') && (
            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
              <MessageCircle size={16} />
              <span>Continue to WhatsApp</span>
              <ArrowRight size={14} />
            </a>
          )}
          {(config.appointmentMethod === 'phone' || config.appointmentMethod === 'both') && (
            <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`} className="btn-secondary justify-center">
              <Phone size={16} />
              <span>Call the Clinic</span>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col justify-between">
      {/* Progress — Mobile View */}
      <div className="w-full sm:hidden mb-4 px-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--color-secondary)]">
            Step {step} of 4: <span className="text-[var(--color-primary)] font-semibold">{steps[step - 1]}</span>
          </span>
          <span className="text-[10px] font-bold tracking-widest text-[var(--color-secondary)] uppercase">
            {step === 1 ? 'Start' : step === 4 ? 'Final' : `${Math.round((step / 4) * 100)}%`}
          </span>
        </div>
        <div className="w-full h-1 bg-[var(--color-border)] rounded-full overflow-hidden flex gap-0.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-full flex-1 transition-all duration-300 ${
                step >= i ? 'bg-[var(--color-primary)]' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress — Desktop / Tablet View (Spread across all 4 columns) */}
      <div className="hidden sm:grid grid-cols-4 gap-2 w-full mb-6 pb-3 border-b border-[var(--color-border)]">
        {steps.map((s, i) => {
          const isDone = step > i + 1;
          const isCurrent = step === i + 1;
          return (
            <div
              key={s}
              className={`flex flex-col items-center text-center pb-2 transition-all border-b-2 ${
                isCurrent
                  ? 'border-[var(--color-primary)] text-[var(--color-foreground)]'
                  : isDone
                  ? 'border-[var(--color-accent)] text-[var(--color-secondary)]'
                  : 'border-transparent text-[var(--color-muted-foreground)] opacity-40'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isDone ? 'bg-[var(--color-accent)] text-white' :
                  isCurrent ? 'bg-[var(--color-primary)] text-white' :
                  'border border-[var(--color-border)] text-[var(--color-secondary)]'
                }`}>
                  {isDone ? <Check size={11} /> : i + 1}
                </span>
                <span className="text-[11px] font-bold tracking-wider uppercase">
                  {s === 'Date & Time' ? 'Date' : s === 'Your Details' ? 'Details' : s}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full flex-1 flex flex-col justify-between"
        >
          {/* Step 1: Service - Spread out cards filling the tab */}
          {step === 1 && (
            <div className="w-full flex-1 flex flex-col justify-between py-1">
              <div className="text-center mb-5">
                <h3 className="heading-subsection !text-xl sm:!text-2xl text-[var(--color-foreground)] mb-1.5 text-center">
                  What care are you seeking?
                </h3>
                <p className="font-body text-xs sm:text-sm text-[var(--color-secondary)] text-center max-w-sm mx-auto">
                  Select your specialty to view available treatments and clinic timings
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:gap-5 w-full my-auto py-2">
                {enabledServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service.id);
                      setSelectedTreatment('');
                      setStep(2);
                    }}
                    className={`w-full flex items-center justify-between p-4.5 sm:p-5 md:p-6 rounded-[var(--radius-md)] border transition-colors duration-200 group cursor-pointer text-left ${
                      selectedService === service.id
                        ? 'bg-[var(--color-muted)] border-[var(--color-accent)]'
                        : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-primary)]'
                    }`}
                  >
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-[var(--color-muted)] text-[var(--color-accent)] flex items-center justify-center">
                        {service.id === 'dental' ? <Smile className="w-6 h-6 sm:w-7 sm:h-7" /> :
                         service.id === 'hair' ? <Wind className="w-6 h-6 sm:w-7 sm:h-7" /> :
                         <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />}
                      </div>
                      <div className="min-w-0">
                        <p className="font-body font-semibold text-base sm:text-lg md:text-xl text-[var(--color-primary)] leading-tight mb-1">
                          {service.name}
                        </p>
                        <p className="font-body text-xs sm:text-sm text-[var(--color-secondary)] leading-relaxed truncate sm:whitespace-normal">
                          {service.tagline}
                        </p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs tracking-[0.1em] font-bold uppercase transition-colors shrink-0 ml-3 ${
                      selectedService === service.id
                        ? 'bg-[var(--color-accent)] text-white'
                        : 'bg-[var(--color-muted)] text-[var(--color-primary)] group-hover:bg-[var(--color-accent)] group-hover:text-white'
                    }`}>
                      Select
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Treatment */}
          {step === 2 && activeService && (
            <div className="w-full flex-1 flex flex-col justify-between py-1">
              <div className="text-center mb-4">
                <h3 className="heading-subsection !text-xl sm:!text-2xl text-[var(--color-foreground)] mb-1 text-center">
                  Select {activeService.name} treatment
                </h3>
                <p className="font-body text-xs sm:text-sm text-[var(--color-secondary)] text-center">
                  Choose a specialized procedure to continue
                </p>
              </div>
              <div className="flex flex-col gap-2.5 w-full max-h-[360px] overflow-y-auto pr-1 my-auto">
                {activeService.treatments.map((treatment) => (
                  <button
                    key={treatment.id}
                    onClick={() => {
                      setSelectedTreatment(treatment.id);
                      setStep(3);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-[var(--radius-sm)] border transition-colors duration-200 text-left cursor-pointer ${
                      selectedTreatment === treatment.id
                        ? 'bg-[var(--color-muted)] border-[var(--color-accent)]'
                        : 'bg-[var(--color-card)] border-[var(--color-border)] hover:border-[var(--color-primary)]'
                    }`}
                  >
                    <div className="min-w-0 pr-3">
                      <p className="font-body font-semibold text-sm sm:text-base text-[var(--color-foreground)] leading-tight mb-0.5">{treatment.name}</p>
                      <p className="font-body text-[11px] sm:text-xs text-[var(--color-secondary)] line-clamp-1 sm:line-clamp-none">{treatment.description}</p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-[10px] tracking-[0.1em] font-bold uppercase transition-colors shrink-0 ml-2 ${
                      selectedTreatment === treatment.id
                        ? 'bg-[var(--color-accent)] text-white'
                        : 'bg-[var(--color-muted)] text-[var(--color-primary)]'
                    }`}>
                      {selectedTreatment === treatment.id ? 'Selected' : 'Select'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div className="w-full flex-1 flex flex-col justify-between py-1 text-center">
              <div>
                <h3 className="heading-subsection !text-xl sm:!text-2xl mb-1 text-center">Choose date & time</h3>
                <p className="font-body text-xs sm:text-sm text-[var(--color-secondary)] mb-4 text-center">
                  Select your preferred appointment slot
                </p>
              </div>

              {/* Calendar */}
              <div className="w-full max-w-sm mx-auto mb-4 bg-[var(--color-card)] p-3 sm:p-4 rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => {
                      if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
                      else setCalMonth(calMonth - 1);
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--color-muted)] cursor-pointer"
                    aria-label="Previous month"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[var(--color-foreground)]">
                    {new Date(calYear, calMonth).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => {
                      if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
                      else setCalMonth(calMonth + 1);
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--color-muted)] cursor-pointer"
                    aria-label="Next month"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-1">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <div key={d} className="text-center text-[10px] font-bold text-[var(--color-secondary)] uppercase py-1">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const date = new Date(calYear, calMonth, day);
                    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const isSunday = date.getDay() === 0;
                    const isDisabled = isPast || isSunday;
                    const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === calMonth && selectedDate?.getFullYear() === calYear;
                    const isToday = day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();

                    return (
                      <button
                        key={day}
                        onClick={() => !isDisabled && setSelectedDate(date)}
                        disabled={isDisabled}
                        className={`w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-xs transition-colors rounded-full ${
                          isSelected ? 'bg-[var(--color-accent)] text-white font-bold' :
                          isToday ? 'border border-[var(--color-accent)] text-[var(--color-accent)]' :
                          isDisabled ? 'opacity-25 cursor-not-allowed text-[var(--color-secondary)]' :
                          'hover:bg-[var(--color-muted)] text-[var(--color-foreground)] cursor-pointer'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-sm mx-auto"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-secondary)] mb-2 text-center">
                    Available times for {formatDate(selectedDate)}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => {
                      const isDisabled = disabledSlots.includes(slot);
                      return (
                        <button
                          key={slot}
                          onClick={() => !isDisabled && setSelectedTime(slot)}
                          disabled={isDisabled}
                          className={`py-2 px-1 text-xs rounded-[var(--radius-sm)] transition-colors cursor-pointer ${
                            selectedTime === slot
                              ? 'bg-[var(--color-accent)] text-white font-semibold'
                              : isDisabled
                              ? 'opacity-30 cursor-not-allowed bg-[var(--color-muted)]'
                              : 'bg-[var(--color-muted)] hover:bg-[var(--color-border)]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Step 4: Details */}
          {step === 4 && (
            <div className="w-full flex-1 flex flex-col justify-between py-1">
              <div className="text-center mb-4">
                <h3 className="heading-subsection !text-xl sm:!text-2xl mb-1 text-center">Your details</h3>
                <p className="font-body text-xs sm:text-sm text-[var(--color-secondary)] text-center">
                  We will confirm your booking via WhatsApp or phone
                </p>
              </div>

              <div className="space-y-3 sm:space-y-3.5 w-full my-auto">
                <div>
                  <label className="form-label !text-xs mb-1" htmlFor="apt-name">Full Name *</label>
                  <input
                    id="apt-name"
                    type="text"
                    className="form-input !py-2.5 !px-3 text-sm w-full"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="form-label !text-xs mb-1" htmlFor="apt-phone">Phone *</label>
                  <input
                    id="apt-phone"
                    type="tel"
                    className="form-input !py-2.5 !px-3 text-sm w-full"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="form-label !text-xs mb-1" htmlFor="apt-email">Email</label>
                  <input
                    id="apt-email"
                    type="email"
                    className="form-input !py-2.5 !px-3 text-sm w-full"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="form-label !text-xs mb-1" htmlFor="apt-age">Age (optional)</label>
                  <input
                    id="apt-age"
                    type="number"
                    className="form-input !py-2.5 !px-3 text-sm w-full"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={e => setFormData(p => ({ ...p, age: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="form-label !text-xs mb-1" htmlFor="apt-message">Message / Concern</label>
                  <textarea
                    id="apt-message"
                    className="form-input !py-2.5 !px-3 text-sm min-h-[75px] resize-y w-full"
                    placeholder="Describe your concern..."
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border)]">
        <button
          onClick={() => setStep(s => Math.max(1, s - 1))}
          className={`btn-text flex items-center gap-1.5 text-xs sm:text-sm font-medium ${step === 1 ? 'invisible pointer-events-none' : ''}`}
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        {step > 1 && step < 4 ? (
          <button
            onClick={() => setStep(s => Math.min(4, s + 1))}
            disabled={!canProceed()}
            className={`btn-primary !py-2.5 !px-5 sm:!py-3 sm:!px-8 text-xs sm:text-sm ${!canProceed() ? 'opacity-40 pointer-events-none' : ''}`}
          >
            <span>Continue</span>
            <ArrowRight size={14} />
          </button>
        ) : step === 4 ? (
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className={`btn-primary !py-2.5 !px-6 sm:!py-3 sm:!px-8 text-xs sm:text-sm ${!canProceed() ? 'opacity-40 pointer-events-none' : ''}`}
          >
            <span>Confirm Appointment</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <span className="text-xs text-[var(--color-secondary)] italic flex items-center gap-1.5 font-medium">
            Tap a specialty above to continue <ArrowRight size={13} />
          </span>
        )}
      </div>
    </div>
  );
}
