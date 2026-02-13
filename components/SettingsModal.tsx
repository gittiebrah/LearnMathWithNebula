
import React from 'react';
import { Theme } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  showScanlines: boolean;
  onToggleScanlines: (show: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  currentTheme, 
  onThemeChange,
  showScanlines,
  onToggleScanlines
}) => {
  if (!isOpen) return null;

  const themes = [
    { 
      id: Theme.SCIFI, 
      name: 'NEBULA (ORIGINAL)', 
      description: 'The standard encrypted arcade protocol.', 
      colors: ['bg-[#020617]', 'bg-[#22d3ee]', 'bg-[#e879f9]']
    },
    { 
      id: Theme.STEALTH, 
      name: 'STEALTH (MINIMAL)', 
      description: 'Educational database skin. Use in restricted zones.', 
      colors: ['bg-white', 'bg-blue-600', 'bg-slate-400']
    },
    { 
      id: Theme.CYBERPUNK, 
      name: 'OVERDRIVE (PUNK)', 
      description: 'High contrast neural synchronization.', 
      colors: ['bg-black', 'bg-yellow-400', 'bg-rose-500']
    }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg glass-panel neon-border rounded-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-4 bg-slate-900/50 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="font-futuristic text-xs tracking-[0.2em] text-[var(--accent-primary)] uppercase">System Configuration</h3>
          </div>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-white transition-colors">✕</button>
        </div>

        <div className="p-6 space-y-8">
          {/* Theme Selector */}
          <div>
            <label className="block text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4">Interface Protocol</label>
            <div className="space-y-3">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between group ${
                    currentTheme === t.id 
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-glow)]' 
                    : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {t.colors.map((c, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full ${c} border border-white/20`}></div>
                      ))}
                    </div>
                    <div>
                      <div className={`text-[11px] font-bold uppercase tracking-wider ${currentTheme === t.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-main)]'}`}>
                        {t.name}
                      </div>
                      <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-tighter mt-0.5">
                        {t.description}
                      </div>
                    </div>
                  </div>
                  {currentTheme === t.id && (
                    <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-main)]">Visual Noise</div>
                <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-tighter">Toggle holographic scanline overlay.</div>
              </div>
              <button 
                onClick={() => onToggleScanlines(!showScanlines)}
                className={`w-10 h-5 rounded-full transition-all relative ${showScanlines ? 'bg-[var(--accent-primary)]' : 'bg-slate-800'}`}
              >
                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${showScanlines ? 'left-6' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-black/20 text-[8px] text-[var(--text-muted)] flex justify-between uppercase tracking-[0.3em]">
          <span>Revision 4.2.0</span>
          <span>Security Protocol Active</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
