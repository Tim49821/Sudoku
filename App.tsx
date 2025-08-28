import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import BoardComponent from './components/Board';
import Controls from './components/Controls';
import { generateSudoku, validateBoard } from './services/sudokuService';
import { Board, Difficulty } from './types';

const App: React.FC = () => {
  const [initialPuzzle, setInitialPuzzle] = useState<Board | null>(null);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [solution, setSolution] = useState<Board | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleNewGame = useCallback(() => {
    setIsLoading(true);
    setIsSolved(false);
    setSelectedCell(null);
    setTimeout(() => {
        const { puzzle, solution: newSolution } = generateSudoku(difficulty);
        setInitialPuzzle(JSON.parse(JSON.stringify(puzzle)));
        setCurrentBoard(puzzle);
        setSolution(newSolution);
        setIsLoading(false);
    }, 200);
  }, [difficulty]);

  useEffect(() => {
    handleNewGame();
  }, [handleNewGame]);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleInputChange = (row: number, col: number, value: number | null) => {
    if (currentBoard && !currentBoard[row][col].isReadOnly) {
      const newBoard = JSON.parse(JSON.stringify(currentBoard));
      const numValue = value === null || isNaN(value) ? null : (Math.max(1, Math.min(9, value)) as (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9));
      newBoard[row][col].value = numValue;
      newBoard[row][col].hasError = false;
      setCurrentBoard(newBoard);
    }
  };
  
  const handleNumberPadClick = (num: number | null) => {
    if (selectedCell && currentBoard) {
        handleInputChange(selectedCell.row, selectedCell.col, num);
    }
  };


  const handleCheck = () => {
    if (currentBoard && solution) {
      const { updatedBoard, isSolved: solvedStatus } = validateBoard(currentBoard, solution);
      setCurrentBoard(updatedBoard);
      setIsSolved(solvedStatus);
    }
  };

  const handleReset = () => {
    if (initialPuzzle) {
      setCurrentBoard(JSON.parse(JSON.stringify(initialPuzzle)));
      setIsSolved(false);
      setSelectedCell(null);
    }
  };
  
  const handleDifficultyChange = (newDifficulty: Difficulty) => {
      setDifficulty(newDifficulty);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 text-white selection:bg-sky-500 selection:text-white">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-slate-800 bg-opacity-70 flex items-center justify-center z-10 rounded-lg">
                <p className="text-xl font-semibold">Generating new puzzle...</p>
              </div>
            )}
            <BoardComponent
              board={currentBoard}
              selectedCell={selectedCell}
              onCellClick={handleCellClick}
              onInputChange={handleInputChange}
            />
          </div>
          <Controls 
            onNewGame={handleNewGame}
            onReset={handleReset}
            onCheck={handleCheck}
            onNumberPadClick={handleNumberPadClick}
            currentDifficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
          />
        </main>
        {isSolved && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setIsSolved(false)}>
                <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-sky-500 text-center">
                    <h2 className="text-4xl font-bold text-sky-400 mb-4">Congratulations!</h2>
                    <p className="text-lg text-slate-300 mb-6">You have successfully solved the puzzle.</p>
                    <button 
                        onClick={handleNewGame}
                        className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default App;