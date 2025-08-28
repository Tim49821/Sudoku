import React from 'react';
import { Board } from '../types';
import CellComponent from './Cell';

interface BoardProps {
  board: Board | null;
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  onInputChange: (row: number, col: number, value: number | null) => void;
}

const BoardComponent: React.FC<BoardProps> = ({ board, selectedCell, onCellClick, onInputChange }) => {
  if (!board) {
    return <div className="w-[324px] h-[324px] sm:w-[450px] sm:h-[450px] bg-slate-800 rounded-lg flex items-center justify-center"><p>Loading...</p></div>;
  }

  const isRelated = (row: number, col: number): boolean => {
    if (!selectedCell) return false;
    const { row: selectedRow, col: selectedCol } = selectedCell;
    const boxRowStart = Math.floor(selectedRow / 3) * 3;
    const boxColStart = Math.floor(selectedCol / 3) * 3;
    
    return row === selectedRow || 
           col === selectedCol || 
           (row >= boxRowStart && row < boxRowStart + 3 && col >= boxColStart && col < boxColStart + 3);
  }

  return (
    <div className="grid grid-cols-9 bg-slate-700 border-2 border-slate-700 rounded-lg overflow-hidden shadow-2xl shadow-slate-950/50">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <CellComponent
            key={`${rowIndex}-${colIndex}`}
            rowIndex={rowIndex}
            colIndex={colIndex}
            cellData={cell}
            isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
            isRelated={isRelated(rowIndex, colIndex)}
            onClick={() => onCellClick(rowIndex, colIndex)}
            onInputChange={(value) => onInputChange(rowIndex, colIndex, value)}
            hasSameValue={selectedCell ? board[selectedCell.row][selectedCell.col].value !== null && cell.value === board[selectedCell.row][selectedCell.col].value : false}
            isPeerError={false} // This can be enhanced further if needed
          />
        ))
      )}
    </div>
  );
};

export default BoardComponent;