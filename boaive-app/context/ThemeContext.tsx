'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { SiteConfig, defaultConfig, colorPalettes, typographyPresets, ColorPalette } from '@/config/site-config';

interface ThemeContextType {
  config: SiteConfig;
  updateConfig: (updates: Partial<SiteConfig>) => void;
  updateHero: (updates: Partial<SiteConfig['hero']>) => void;
  updateContact: (updates: Partial<SiteConfig['contact']>) => void;
  updateService: (serviceId: string, updates: Partial<SiteConfig['services'][0]>) => void;
  toggleService: (serviceId: string) => void;
  addDoctor: (doctor: SiteConfig['doctors'][0]) => void;
  updateDoctor: (doctorId: string, updates: Partial<SiteConfig['doctors'][0]>) => void;
  removeDoctor: (doctorId: string) => void;
  getColorPalette: () => ColorPalette;
  resetConfig: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  const updateConfig = useCallback((updates: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const updateHero = useCallback((updates: Partial<SiteConfig['hero']>) => {
    setConfig(prev => ({ ...prev, hero: { ...prev.hero, ...updates } }));
  }, []);

  const updateContact = useCallback((updates: Partial<SiteConfig['contact']>) => {
    setConfig(prev => ({ ...prev, contact: { ...prev.contact, ...updates } }));
  }, []);

  const updateService = useCallback((serviceId: string, updates: Partial<SiteConfig['services'][0]>) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === serviceId ? { ...s, ...updates } : s),
    }));
  }, []);

  const toggleService = useCallback((serviceId: string) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === serviceId ? { ...s, enabled: !s.enabled } : s),
    }));
  }, []);

  const addDoctor = useCallback((doctor: SiteConfig['doctors'][0]) => {
    setConfig(prev => ({ ...prev, doctors: [...prev.doctors, doctor] }));
  }, []);

  const updateDoctor = useCallback((doctorId: string, updates: Partial<SiteConfig['doctors'][0]>) => {
    setConfig(prev => ({
      ...prev,
      doctors: prev.doctors.map(d => d.id === doctorId ? { ...d, ...updates } : d),
    }));
  }, []);

  const removeDoctor = useCallback((doctorId: string) => {
    setConfig(prev => ({
      ...prev,
      doctors: prev.doctors.filter(d => d.id !== doctorId),
    }));
  }, []);

  const getColorPalette = useCallback((): ColorPalette => {
    return colorPalettes.find(p => p.id === config.colorPalette) || colorPalettes[0];
  }, [config.colorPalette]);

  React.useEffect(() => {
    const palette = colorPalettes.find(p => p.id === config.colorPalette) || colorPalettes[0];
    const root = document.documentElement;
    root.style.setProperty('--color-background', palette.background);
    root.style.setProperty('--color-foreground', palette.foreground);
    root.style.setProperty('--color-primary', palette.primary);
    root.style.setProperty('--color-secondary', palette.secondary);
    root.style.setProperty('--color-accent', palette.accent);
    root.style.setProperty('--color-accent-rgb', palette.accentRgb);
    root.style.setProperty('--color-accent-foreground', palette.accentForeground);
    root.style.setProperty('--color-muted', palette.muted);
    root.style.setProperty('--color-muted-foreground', palette.mutedForeground);
    root.style.setProperty('--color-border', palette.border);
    root.style.setProperty('--color-card', palette.card);
    root.setAttribute('data-theme', config.colorPalette);
    root.setAttribute('data-motion', config.animationPreset);
  }, [config.colorPalette, config.animationPreset]);

  React.useEffect(() => {
    const preset = typographyPresets.find(p => p.id === config.typographyPreset) || typographyPresets[0];
    const root = document.documentElement;
    root.style.setProperty('--font-display', `'${preset.displayFont}', Georgia, serif`);
    root.style.setProperty('--font-body', `'${preset.bodyFont}', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`);
  }, [config.typographyPreset]);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  return (
    <ThemeContext.Provider value={{
      config,
      updateConfig,
      updateHero,
      updateContact,
      updateService,
      toggleService,
      addDoctor,
      updateDoctor,
      removeDoctor,
      getColorPalette,
      resetConfig,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
