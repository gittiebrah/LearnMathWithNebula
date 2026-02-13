
import React, { useState, useEffect, useMemo } from 'react';
import { GAMES } from './constants';
import { Game, GameCategory, Theme } from './types';
import GameCard from './components/GameCard';
import NebulaSnakeGame from './components/NebulaSnakeGame';
import NeuralMathMatrix from './components/NeuralMathMatrix';
import GameRequestModal from './components/GameRequestModal';
import SettingsModal from './components/SettingsModal';
import GameIframe from './components/GameIframe';
import LoadingSequence from './components/LoadingSequence';
import InitialWarning from './components/InitialWarning';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | 'ALL' | 'FAVORITES'>('ALL');
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [hasAcceptedWarning, setHasAcceptedWarning] = useState(false);
  
  // Theme State
  const [theme, setTheme] = useState<Theme>(Theme.SCIFI);
  const [showScanlines, setShowScanlines] = useState(true);

  // Load configuration from local storage
  useEffect(() => {
    // Check warning acceptance first
    const warningAccepted = sessionStorage.getItem('nebula_warning_accepted');
    if (warningAccepted === 'true') {
      setHasAcceptedWarning(true);
    }

    const savedTheme = localStorage.getItem('nebula_theme') as Theme;
    if (savedTheme && Object.values(Theme).includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    const savedScanlines = localStorage.getItem('nebula_scanlines');
    if (savedScanlines !== null) {
      setShowScanlines(savedScanlines === 'true');
    }

    const savedFavorites = localStorage.getItem('nebula_arcade_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Failed to load favorites", e);
      }
    }

    const hasBooted = sessionStorage.getItem('nebula_booted');
    if (hasBooted) {
      setIsBooting(false);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('nebula_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleToggleScanlines = (show: boolean) => {
    setShowScanlines(show);
    localStorage.setItem('nebula_scanlines', String(show));
  };

  const handleBootComplete = () => {
    setIsBooting(false);
    sessionStorage.setItem('nebula_booted', 'true');
  };

  const handleAcceptWarning = () => {
    setHasAcceptedWarning(true);
    sessionStorage.setItem('nebula_warning_accepted', 'true');
  };

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

  const handleGameSelect = (game: Game) => {
    setActiveGame(game);
  };

  const closeGame = () => {
    setActiveGame(null);
  };

  const renderInternalGame = (id: string) => {
    switch(id) {
      case 'nebula-snake': return <NebulaSnakeGame />;
      case 'neural-math': return <NeuralMathMatrix />;
      default: return <div className="p-20 text-center uppercase tracking-widest text-red-500">Internal Link Failure: Missing Component</div>;
    }
  };

  const portalName = theme === Theme.STEALTH ? 'Nebula Portal' : 'Nebula Arcade';
  const tagline = theme === Theme.STEALTH 
    ? 'Knowledge archival system for decentralized researchers.' 
    : 'Encrypted bypass established. Accessing decentralized entertainment matrix.';

  return (
    <div className="min-h-screen relative bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      
      {/* 1. Initial Legal Warning - Shown first if not accepted */}
      {!hasAcceptedWarning && <InitialWarning onAccept={handleAcceptWarning} />}

      {/* 2. Loading Sequence - Shown if booting and warning accepted */}
      {isBooting && hasAcceptedWarning && <LoadingSequence onComplete={handleBootComplete} />}

      {/* Background Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_var(--accent-glow)_0%,_transparent_50%)]"></div>
        {showScanlines && <div className="scanline"></div>}
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass-panel border-b border-white/5 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--accent-primary)] rounded flex items-center justify-center font-black text-black text-2xl tracking-tighter transition-all duration-300">
            {theme === Theme.STEALTH ? 'N' : 'N'}
          </div>
          <h1 className="text-xl md:text-2xl font-black font-futuristic tracking-tighter uppercase text-[var(--accent-primary)]">
            {portalName}
          </h1>
        </div>

        <div className="flex-1 max-w-xl w-full">
          <div className="relative group">
            <input 
              type="text" 
              placeholder={theme === Theme.STEALTH ? "Search database..." : "SCAN FOR TITLES OR TAGS..."}
              className="w-full bg-[var(--bg-main)] border border-[var(--border-color)] rounded-full px-5 py-2.5 text-xs focus:outline-none focus:border-[var(--accent-primary)] transition-all font-futuristic tracking-widest placeholder:text-[var(--text-muted)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-4 top-2.5 text-[var(--accent-primary)] opacity-50">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)]">
          <button 
            onClick={() => setSelectedCategory('FAVORITES')}
            className={`hover:text-[var(--accent-primary)] transition-colors uppercase ${selectedCategory === 'FAVORITES' ? 'text-[var(--accent-primary)]' : ''}`}
          >
            Favorites ({favorites.length})
          </button>
          <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className="hover:text-[var(--accent-primary)] transition-colors uppercase flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
            Settings
          </button>
          <button 
            onClick={() => setIsRequestModalOpen(true)}
            className="hover:text-[var(--accent-secondary)] transition-colors uppercase text-[var(--accent-secondary)] opacity-80"
          >
            Request
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        
        {/* Hero Section */}
        <section className="mb-12 relative rounded-2xl overflow-hidden p-8 md:p-16 glass-panel neon-border">
          <div className="absolute top-0 right-0 p-4">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse"></div>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black font-futuristic mb-4 neon-text-cyan leading-tight text-[var(--accent-primary)]">
              {theme === Theme.STEALTH ? 'OPEN ARCHIVE ACCESS' : 'PLAY WITHOUT LIMITS'}
            </h2>
            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-8 font-light italic uppercase tracking-wider">
              {tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setSelectedCategory('ALL')}
                className="bg-[var(--accent-primary)] text-black px-8 py-3 rounded-lg font-bold font-futuristic text-sm hover:opacity-90 transition-all uppercase"
              >
                {theme === Theme.STEALTH ? 'Browse Archive' : 'Explore The Void'}
              </button>
              <button 
                onClick={() => setIsRequestModalOpen(true)}
                className="border border-[var(--accent-secondary)] text-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)]/10 px-8 py-3 rounded-lg font-bold font-futuristic text-sm transition-all uppercase"
              >
                Request Protocol
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
                ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-black shadow-[0_0_15px_var(--accent-glow)]' 
                : 'bg-black/20 border-white/5 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-white/20'
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
              <p className="text-[var(--text-muted)] font-futuristic tracking-widest text-lg uppercase animate-pulse">
                {selectedCategory === 'FAVORITES' 
                  ? "No favorited neural links found..." 
                  : "Zero matching signatures found in the archive..."}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <GameRequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentTheme={theme}
        onThemeChange={handleThemeChange}
        showScanlines={showScanlines}
        onToggleScanlines={handleToggleScanlines}
      />

      {/* Game Play Overlay */}
      {activeGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={closeGame}></div>
          
          <div className="relative w-full max-w-6xl h-full flex flex-col glass-panel rounded-2xl overflow-hidden neon-border shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            {/* Game Header */}
            <div className="p-4 bg-black/40 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <button 
                  onClick={closeGame}
                  className="p-2 text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-futuristic text-[var(--accent-primary)] uppercase tracking-widest">
                  {activeGame.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleFavorite(activeGame.id)}
                  className={`p-2 transition-colors ${favorites.includes(activeGame.id) ? 'text-[var(--accent-secondary)]' : 'text-[var(--text-muted)] hover:text-white'}`}
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
              <div className="flex-1 relative overflow-hidden">
                 {activeGame.url === 'internal' ? (
                   renderInternalGame(activeGame.id)
                 ) : (
                   <GameIframe url={activeGame.url} title={activeGame.title} />
                 )}
              </div>
              <div className="w-full md:w-80 bg-slate-900/20 p-6 flex flex-col gap-6 overflow-y-auto no-scrollbar border-l border-white/5">
                {activeGame.warning && (
                  <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-lg animate-pulse">
                    <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-2">Neural Alert</h4>
                    <p className="text-[10px] text-red-200/60 leading-relaxed italic">{activeGame.warning}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">Briefing</h4>
                  <div className="p-3 bg-black/20 border border-white/5 rounded-lg text-xs text-[var(--text-muted)] leading-relaxed italic">
                    {activeGame.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/20 py-12 px-6 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xs">
             <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[var(--accent-primary)] rounded flex items-center justify-center font-black text-black text-sm">N</div>
              <h2 className="font-futuristic text-[var(--accent-primary)] tracking-tighter uppercase">{portalName}</h2>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed uppercase tracking-wider">
              {theme === Theme.STEALTH ? 'Educational repository version 4.2. Secure connection active.' : 'An independent, decentralized portal for web entertainment.'}
            </p>
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <h5 className="text-[10px] font-bold text-[var(--text-main)] uppercase tracking-widest">Network</h5>
              <button onClick={() => setIsSettingsModalOpen(true)} className="text-[10px] text-left text-[var(--text-muted)] hover:text-[var(--accent-primary)] uppercase">Settings</button>
              <button onClick={() => setIsRequestModalOpen(true)} className="text-[10px] text-left text-[var(--text-muted)] hover:text-[var(--accent-primary)] uppercase">Submit Protocol</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-[9px] text-[var(--text-muted)] flex justify-between uppercase tracking-widest">
          <span>&copy; 2350 Nebula Systems</span>
          <span>Security Clearance: {theme === Theme.STEALTH ? 'UNRESTRICTED' : 'LEVEL 4'}</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
