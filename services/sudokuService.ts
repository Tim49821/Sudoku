
import { Board, CellData, CellValue, Difficulty } from '../types';

const SIZE = 9;

// A pre-solved Sudoku board to act as a base
const baseSolution: number[][] = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const createShuffledBoard = (): number[][] => {
  let board = JSON.parse(JSON.stringify(baseSolution));
  const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const map = new Map<number, number>();
  for (let i = 1; i <= SIZE; i++) {
    map.set(i, nums[i - 1]);
  }

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      board[r][c] = map.get(board[r][c]);
    }
  }

  return board;
};


const getDifficultyLevel = (difficulty: Difficulty): number => {
    switch (difficulty) {
        case Difficulty.EASY:
            return 40;
        case Difficulty.MEDIUM:
            return 50;
        case Difficulty.HARD:
            return 60;
        default:
            return 40;
    }
}

export const generateSudoku = (difficulty: Difficulty): { puzzle: Board; solution: Board } => {
  const solvedBoardNumbers = createShuffledBoard();
  
  const solution: Board = solvedBoardNumbers.map(row => 
    row.map(num => ({
      value: num as CellValue,
      isReadOnly: false,
      hasError: false
    }))
  );

  const puzzle: Board = JSON.parse(JSON.stringify(solution));
  
  let cellsToRemove = getDifficultyLevel(difficulty);
  let attempts = 0;
  
  while (cellsToRemove > 0 && attempts < 1000) {
    const row = Math.floor(Math.random() * SIZE);
    const col = Math.floor(Math.random() * SIZE);
    
    if (puzzle[row][col].value !== null) {
      puzzle[row][col].value = null;
      puzzle[row][col].isReadOnly = false;
      cellsToRemove--;
    }
    attempts++;
  }

  for(let r=0; r<SIZE; r++){
    for(let c=0; c<SIZE; c++){
        if(puzzle[r][c].value !== null){
            puzzle[r][c].isReadOnly = true;
        }
    }
  }

  return { puzzle, solution };
};

export const validateBoard = (board: Board, solution: Board): { updatedBoard: Board; isSolved: boolean } => {
  let isSolved = true;
  const updatedBoard: Board = JSON.parse(JSON.stringify(board));

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      updatedBoard[r][c].hasError = false;
      if (board[r][c].value === null) {
        isSolved = false;
        continue;
      }
      if (board[r][c].value !== solution[r][c].value) {
        isSolved = false;
        if (!board[r][c].isReadOnly) {
          updatedBoard[r][c].hasError = true;
        }
      }
    }
  }

  return { updatedBoard, isSolved };
};
