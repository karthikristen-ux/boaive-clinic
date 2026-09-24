'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check, Smile, Wind, Sparkles, Phone, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { generateWhatsAppUrl, generateAppointmentMessage, getDaysInMonth, getFirstDayOfMonth, formatDate } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  dental: <Smile size={24} className="lead-icon" />,
  hair: <Wind size={24} className="lead-icon" />,
  skin: <Sparkles size={24} className="lead-icon" />,
};

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];
const disabledSlots = ['12:00 PM']; // Demo: one slot unavailable
const stepNames = ['Department', 'Treatment', 'Date & time', 'Your details'];

export default function AppointmentWizard() {
  const { config } = useTheme();
  const enabledServices = config.services.filter(s => s.enabled);

  const preselected = useSearchParams().get('service');
  const initialService = enabledServices.find(s => s.slug === preselected)?.id ?? '';

  const [step, setStep] = useState(initialService ? 2 : 1);
  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', age: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const activeService = enabledServices.find(s => s.id === selectedService);

  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const canProceed =
    step === 2 ? !!selectedTreatment :
    step === 3 ? !!selectedDate && !!selectedTime :
    step === 4 ? !!formData.name.trim() && !!formData.phone.trim() : false;

  const treatmentName = activeService?.treatments.find(t => t.id === selectedTreatment)?.name || '';
  const whatsAppUrl = generateWhatsAppUrl(
    config.contact.whatsapp,
    generateAppointmentMessage({
      name: formData.name,
      phone: formData.phone,
      service: activeService?.name || '',
      treatment: treatmentName,
      date: selectedDate ? formatDate(selectedDate) : '',
      time: selectedTime,
      message: formData.message,
    })
  );
  const tel = `tel:${config.contact.phone.replace(/\s/g, '')}`;

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '16px 0' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Check size={28} />
        </div>
        <h2 className="h3" style={{ marginBottom: 8 }}>Your request is ready</h2>
        <p className="muted" style={{ marginBottom: 24 }}>
          {activeService?.name} · {treatmentName}<br />
          {selectedDate && formatDate(selectedDate)} at {selectedTime}
        </p>
        <p className="small muted" style={{ marginBottom: 20 }}>Send it to the clinic on WhatsApp so we can confirm your slot.</p>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          {config.appointmentMethod !== 'phone' && (
            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-block">
              <MessageCircle size={18} /> Send on WhatsApp
            </a>
          )}
          {config.appointmentMethod !== 'whatsapp' && (
            <a href={tel} className="btn btn-outline btn-block"><Phone size={18} /> Call the clinic</a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="steps" aria-hidden>
        {[1, 2, 3, 4].map(i => <span key={i} className={step >= i ? 'on' : ''} />)}
      </div>
      <p className="step-label">Step {step} of 4 · {stepNames[step - 1]}</p>

      {step === 1 && (
        <div>
          <h2 className="h3" style={{ marginBottom: 16 }}>What do you need help with?</h2>
          <div className="choice-list">
            {enabledServices.map(s => (
              <button
                key={s.id}
                className={`choice ${selectedService === s.id ? 'is-selected' : ''}`}
                onClick={() => { setSelectedService(s.id); setSelectedTreatment(''); setStep(2); }}
              >
                {iconMap[s.id]}
                <span><strong>{s.name}</strong><span className="sub">{s.tagline}</span></span>
                <ChevronRight size={18} style={{ marginLeft: 'auto', color: 'var(--ink-faint)' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && activeService && (
        <div>
          <h2 className="h3" style={{ marginBottom: 16 }}>Choose a {activeService.name.toLowerCase()} treatment</h2>
          <div className="choice-list">
            {activeService.treatments.map(t => (
              <button
                key={t.id}
                className={`choice ${selectedTreatment === t.id ? 'is-selected' : ''}`}
                onClick={() => setSelectedTreatment(t.id)}
              >
                <span><strong>{t.name}</strong><span className="sub">{t.description}</span></span>
                {selectedTreatment === t.id && <Check size={18} style={{ marginLeft: 'auto', color: 'var(--accent)', flexShrink: 0 }} />}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="h3" style={{ marginBottom: 16 }}>Pick a date and time</h2>
          <div className="cal-head">
            <button
              aria-label="Previous month"
              onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1); }}
            ><ChevronLeft size={20} /></button>
            <strong>{new Date(calYear, calMonth).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</strong>
            <button
              aria-label="Next month"
              onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1); }}
            ><ChevronRight size={20} /></button>
          </div>
          <div className="cal-grid">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="cal-dow">{d}</div>)}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(calYear, calMonth, day);
              const disabled = date < startOfToday || date.getDay() === 0;
              const selected = selectedDate?.getTime() === date.getTime();
              const isToday = date.getTime() === startOfToday.getTime();
              return (
                <button
                  key={day}
                  disabled={disabled}
                  onClick={() => setSelectedDate(date)}
                  className={`cal-day ${selected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}`}
                >{day}</button>
              );
            })}
          </div>

          {selectedDate && (
            <div style={{ marginTop: 20 }}>
              <p className="form-label">Available times · {formatDate(selectedDate)}</p>
              <div className="slots">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    disabled={disabledSlots.includes(slot)}
                    onClick={() => setSelectedTime(slot)}
                    className={`slot ${selectedTime === slot ? 'is-selected' : ''}`}
                  >{slot}</button>
                ))}
              </div>
              <p className="small muted" style={{ marginTop: 10 }}>Closed on Sundays.</p>
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="h3" style={{ marginBottom: 16 }}>Your details</h2>
          <div className="form-field">
            <label className="form-label" htmlFor="apt-name">Full name *</label>
            <input id="apt-name" className="form-input" autoComplete="name" placeholder="Your name" value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="apt-phone">Phone *</label>
            <input id="apt-phone" type="tel" inputMode="tel" className="form-input" autoComplete="tel" placeholder="Mobile number" value={formData.phone}
              onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="apt-message">Your concern (optional)</label>
            <textarea id="apt-message" className="form-input" placeholder="Tell us briefly what you need help with" value={formData.message}
              onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
          </div>
        </div>
      )}

      {step > 1 && (
        <div className="wizard-nav">
          <button className="back-btn" onClick={() => setStep(s => s - 1)}><ArrowLeft size={16} /> Back</button>
          {step < 4 ? (
            <button className="btn btn-primary" disabled={!canProceed} onClick={() => setStep(s => s + 1)}>
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn btn-primary" disabled={!canProceed} onClick={() => setSubmitted(true)}>
              Confirm request <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
