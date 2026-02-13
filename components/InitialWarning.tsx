
import React from 'react';

interface InitialWarningProps {
  onAccept: () => void;
}

const InitialWarning: React.FC<InitialWarningProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg glass-panel neon-border rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        {/* Header Decor */}
        <div className="p-4 bg-red-950/20 border-b border-red-500/20 flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <h3 className="font-futuristic text-xs tracking-[0.3em] text-red-500 uppercase font-black">
            Operational Notice & Responsibility Disclaimer
          </h3>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-2 border-red-500/30 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          <div className="bg-black/40 p-6 rounded-lg border border-white/5 space-y-4">
            <p className="text-sm text-slate-200 leading-relaxed font-mono text-center">
              "This website is used to enhance student experience while in school hours, innapropriate use of the games provided is not our fault."
            </p>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
            <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest leading-loose">
              By accessing the Nebula Archive, you acknowledge that you are using this platform within the guidelines of your localized educational network protocols.
            </p>
          </div>

          <button 
            onClick={onAccept}
            className="w-full py-4 bg-red-600 text-white font-black font-futuristic text-sm hover:bg-red-500 transition-all rounded-lg uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
          >
            I ACKNOWLEDGE & AGREE
          </button>
        </div>

        <div className="px-6 py-3 bg-black/40 text-[8px] text-slate-600 flex justify-between border-t border-white/5 uppercase tracking-widest font-mono">
          <span>Protocol: USER_ACCEPTANCE_REQUIRED</span>
          <span>Status: PENDING</span>
        </div>
      </div>

      {/* Background HUD elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 text-[60px] font-black text-red-500 font-futuristic">WARNING</div>
        <div className="absolute bottom-10 right-10 text-[60px] font-black text-red-500 font-futuristic">NOTICE</div>
      </div>
    </div>
  );
};

export default InitialWarning;
