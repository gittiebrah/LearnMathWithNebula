
import React, { useState, useEffect, useCallback, useRef } from 'react';

type Difficulty = 'CADET' | 'PILOT' | 'COMMANDER';
type Operation = 'ADD' | 'SUB' | 'MUL' | 'MIXED';

interface Problem {
  num1: number;
  num2: number;
  op: string;
  answer: number;
}

const NeuralMathMatrix: React.FC = () => {
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'OVER'>('START');
  const [difficulty, setDifficulty] = useState<Difficulty>('CADET');
  const [operation, setOperation] = useState<Operation>('ADD');
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<'CORRECT' | 'WRONG' | null>(null);
  
  const timerRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateProblem = useCallback(() => {
    let n1 = 0, n2 = 0, opStr = '+', ans = 0;
    const max = difficulty === 'CADET' ? 10 : difficulty === 'PILOT' ? 50 : 100;
    
    let currentOp = operation;
    if (operation === 'MIXED') {
      const ops: Operation[] = ['ADD', 'SUB', 'MUL'];
      currentOp = ops[Math.floor(Math.random() * 3)];
    }

    switch (currentOp) {
      case 'ADD':
        n1 = Math.floor(Math.random() * max) + 1;
        n2 = Math.floor(Math.random() * max) + 1;
        opStr = '+';
        ans = n1 + n2;
        break;
      case 'SUB':
        n1 = Math.floor(Math.random() * max) + 1;
        n2 = Math.floor(Math.random() * n1) + 1;
        opStr = '-';
        ans = n1 - n2;
        break;
      case 'MUL':
        const mulMax = difficulty === 'CADET' ? 5 : difficulty === 'PILOT' ? 12 : 20;
        n1 = Math.floor(Math.random() * mulMax) + 1;
        n2 = Math.floor(Math.random() * mulMax) + 1;
        opStr = '×';
        ans = n1 * n2;
        break;
    }

    setCurrentProblem({ num1: n1, num2: n2, op: opStr, answer: ans });
    setUserInput('');
    setFeedback(null);
  }, [difficulty, operation]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState('PLAYING');
    generateProblem();
  };

  useEffect(() => {
    if (gameState === 'PLAYING' && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('OVER');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      inputRef.current?.focus();
    }
  }, [gameState]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserInput(val);

    if (currentProblem && parseInt(val) === currentProblem.answer) {
      setScore(prev => prev + (difficulty === 'CADET' ? 10 : difficulty === 'PILOT' ? 25 : 50));
      setFeedback('CORRECT');
      setTimeout(generateProblem, 200);
    } else if (currentProblem && val.length >= currentProblem.answer.toString().length && parseInt(val) !== currentProblem.answer) {
       // Optional: auto-clear if wrong and same length, but better to let user correct
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-950 p-6 font-futuristic text-cyan-400">
      <div className="max-w-md w-full glass-panel neon-border p-8 rounded-2xl relative overflow-hidden">
        {/* Animated Background Pulse */}
        <div className={`absolute inset-0 opacity-10 transition-colors duration-500 ${feedback === 'CORRECT' ? 'bg-green-500' : feedback === 'WRONG' ? 'bg-red-500' : 'bg-transparent'}`}></div>

        {gameState === 'START' && (
          <div className="text-center space-y-6 relative z-10">
            <h2 className="text-3xl font-black neon-text-cyan">NEURAL CALIBRATION</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest italic">Initialize processing units</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-slate-500 mb-2 uppercase">Protocol Level</p>
                <div className="flex justify-center gap-2">
                  {(['CADET', 'PILOT', 'COMMANDER'] as Difficulty[]).map(d => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`px-3 py-1 text-[10px] border rounded transition-all ${difficulty === d ? 'bg-cyan-500 text-black border-cyan-400' : 'border-slate-800 text-slate-500'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 mb-2 uppercase">Operation Type</p>
                <div className="flex justify-center gap-2">
                  {(['ADD', 'SUB', 'MUL', 'MIXED'] as Operation[]).map(op => (
                    <button
                      key={op}
                      onClick={() => setOperation(op)}
                      className={`px-3 py-1 text-[10px] border rounded transition-all ${operation === op ? 'bg-magenta-500 text-black border-magenta-400 shadow-[0_0_10px_rgba(232,121,249,0.4)]' : 'border-slate-800 text-slate-500'}`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="w-full py-4 bg-cyan-500 text-black font-black uppercase tracking-tighter hover:bg-white transition-all rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Initialize Link
            </button>
          </div>
        )}

        {gameState === 'PLAYING' && currentProblem && (
          <div className="text-center space-y-8 relative z-10">
            <div className="flex justify-between items-center text-[10px] tracking-widest">
              <div className="text-magenta-400">SYNC SCORE: {score}</div>
              <div className={`${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                TIME REMAINING: {timeLeft}S
              </div>
            </div>

            <div className="py-12 flex flex-col items-center justify-center">
              <div className="text-6xl font-black flex items-center gap-6 mb-8">
                <span className="opacity-50 text-4xl">{currentProblem.num1}</span>
                <span className="text-magenta-500">{currentProblem.op}</span>
                <span className="opacity-50 text-4xl">{currentProblem.num2}</span>
              </div>

              <div className="relative">
                <input
                  ref={inputRef}
                  type="number"
                  value={userInput}
                  onChange={handleInput}
                  className="bg-transparent border-b-2 border-cyan-500/50 w-32 text-center text-4xl font-black focus:outline-none focus:border-cyan-400 transition-all placeholder:opacity-20"
                  placeholder="???"
                />
                <div className="absolute -bottom-6 left-0 right-0 text-[8px] text-slate-600 uppercase tracking-widest">
                  Awaiting Input Signal
                </div>
              </div>
            </div>

            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-cyan-500 transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {gameState === 'OVER' && (
          <div className="text-center space-y-6 relative z-10">
            <h2 className="text-3xl font-black text-red-500">SYNC COMPLETE</h2>
            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase mb-1">Neural Efficiency</p>
              <p className="text-5xl font-black text-white">{score}</p>
              <p className="text-[10px] text-cyan-400 mt-2 uppercase tracking-widest italic">
                {score > 500 ? 'Commander Class Efficiency' : score > 200 ? 'Pilot Class Efficiency' : 'Cadet Class Efficiency'}
              </p>
            </div>
            
            <button 
              onClick={startGame}
              className="w-full py-4 bg-cyan-500 text-black font-black uppercase rounded-lg hover:bg-white transition-all"
            >
              Re-Calibrate
            </button>
            <button 
              onClick={() => setGameState('START')}
              className="text-[10px] text-slate-500 uppercase hover:text-white transition-colors"
            >
              Access Terminal Settings
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 text-[9px] text-slate-700 uppercase tracking-[0.3em] font-light max-w-xs text-center leading-relaxed">
        Mathematics is the universal language of the stars. Calibrate carefully, pilot.
      </div>
    </div>
  );
};

export default NeuralMathMatrix;
