
import React, { useState, useEffect } from 'react';

interface GameIframeProps {
  url: string;
  title: string;
}

const GameIframe: React.FC<GameIframeProps> = ({ url, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when the URL changes
  useEffect(() => {
    setIsLoading(true);
  }, [url]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden group">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950">
          <div className="relative">
            {/* Dual Spinning Rings */}
            <div className="w-20 h-20 border-4 border-cyan-500/10 border-t-cyan-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-magenta-500/10 border-b-magenta-500 rounded-full animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_#fff]"></div>
            </div>
          </div>
          
          <div className="mt-8 text-center space-y-3">
            <h3 className="font-futuristic text-cyan-400 text-sm tracking-[0.4em] animate-pulse uppercase">
              Establishing Neural Link
            </h3>
            <div className="flex flex-col gap-1">
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-mono">
                Bypassing Local Archive Firewalls...
              </p>
              <div className="w-48 h-1 bg-slate-900 mx-auto rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-cyan-500/50 w-full animate-[loading-bar_2s_infinite]"></div>
              </div>
            </div>
          </div>
          
          {/* Aesthetic HUD elements */}
          <div className="absolute top-6 left-6 flex flex-col gap-1">
            <div className="w-12 h-1 bg-cyan-500/20"></div>
            <div className="w-8 h-1 bg-cyan-500/10"></div>
          </div>
          <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1">
            <div className="w-8 h-1 bg-magenta-500/10"></div>
            <div className="w-12 h-1 bg-magenta-500/20"></div>
          </div>
        </div>
      )}
      
      {/* The Game Iframe */}
      <iframe
        src={url}
        title={title}
        className={`w-full h-full border-none transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        allow="autoplay; fullscreen; keyboard; gamepad"
        sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin"
      />
      
      {/* CRT Scanline / Noise Overlay for Immersion */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] z-10"></div>

      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default GameIframe;
