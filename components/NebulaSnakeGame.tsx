
import React, { useEffect, useRef, useState, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 120;

const NebulaSnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  
  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const foodRef = useRef({ x: 5, y: 5 });
  const directionRef = useRef({ x: 0, y: 0 });
  const nextDirectionRef = useRef({ x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number, y: number } | null>(null);

  const generateFood = useCallback((snake: { x: number, y: number }[]) => {
    const tileCount = 20; // 400 / 20
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
      if (!snake.some(s => s.x === newFood!.x && s.y === newFood!.y)) break;
    }
    foodRef.current = newFood;
  }, []);

  const resetGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = { x: 0, y: 0 };
    nextDirectionRef.current = { x: 0, y: 0 };
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    generateFood(snakeRef.current);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        e.preventDefault();
        if (isPaused) setIsPaused(false);
      }
      
      switch (e.key.toLowerCase()) {
        case 'arrowup': case 'w': 
          if (directionRef.current.y !== 1) nextDirectionRef.current = { x: 0, y: -1 }; 
          break;
        case 'arrowdown': case 's': 
          if (directionRef.current.y !== -1) nextDirectionRef.current = { x: 0, y: 1 }; 
          break;
        case 'arrowleft': case 'a': 
          if (directionRef.current.x !== 1) nextDirectionRef.current = { x: -1, y: 0 }; 
          break;
        case 'arrowright': case 'd': 
          if (directionRef.current.x !== -1) nextDirectionRef.current = { x: 1, y: 0 }; 
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      directionRef.current = nextDirectionRef.current;
      const head = { 
        x: snakeRef.current[0].x + directionRef.current.x, 
        y: snakeRef.current[0].y + directionRef.current.y 
      };

      // Collision checks
      const tileCount = canvas.width / GRID_SIZE;
      if (
        head.x < 0 || head.x >= tileCount || 
        head.y < 0 || head.y >= tileCount ||
        snakeRef.current.some(s => s.x === head.x && s.y === head.y)
      ) {
        if (directionRef.current.x !== 0 || directionRef.current.y !== 0) {
          setGameOver(true);
          return;
        }
      }

      if (directionRef.current.x !== 0 || directionRef.current.y !== 0) {
        const newSnake = [head, ...snakeRef.current];
        if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
          setScore(s => s + 10);
          generateFood(newSnake);
        } else {
          newSnake.pop();
        }
        snakeRef.current = newSnake;
      }

      // Render
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.05)';
      for(let i=0; i<=canvas.width; i+=GRID_SIZE) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      // Food
      ctx.fillStyle = '#e879f9';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#e879f9';
      ctx.fillRect(foodRef.current.x * GRID_SIZE + 2, foodRef.current.y * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4);

      // Snake
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#22d3ee';
      snakeRef.current.forEach((segment, i) => {
        ctx.fillStyle = i === 0 ? '#22d3ee' : 'rgba(34, 211, 238, 0.8)';
        ctx.globalAlpha = 1 - (i / snakeRef.current.length) * 0.5;
        ctx.fillRect(segment.x * GRID_SIZE + 1, segment.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2);
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

    }, INITIAL_SPEED);

    return () => clearInterval(interval);
  }, [gameOver, isPaused, generateFood]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 30 && directionRef.current.x !== -1) nextDirectionRef.current = { x: 1, y: 0 };
      else if (dx < -30 && directionRef.current.x !== 1) nextDirectionRef.current = { x: -1, y: 0 };
    } else {
      if (dy > 30 && directionRef.current.y !== -1) nextDirectionRef.current = { x: 0, y: 1 };
      else if (dy < -30 && directionRef.current.y !== 1) nextDirectionRef.current = { x: 0, y: -1 };
    }
    if (isPaused) setIsPaused(false);
    touchStartRef.current = null;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-950 p-4 font-futuristic">
      <div className="flex justify-between w-full max-w-[400px] mb-4 text-xs tracking-widest uppercase">
        <div className="text-cyan-400">Core: <span className="text-white">Active</span></div>
        <div className="text-magenta-400">Data: <span className="text-white">{score}</span></div>
      </div>

      <div className="relative group overflow-hidden rounded-lg neon-border">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={400}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="max-w-full aspect-square bg-slate-900 cursor-crosshair"
        />

        {(gameOver || isPaused) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-20">
            {gameOver ? (
              <>
                <h3 className="text-2xl text-red-500 mb-2 font-black">TERMINAL HALT</h3>
                <p className="text-[10px] text-slate-400 mb-6 italic uppercase">Neural link severed</p>
                <button 
                  onClick={resetGame}
                  className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all uppercase text-sm"
                >
                  Reboot System
                </button>
              </>
            ) : (
              <>
                <h3 className="text-2xl text-cyan-400 mb-4 font-black">READY PLAYER</h3>
                <p className="text-[10px] text-slate-400 mb-6 text-center max-w-[200px] uppercase">
                  Use WASD or Swipe to begin data harvest
                </p>
                <button 
                  onClick={() => setIsPaused(false)}
                  className="px-6 py-2 border border-cyan-500 text-cyan-500 font-bold rounded-lg hover:bg-cyan-500 hover:text-black transition-all uppercase text-sm"
                >
                  Initialize
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 md:hidden text-[10px] text-slate-500 uppercase tracking-widest animate-pulse">
        Swipe to navigate the slipstream
      </div>
    </div>
  );
};

export default NebulaSnakeGame;
