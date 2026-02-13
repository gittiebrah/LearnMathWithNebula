
import React, { useState, useEffect, useMemo } from 'react';
import { GAMES } from './constants';
import { Game, GameCategory } from './types';
import GameCard from './components/GameCard';
import AIAssistant from './components/AIAssistant';
import NebulaSnakeGame from './components/NebulaSnakeGame';
import NeuralMathMatrix from './components/NeuralMathMatrix';
import { getGameInsight } from './services/geminiService';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'ALL' | 'FAVORITES'>('ALL');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [gameLore, setGameLore] = useState<string | null>(null);
  const [isLoreLoading, setIsLoreLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nebula_arcade_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load favorites", e);
      }
    }
  }, []);

  // Save favorites to local storage on change
  useEffect(() => {
    localStorage.setItem('nebula_arcade_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (gameId: string) => {
    setFavorites(prev => 
      prev.includes(gameId) 
        ? prev.filter(id => id !== gameId) 
        : [...prev, gameId]
    );
  };

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (selectedCategory === 'FAVORITES') {
        return matchesSearch && favorites.includes(game.id);
      }
      
      const matchesCategory = selectedCategory === 'ALL' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, favorites]);

  const handleGameSelect = async (game: Game) => {
    setActiveGame(game);
    setGameLore(null);
    setIsLoreLoading(true);
    const insight = await getGameInsight(game.title);
    setGameLore(insight);
    setIsLoreLoading(false);
  };

  const closeGame = () => {
    setActiveGame(null);
    setGameLore(null);
  };

  const renderInternalGame = (id: string) => {
    switch(id) {
      case 'nebula-snake': return <NebulaSnakeGame />;
      case 'neural-math': return <NeuralMathMatrix />;
      default: return <div className="p-20 text-center uppercase tracking-widest text-red-500">Internal Link Failure: Missing Component</div>;
    }
  };

  return (
    <div className="min-h-screen relative bg-slate-950 text-slate-200">
      {/* Background Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#1e293b_0%,_transparent_50%)]"></div>
        <div className="scanline"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass-panel border-b border-cyan-500/20 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 rounded flex items-center justify-center font-black text-black text-2xl tracking-tighter">
            N
          </div>
          <h1 className="text-xl md:text-2xl font-black font-futuristic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 uppercase">
            Nebula Arcade
          </h1>
        </div>

        <div className="flex-1 max-w-xl w-full">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="SCAN FOR TITLES OR TAGS..."
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-full px-5 py-2.5 text-xs focus:outline-none focus:border-cyan-500 transition-all font-futuristic tracking-widest placeholder:text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-4 top-2.5 text-cyan-500/50">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest uppercase text-slate-500">
          <button 
            onClick={() => setSelectedCategory('FAVORITES')}
            className={`hover:text-cyan-400 transition-colors uppercase ${selectedCategory === 'FAVORITES' ? 'text-cyan-400' : ''}`}
          >
            Favorites ({favorites.length})
          </button>
          <a href="#" className="hover:text-cyan-400 transition-colors">Terminals</a>
          <div className="px-3 py-1 border border-cyan-500/30 rounded text-cyan-400 hidden sm:block">
            System Online
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        
        {/* Hero Section */}
        <section className="mb-12 relative rounded-2xl overflow-hidden p-8 md:p-16 glass-panel neon-border">
          <div className="absolute top-0 right-0 p-4">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]"></div>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black font-futuristic mb-4 neon-text-cyan leading-tight">
              PLAY WITHOUT <br/>LIMITS
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-light italic">
              Encrypted bypass established. Accessing decentralized entertainment matrix. 
              Zero-latency gaming from the edge of the galaxy.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setSelectedCategory('ALL')}
                className="bg-cyan-500 text-black px-8 py-3 rounded-lg font-bold font-futuristic text-sm hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all uppercase"
              >
                Explore The Void
              </button>
              <button 
                onClick={() => setSelectedCategory('FAVORITES')}
                className="border border-magenta-500/50 text-magenta-400 hover:border-magenta-500 px-8 py-3 rounded-lg font-bold font-futuristic text-sm transition-all uppercase"
              >
                My Favorites
              </button>
            </div>
          </div>
        </section>

        {/* Categories */}
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-4 no-scrollbar">
          {['ALL', 'FAVORITES', ...Object.values(GameCategory)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold font-futuristic uppercase tracking-tighter whitespace-nowrap transition-all border ${
                selectedCategory === cat 
                ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.length > 0 ? (
            filteredGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onSelect={handleGameSelect} 
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={() => toggleFavorite(game.id)}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-slate-500 font-futuristic tracking-widest text-lg uppercase animate-pulse">
                {selectedCategory === 'FAVORITES' 
                  ? "No favorited neural links found..." 
                  : "Zero matching signatures found in the archive..."}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Game Play Overlay */}
      {activeGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={closeGame}></div>
          
          <div className="relative w-full max-w-6xl h-full flex flex-col glass-panel rounded-2xl overflow-hidden neon-border shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            {/* Game Header */}
            <div className="p-4 bg-slate-900/50 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-4">
                <button 
                  onClick={closeGame}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-futuristic text-cyan-400 uppercase tracking-widest">
                  {activeGame.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleFavorite(activeGame.id)}
                  className={`p-2 transition-colors ${favorites.includes(activeGame.id) ? 'text-magenta-500' : 'text-slate-400 hover:text-white'}`}
                >
                   <svg className="w-6 h-6" fill={favorites.includes(activeGame.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button 
                  onClick={closeGame}
                  className="bg-red-500/20 text-red-400 px-4 py-1 rounded text-xs font-bold font-futuristic hover:bg-red-500/40 transition-all uppercase"
                >
                  Exit Core
                </button>
              </div>
            </div>

            {/* Game Content */}
            <div className="flex-1 flex flex-col md:flex-row bg-black overflow-hidden">
              {/* Game Renderer */}
              <div className="flex-1 relative overflow-hidden">
                 {activeGame.url === 'internal' ? (
                   renderInternalGame(activeGame.id)
                 ) : (
                   <iframe 
                    src={activeGame.url} 
                    className="w-full h-full border-none"
                    title={activeGame.title}
                  />
                 )}
              </div>

              {/* Sidebar Stats */}
              <div className="w-full md:w-80 bg-slate-900/50 p-6 flex flex-col gap-6 overflow-y-auto no-scrollbar">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Lore Analysis</h4>
                  <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-lg">
                    {isLoreLoading ? (
                      <div className="flex flex-col gap-2">
                        <div className="h-2 w-full bg-slate-800 rounded animate-pulse"></div>
                        <div className="h-2 w-3/4 bg-slate-800 rounded animate-pulse"></div>
                      </div>
                    ) : (
                      <p className="text-xs text-cyan-100 italic leading-relaxed">
                        {gameLore || "Retrieving local data signatures..."}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Technical Specs</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500 uppercase">Source</span>
                      <span className="text-green-500">Local Archive</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500 uppercase">Uptime</span>
                      <span className="text-cyan-400">99.9%</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500 uppercase">Players</span>
                      <span className="text-slate-300">1.2K Online</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                   <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Controls</h4>
                   <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-950 p-2 rounded text-[9px] border border-slate-800 text-center">INPUT VALUE</div>
                      <div className="bg-slate-950 p-2 rounded text-[9px] border border-slate-800 text-center">AUTO-VERIFY</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Sidekick */}
      <AIAssistant />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xs">
             <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center font-black text-black text-sm">N</div>
              <h2 className="font-futuristic text-cyan-400 tracking-tighter">NEBULA ARCADE</h2>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
              An independent, decentralized portal for web entertainment. 
              Circumventing filters since the collapse of the central cloud.
            </p>
          </div>
          
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <h5 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Network</h5>
              <a href="#" className="text-[10px] text-slate-500 hover:text-cyan-400 uppercase">Mainframe</a>
              <a href="#" className="text-[10px] text-slate-500 hover:text-cyan-400 uppercase">Terminals</a>
              <a href="#" className="text-[10px] text-slate-500 hover:text-cyan-400 uppercase">Protocols</a>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Support</h5>
              <a href="#" className="text-[10px] text-slate-500 hover:text-cyan-400 uppercase">Comms</a>
              <a href="#" className="text-[10px] text-slate-500 hover:text-cyan-400 uppercase">Encrypted</a>
              <a href="#" className="text-[10px] text-slate-500 hover:text-cyan-400 uppercase">FAQ</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 text-[9px] text-slate-600 flex justify-between uppercase tracking-widest">
          <span>&copy; 2350 Nebula Systems</span>
          <span>Security Clearance: LEVEL 4</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
