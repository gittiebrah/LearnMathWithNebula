
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      onClick={() => onSelect(game)}
      className="group relative cursor-pointer glass-panel rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_var(--accent-glow)] neon-border"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute top-2 right-2 p-1.5 rounded-full glass-panel border border-white/10 transition-all z-20 ${isFavorite ? 'text-[var(--accent-secondary)] shadow-[0_0_10px_var(--accent-secondary)]' : 'text-slate-400 hover:text-white'}`}
        >
          <svg className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <div className="absolute top-2 left-2 bg-[var(--accent-primary)] px-2 py-0.5 rounded text-[10px] font-bold text-black uppercase tracking-widest">
          {game.category}
        </div>

        {game.warning && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-red-600/90 text-[8px] font-black text-white px-2 py-0.5 rounded animate-pulse uppercase tracking-tighter">
            Risk
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-[var(--accent-primary)] group-hover:opacity-80 transition-opacity tracking-wide font-futuristic uppercase">
          {game.title}
        </h3>
        <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2 h-8 leading-relaxed uppercase italic">
          {game.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-1">
            <span className="text-amber-400 text-xs">★</span>
            <span className="text-xs font-bold text-[var(--text-main)]">{game.rating}</span>
          </div>
          <div className="flex gap-1">
            {game.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[9px] border border-white/10 px-1.5 py-0.5 rounded-full text-[var(--text-muted)] uppercase tracking-tighter">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--accent-primary)] opacity-0 group-hover:opacity-50 transition-all"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--accent-primary)] opacity-0 group-hover:opacity-50 transition-all"></div>
    </div>
  );
};

export default GameCard;
