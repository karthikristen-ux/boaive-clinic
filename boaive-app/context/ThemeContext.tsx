'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { SiteConfig, defaultConfig } from '@/config/site-config';

interface SiteContextType {
  config: SiteConfig;
  updateConfig: (updates: Partial<SiteConfig>) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  const updateConfig = useCallback((updates: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <SiteContext.Provider value={{ config, updateConfig }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
