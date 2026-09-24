'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette, Type, Layout, Layers, Users, Phone, Zap, Image, PenTool, Eye, Monitor, Smartphone, RotateCcw, Check } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { colorPalettes, typographyPresets, animationPresets } from '@/config/site-config';

const tabs = [
  { id: 'branding', label: 'Branding', icon: PenTool },
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'typography', label: 'Typography', icon: Type },
  { id: 'services', label: 'Services', icon: Layers },
  { id: 'hero', label: 'Hero', icon: Image },
  { id: 'doctors', label: 'Doctors', icon: Users },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'appointment', label: 'Appointment', icon: Layout },
  { id: 'animations', label: 'Animations', icon: Zap },
];

export default function CustomizePage() {
  const { config, updateConfig, updateHero, updateContact, toggleService, resetConfig } = useTheme();
  const [activeTab, setActiveTab] = useState('branding');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 36px)' }}>
      <section className="min-h-screen">
        <div className="container-main py-8">
          {/* Page header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/" className="btn-text mb-3 inline-flex">
                <ArrowLeft size={14} />
                Back to Website
              </Link>
              <h1 className="heading-subsection">Make it your clinic.</h1>
              <p className="text-sm text-[var(--color-secondary)] mt-1">
                Customize the website and see the changes live.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={resetConfig} className="btn-secondary !py-2.5 !px-4 !text-[0.6875rem]">
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
              {/* Mobile preview toggle */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="lg:hidden btn-primary !py-2.5 !px-4 !text-[0.6875rem]"
              >
                <Eye size={12} />
                <span>{showPreview ? 'Edit' : 'Preview'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left: Controls */}
            <div className={`lg:col-span-5 xl:col-span-4 ${showPreview ? 'hidden lg:block' : ''}`}>
              {/* Tabs */}
              <div className="flex lg:flex-col gap-1 mb-6 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all ${
                        activeTab === tab.id
                          ? 'bg-[var(--color-primary)] text-[var(--color-background)]'
                          : 'text-[var(--color-secondary)] hover:bg-[var(--color-muted)]'
                      }`}
                    >
                      <Icon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab content */}
              <div className="border border-[var(--color-border)] p-6 bg-[var(--color-card)] min-h-[400px]">
                {/* Branding */}
                {activeTab === 'branding' && (
                  <div className="space-y-6">
                    <div>
                      <label className="form-label">Clinic Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={config.clinicName}
                        onChange={e => updateConfig({ clinicName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Tagline</label>
                      <input
                        type="text"
                        className="form-input"
                        value={config.tagline}
                        onChange={e => updateConfig({ tagline: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Logo Preview</label>
                      <div className="flex items-center gap-4 p-4 bg-[var(--color-muted)]">
                        <img src={config.logoIcon} alt="Logo" className="w-10 h-10 object-contain" />
                        <span className="text-sm font-semibold tracking-wider uppercase">{config.clinicName}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Colors */}
                {activeTab === 'colors' && (
                  <div className="space-y-4">
                    <p className="text-xs text-[var(--color-secondary)]">Choose an accent color palette</p>
                    <div className="grid grid-cols-1 gap-3">
                      {colorPalettes.map((palette) => (
                        <button
                          key={palette.id}
                          onClick={() => updateConfig({ colorPalette: palette.id })}
                          className={`flex items-center gap-4 p-4 border transition-all text-left ${
                            config.colorPalette === palette.id
                              ? 'border-[var(--color-primary)] bg-[var(--color-muted)]'
                              : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
                          }`}
                        >
                          <div className="flex gap-1.5 shrink-0">
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.background, border: '1px solid #e5e5e5' }} />
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.primary }} />
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.accent }} />
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: palette.muted, border: '1px solid #e5e5e5' }} />
                          </div>
                          <span className="text-sm font-medium">{palette.name}</span>
                          {config.colorPalette === palette.id && <Check size={14} className="ml-auto text-[var(--color-accent)]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Typography */}
                {activeTab === 'typography' && (
                  <div className="space-y-4">
                    <p className="text-xs text-[var(--color-secondary)]">Choose a typography preset</p>
                    <div className="grid grid-cols-1 gap-3">
                      {typographyPresets.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => updateConfig({ typographyPreset: preset.id })}
                          className={`p-4 border transition-all text-left ${
                            config.typographyPreset === preset.id
                              ? 'border-[var(--color-primary)] bg-[var(--color-muted)]'
                              : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
                          }`}
                        >
                          <p className="text-sm font-medium mb-1">{preset.name}</p>
                          <p className="text-xs text-[var(--color-secondary)]">
                            Display: {preset.displayFont} · Body: {preset.bodyFont}
                          </p>
                          {config.typographyPreset === preset.id && <Check size={14} className="text-[var(--color-accent)] mt-2" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services */}
                {activeTab === 'services' && (
                  <div className="space-y-4">
                    <p className="text-xs text-[var(--color-secondary)]">Enable or disable services</p>
                    {config.services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-4 border border-[var(--color-border)]"
                      >
                        <div>
                          <p className="text-sm font-medium">{service.name}</p>
                          <p className="text-xs text-[var(--color-secondary)]">{service.treatments.length} treatments</p>
                        </div>
                        <button
                          onClick={() => toggleService(service.id)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            service.enabled ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'
                          }`}
                          role="switch"
                          aria-checked={service.enabled}
                          aria-label={`Toggle ${service.name}`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            service.enabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Hero */}
                {activeTab === 'hero' && (
                  <div className="space-y-5">
                    <div>
                      <label className="form-label">Eyebrow Text</label>
                      <input
                        type="text"
                        className="form-input"
                        value={config.hero.eyebrow}
                        onChange={e => updateHero({ eyebrow: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Headline (one line per row)</label>
                      {config.hero.headline.map((line, i) => (
                        <input
                          key={i}
                          type="text"
                          className="form-input mb-2"
                          value={line}
                          onChange={e => {
                            const newHeadline = [...config.hero.headline];
                            newHeadline[i] = e.target.value;
                            updateHero({ headline: newHeadline });
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-input min-h-[80px]"
                        value={config.hero.description}
                        onChange={e => updateHero({ description: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Primary CTA</label>
                      <input
                        type="text"
                        className="form-input"
                        value={config.hero.primaryCta}
                        onChange={e => updateHero({ primaryCta: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Secondary CTA</label>
                      <input
                        type="text"
                        className="form-input"
                        value={config.hero.secondaryCta}
                        onChange={e => updateHero({ secondaryCta: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* Doctors */}
                {activeTab === 'doctors' && (
                  <div className="space-y-4">
                    <p className="text-xs text-[var(--color-secondary)]">Manage your doctors</p>
                    {config.doctors.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-4 p-4 border border-[var(--color-border)]">
                        <img src={doc.photo} alt={doc.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{doc.name}</p>
                          <p className="text-xs text-[var(--color-secondary)] truncate">{doc.qualification}</p>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-[var(--color-muted-foreground)] italic">
                      Doctor editing available in production version
                    </p>
                  </div>
                )}

                {/* Contact */}
                {activeTab === 'contact' && (
                  <div className="space-y-5">
                    <div>
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-input"
                        value={config.contact.phone}
                        onChange={e => updateContact({ phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">WhatsApp Number (no +)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={config.contact.whatsapp}
                        onChange={e => updateContact({ whatsapp: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-input"
                        value={config.contact.email}
                        onChange={e => updateContact({ email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-input min-h-[80px]"
                        value={config.contact.address}
                        onChange={e => updateContact({ address: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">Landmark</label>
                      <input
                        type="text"
                        className="form-input"
                        value={config.contact.landmark}
                        onChange={e => updateContact({ landmark: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-input"
                        value={config.contact.city}
                        onChange={e => updateContact({ city: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* Appointment */}
                {activeTab === 'appointment' && (
                  <div className="space-y-5">
                    <div>
                      <label className="form-label">Appointment Method</label>
                      <div className="space-y-2">
                        {(['whatsapp', 'phone', 'both'] as const).map((method) => (
                          <button
                            key={method}
                            onClick={() => updateConfig({ appointmentMethod: method })}
                            className={`w-full flex items-center justify-between p-3 border transition-all text-left ${
                              config.appointmentMethod === method
                                ? 'border-[var(--color-primary)] bg-[var(--color-muted)]'
                                : 'border-[var(--color-border)]'
                            }`}
                          >
                            <span className="text-sm capitalize">{method === 'both' ? 'WhatsApp + Phone' : method}</span>
                            {config.appointmentMethod === method && <Check size={14} className="text-[var(--color-accent)]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Animations */}
                {activeTab === 'animations' && (
                  <div className="space-y-4">
                    <p className="text-xs text-[var(--color-secondary)]">Choose a motion style</p>
                    {animationPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => updateConfig({ animationPreset: preset.id })}
                        className={`w-full p-4 border transition-all text-left ${
                          config.animationPreset === preset.id
                            ? 'border-[var(--color-primary)] bg-[var(--color-muted)]'
                            : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
                        }`}
                      >
                        <p className="text-sm font-medium">{preset.name}</p>
                        <p className="text-xs text-[var(--color-secondary)] mt-1">{preset.description}</p>
                        {config.animationPreset === preset.id && <Check size={14} className="text-[var(--color-accent)] mt-2" />}
                      </button>
                    ))}
                  </div>
                )}

              </div>
            </div>

            {/* Right: Live Preview */}
            <div className={`lg:col-span-7 xl:col-span-8 ${!showPreview ? 'hidden lg:block' : ''}`}>
              <div className="sticky top-28">
                {/* Preview controls */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs text-[var(--color-secondary)] tracking-wider uppercase">Live Preview</p>
                  <div className="flex items-center gap-1 bg-[var(--color-muted)] p-1">
                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={`p-2 transition-all ${
                        previewMode === 'desktop' ? 'bg-[var(--color-primary)] text-[var(--color-background)]' : 'text-[var(--color-secondary)]'
                      }`}
                      aria-label="Desktop preview"
                    >
                      <Monitor size={14} />
                    </button>
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`p-2 transition-all ${
                        previewMode === 'mobile' ? 'bg-[var(--color-primary)] text-[var(--color-background)]' : 'text-[var(--color-secondary)]'
                      }`}
                      aria-label="Mobile preview"
                    >
                      <Smartphone size={14} />
                    </button>
                  </div>
                </div>

                {/* Preview frame */}
                <div className={`border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden transition-all duration-500 ${
                  previewMode === 'mobile' ? 'max-w-[375px] mx-auto' : ''
                }`}>
                  <div className="bg-[var(--color-muted)] px-4 py-2 flex items-center gap-2 border-b border-[var(--color-border)]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-[0.625rem] text-[var(--color-muted-foreground)]">
                        {config.clinicName.toLowerCase().replace(/\s/g, '')}.com
                      </span>
                    </div>
                  </div>

                  {/* Live preview content */}
                  <div className="overflow-y-auto max-h-[600px]">
                    {/* Mini header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
                      <div className="flex items-center gap-2">
                        <img src={config.logoIcon} alt="Logo" className="w-6 h-6 object-contain" />
                        <span className="text-[0.625rem] font-semibold tracking-wider uppercase">{config.clinicName}</span>
                      </div>
                      <span className="text-[0.5rem] px-2 py-1 bg-[var(--color-primary)] text-[var(--color-background)] tracking-wider uppercase">
                        Book
                      </span>
                    </div>

                    {/* Mini hero */}
                    <div className="relative">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={config.hero.image}
                          alt="Hero"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-[0.5rem] tracking-wider uppercase opacity-70 mb-1">{config.hero.eyebrow}</p>
                        <h2 className="font-display text-lg leading-tight">
                          {config.hero.headline.join(' ')}
                        </h2>
                        <p className="text-[0.625rem] opacity-70 mt-1">{config.hero.description}</p>
                      </div>
                    </div>

                    {/* Mini services */}
                    <div className="p-4">
                      <p className="text-[0.5rem] tracking-wider uppercase text-[var(--color-secondary)] mb-2">Services</p>
                      <div className="grid grid-cols-3 gap-2">
                        {config.services.filter(s => s.enabled).map((service) => (
                          <div key={service.id} className="text-center p-2 border border-[var(--color-border)]">
                            <p className="text-[0.5625rem] font-medium">{service.name.replace(' Care', '')}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mini doctors */}
                    <div className="p-4 bg-[var(--color-muted)]">
                      <p className="text-[0.5rem] tracking-wider uppercase text-[var(--color-secondary)] mb-2">Doctors</p>
                      <div className="flex gap-2">
                        {config.doctors.slice(0, 3).map((doc) => (
                          <div key={doc.id} className="flex-1 text-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mx-auto mb-1">
                              <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-[0.5rem] font-medium truncate">{doc.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mini footer */}
                    <div className="p-4 bg-[var(--color-primary)] text-[var(--color-background)]">
                      <p className="text-[0.625rem] font-display opacity-80">{config.tagline}</p>
                      <div className="flex items-center gap-2 mt-2 text-[0.5rem] opacity-50">
                        <span>{config.contact.phone}</span>
                        <span>·</span>
                        <span>{config.contact.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[var(--color-muted-foreground)] text-center mt-3 italic">
                  Live preview (updates instantly)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
