
import React, { useState } from 'react';
import { getAIRecommendation } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState('');
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!mood.trim()) return;
    setIsLoading(true);
    const result = await getAIRecommendation(mood);
    setRecommendation(result);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="glass-panel neon-border w-80 p-5 rounded-xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-futuristic text-cyan-400 text-sm flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              NEBULA CORE AI
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white">✕</button>
          </div>
          
          <div className="space-y-4">
            {!recommendation && !isLoading && (
              <p className="text-xs text-slate-400">Identify your current neural state for game protocol selection.</p>
            )}
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="How are you feeling, Pilot?"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-xs focus:border-cyan-500 outline-none"
              />
              <button 
                onClick={handleAsk}
                disabled={isLoading}
                className="absolute right-2 top-2 p-1 text-cyan-500 hover:text-cyan-300"
              >
                {isLoading ? '...' : '→'}
              </button>
            </div>

            {recommendation && (
              <div className="bg-cyan-950/20 border-l-2 border-cyan-500 p-3">
                <p className="text-xs text-cyan-100 italic">"{recommendation}"</p>
                <button 
                  onClick={() => setRecommendation(null)}
                  className="mt-2 text-[10px] text-cyan-500 uppercase font-bold"
                >
                  Reset Core
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:scale-110 transition-transform cursor-pointer"
        >
          <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
