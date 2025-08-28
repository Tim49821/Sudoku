
import React from 'react';
import { Difficulty } from '../types';

interface ControlsProps {
  onNewGame: () => void;
  onReset: () => void;
  onCheck: () => void;
  onNumberPadClick: (num: number | null) => void;
  currentDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const Button: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-3 bg-slate-700 text-slate-200 font-semibold rounded-lg hover:bg-slate-600 active:bg-slate-500 transition-all duration-200 shadow-md ${className}`}
  >
    {children}
  </button>
);

const NumberButton: React.FC<{ onClick: () => void; children: React.ReactNode; }> = ({ onClick, children }) => (
    <button onClick={onClick} className="aspect-square flex items-center justify-center text-2xl font-bold bg-slate-800 rounded-md hover:bg-sky-700 transition-colors duration-200">
        {children}
    </button>
);

const Controls: React.FC<ControlsProps> = ({ onNewGame, onReset, onCheck, onNumberPadClick, currentDifficulty, onDifficultyChange }) => {
  return (
    <div className="w-full max-w-[324px] md:w-auto md:max-w-none flex flex-col gap-4">
      <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
        <label htmlFor="difficulty" className="block text-sm font-medium text-slate-400 mb-2">Difficulty</label>
        <select
          id="difficulty"
          value={currentDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
          className="w-full p-2 bg-slate-700 text-white rounded-md border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:outline-none"
        >
          {Object.values(Difficulty).map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={onNewGame}>New Game</Button>
        <Button onClick={onReset}>Reset</Button>
        <Button onClick={onCheck} className="col-span-2 bg-sky-600 hover:bg-sky-500 active:bg-sky-400">
          Check Solution
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-slate-800 rounded-lg shadow-lg">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <NumberButton key={num} onClick={() => onNumberPadClick(num)}>{num}</NumberButton>
        ))}
         <div className="col-span-3">
            <Button onClick={() => onNumberPadClick(null)} className="bg-red-800 hover:bg-red-700">Clear</Button>
         </div>
      </div>
    </div>
  );
};

export default Controls;
