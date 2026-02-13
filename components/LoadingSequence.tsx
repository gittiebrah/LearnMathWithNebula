
import React, { useState, useEffect } from 'react';

const BOOT_LOGS = [
  "INITIALIZING NEBULA_OS v4.2.0...",
  "CHECKING NEURAL LINK INTEGRITY...",
  "BYPASSING LOCAL ARCHIVE FIREWALLS...",
  "DECRYPTING SECTOR 7G ASSETS...",
  "ESTABLISHING SECURE HANDSHAKE...",
  "CALIBRATING KINETIC SIMULATORS...",
  "LOADING DECENTRALIZED DATA PACKETS...",
  "SYNCING WITH CORE MAIN FRAME...",
  "AUTHORIZING CLEARANCE LEVEL 4...",
  "BOOT SEQUENCE COMPLETE."
];

interface LoadingSequenceProps {
  onComplete: () => void;
}

const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Simulated Progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random increments for a more "real" feel
        const inc = Math.random() > 0.8 ? 5 : 1.5;
        return Math.min(prev + inc, 100);
      });
    }, 50);

    // Simulated Logs
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 350);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsFinishing(true);
        setTimeout(onComplete, 800); // Wait for fade-out
      }, 500);
    }
  }, [progress, onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6 transition-all duration-700 ${isFinishing ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
      {/* Background Grid & Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="scanline"></div>
      </div>

      <div className="max-w-xl w-full space-y-8 relative">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-black font-futuristic text-white tracking-tighter neon-text-cyan flex items-center justify-center gap-4">
            <span className="w-12 h-12 bg-cyan-500 text-black flex items-center justify-center rounded">N</span>
            NEBULA SYSTEMS
          </h1>
          <p className="text-[10px] text-cyan-500/50 uppercase tracking-[0.5em] font-bold">
            Decentralized Arcade Protocol
          </p>
        </div>

        {/* Progress Display */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Uplink Status</span>
              <div className="text-xs font-mono text-cyan-400">
                {progress < 100 ? `RETR_PKT_${Math.floor(progress * 1234)}.bin` : 'SECURE_LINK_ESTABLISHED'}
              </div>
            </div>
            <div className="text-2xl font-black font-futuristic text-white">
              {Math.floor(progress)}%
            </div>
          </div>
          
          <div className="h-2 w-full bg-slate-900 rounded-full border border-slate-800 p-0.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-200 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Neural Logs */}
        <div className="h-32 bg-slate-900/50 rounded border border-slate-800/50 p-4 font-mono text-[9px] overflow-hidden relative">
          <div className="absolute top-0 right-0 p-2 opacity-30">
            <div className="w-1 h-1 bg-cyan-500 rounded-full animate-ping"></div>
          </div>
          <div className="space-y-1">
            {logs.slice(-6).map((log, idx) => (
              <div key={idx} className={`${idx === logs.slice(-6).length - 1 ? 'text-cyan-400' : 'text-slate-600'}`}>
                <span className="mr-2 opacity-30">[{new Date().toLocaleTimeString()}]</span>
                {log}
                {idx === logs.slice(-6).length - 1 && progress < 100 && <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-1 animate-pulse"></span>}
              </div>
            ))}
          </div>
        </div>

        {/* Security Info Decor */}
        <div className="flex justify-between items-center text-[8px] text-slate-600 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500/50 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
            Node: SECTOR_7G_EUROPA
          </div>
          <div>AES-256 Encrypted</div>
          <div>Clearance: LEVEL_4</div>
        </div>
      </div>

      {/* Corners Decoration */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-cyan-500/20"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-magenta-500/20"></div>
    </div>
  );
};

export default LoadingSequence;
