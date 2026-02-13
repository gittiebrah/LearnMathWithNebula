
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(game)}
      className="group relative cursor-pointer glass-panel rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] neon-border"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        <div className="absolute top-2 left-2 bg-cyan-500/80 px-2 py-0.5 rounded text-[10px] font-bold text-black uppercase tracking-widest">
          {game.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors tracking-wide font-futuristic uppercase">
          {game.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 h-8 leading-relaxed">
          {game.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-1">
            <span className="text-amber-400 text-xs">★</span>
            <span className="text-xs font-bold text-slate-300">{game.rating}</span>
          </div>
          <div className="flex gap-1">
            {game.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[9px] border border-slate-700 px-1.5 py-0.5 rounded-full text-slate-500 uppercase">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all"></div>
    </div>
  );
};

export default GameCard;
