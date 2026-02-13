
import React, { useState } from 'react';

interface GameRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GameRequestModal: React.FC<GameRequestModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'FORM' | 'TRANSMITTING' | 'SUCCESS'>('FORM');
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('TRANSMITTING');

    // Artificial delay to simulate "uplink"
    setTimeout(() => {
      setStep('SUCCESS');
    }, 1500);
  };

  const reset = () => {
    setTitle('');
    setSource('');
    setReason('');
    setStep('FORM');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg glass-panel neon-border rounded-xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 bg-slate-900/80 border-b border-cyan-500/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-magenta-500 animate-pulse rounded-full"></div>
            <h3 className="font-futuristic text-xs tracking-[0.2em] text-cyan-400 uppercase">Transmission Uplink</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">✕</button>
        </div>

        <div className="p-6">
          {step === 'FORM' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-4">
                Suggest new neural links for the Nebula Archive.
              </p>
              
              <div>
                <label className="block text-[9px] text-cyan-500/70 uppercase mb-1 tracking-widest">Protocol Designation (Game Title)</label>
                <input 
                  required
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded p-2.5 text-xs text-white focus:border-cyan-500 outline-none transition-all"
                  placeholder="e.g., COSMIC DRIFTER"
                />
              </div>

              <div>
                <label className="block text-[9px] text-cyan-500/70 uppercase mb-1 tracking-widest">Source Coordinates (URL/Info)</label>
                <input 
                  type="text" 
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded p-2.5 text-xs text-white focus:border-cyan-500 outline-none transition-all"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-[9px] text-cyan-500/70 uppercase mb-1 tracking-widest">Tactical Brief (Reason)</label>
                <textarea 
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded p-2.5 text-xs text-white focus:border-cyan-500 outline-none transition-all h-24 resize-none"
                  placeholder="Why should this be added?"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-cyan-500 text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              >
                Initiate Transmission
              </button>
            </form>
          )}

          {step === 'TRANSMITTING' && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-6"></div>
              <h4 className="font-futuristic text-cyan-400 text-sm animate-pulse">ENCRYPTING DATA...</h4>
              <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Bypassing firewalls</p>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="py-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500 flex items-center justify-center rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-futuristic text-white text-sm mb-2 uppercase">Transmission Successful</h4>
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                  <p className="text-xs text-cyan-100 italic leading-relaxed">
                    Data packets successfully integrated into the uplink queue. High-priority archival processing initiated. Sector coordinates confirmed.
                  </p>
                </div>
              </div>
              <button 
                onClick={reset}
                className="px-8 py-2 border border-slate-700 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 text-[10px] uppercase font-bold transition-all"
              >
                Return to Terminal
              </button>
            </div>
          )}
        </div>
        
        {/* Footer info decoration */}
        <div className="px-6 py-3 bg-slate-900/30 text-[8px] text-slate-600 flex justify-between border-t border-white/5 uppercase tracking-widest">
          <span>Encrypted: AES-256</span>
          <span>Node: Sector 7G</span>
        </div>
      </div>
    </div>
  );
};

export default GameRequestModal;
