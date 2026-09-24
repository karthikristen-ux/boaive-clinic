'use client';

import { useState } from 'react';
import { Settings, X, Save, Palette, Type } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { colorPalettes, typographyPresets } from '@/config/site-config';

export default function LiveCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const { config, updateConfig } = useTheme();

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[100] w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ${isOpen ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}`}
        aria-label="Customize Theme"
      >
        <Settings size={24} className="animate-[spin_4s_linear_infinite]" />
      </button>

      {/* Side Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.1)] z-[100] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-[100%]'}`}
      >
        <div className="p-6 sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Live Customizer</h2>
            <p className="text-xs text-gray-500">Preview changes instantly</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Colors */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              <Palette size={16} />
              <h3>Color Palette</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {colorPalettes.map((palette) => (
                <button
                  key={palette.id}
                  onClick={() => updateConfig({ colorPalette: palette.id })}
                  className={`p-3 rounded-xl border text-left transition-all ${config.colorPalette === palette.id ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <span className="block text-sm font-medium mb-2">{palette.name}</span>
                  <div className="flex rounded-md overflow-hidden h-6 border border-gray-200">
                    <div className="flex-1" style={{ backgroundColor: palette.background }} />
                    <div className="flex-1" style={{ backgroundColor: palette.primary }} />
                    <div className="flex-1" style={{ backgroundColor: palette.accent }} />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              <Type size={16} />
              <h3>Typography</h3>
            </div>
            <div className="space-y-3">
              {typographyPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => updateConfig({ typographyPreset: preset.id })}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${config.typographyPreset === preset.id ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <div>
                    <span className="block text-sm font-medium mb-1">{preset.name}</span>
                    <span className="block text-xs text-gray-500">{preset.displayFont} & {preset.bodyFont}</span>
                  </div>
                  <span className="text-xl font-bold" style={{ fontFamily: preset.displayFont }}>Aa</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 sticky bottom-0 bg-white border-t border-gray-100">
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            <Save size={16} />
            Save & Exit
          </button>
        </div>
      </div>
      
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-[99] backdrop-blur-sm transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
