
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
        Sudoku Spark
      </h1>
      <p className="text-slate-400 mt-2">A Modern Twist on a Classic Puzzle</p>
    </header>
  );
};

export default Header;
