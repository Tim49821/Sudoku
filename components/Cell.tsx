import React from 'react';
import { CellData } from '../types';

interface CellProps {
  cellData: CellData;
  isSelected: boolean;
  isRelated: boolean;
  onClick: () => void;
  onInputChange: (value: number | null) => void;
  hasSameValue: boolean;
  isPeerError: boolean;
  rowIndex: number;
  colIndex: number;
}

const CellComponent: React.FC<CellProps> = ({
  cellData,
  isSelected,
  isRelated,
  onClick,
  onInputChange,
  hasSameValue,
  rowIndex,
  colIndex,
}) => {
  const { value, isReadOnly, hasError } = cellData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      onInputChange(null);
    } else {
      const num = parseInt(inputValue, 10);
      if (!isNaN(num) && num >= 1 && num <= 9) {
        onInputChange(num);
      }
    }
  };

  const baseClasses = "flex items-center justify-center aspect-square text-xl sm:text-2xl font-semibold transition-colors duration-200 ease-in-out cursor-pointer";
  
  const getBorderClasses = (row: number, col: number): string => {
    let classes = [];
    // Right borders
    if (col === 2 || col === 5) {
        classes.push('border-r-2 border-r-slate-700');
    } else if (col !== 8) {
        classes.push('border-r border-r-slate-600');
    }

    // Bottom borders
    if (row === 2 || row === 5) {
        classes.push('border-b-2 border-b-slate-700');
    } else if (row !== 8) {
        classes.push('border-b border-b-slate-600');
    }
    return classes.join(' ');
  };
  
  const borderClasses = getBorderClasses(rowIndex, colIndex);

  const boxRow = Math.floor(rowIndex / 3);
  const boxCol = Math.floor(colIndex / 3);
  const isShadedBox = (boxRow + boxCol) % 2 === 1;

  const stateClasses = [
    // --- BACKGROUNDS (in order of increasing priority) ---
    // Base background for 3x3 box shading (checkerboard pattern)
    isShadedBox ? 'bg-slate-800' : 'bg-slate-800/50',
    
    // Highlight for related cells (row, column, box)
    !isSelected && isRelated ? 'bg-slate-700' : '',
    
    // Highlight for cells with the same value as the selected cell.
    !isSelected && hasSameValue ? 'bg-sky-800' : '',
    
    // The currently selected cell has the strongest highlight.
    isSelected ? 'bg-sky-700' : '',
    
    // --- TEXT COLORS (in order of increasing priority) ---
    // Base text color
    isReadOnly ? 'text-slate-300' : 'text-sky-400',
    
    // Text highlight for all cells with the same value (including selected)
    hasSameValue ? 'text-sky-300' : '',

    // --- OVERRIDE ---
    // Error state has the highest priority and overrides other styles.
    hasError ? '!text-red-400 !bg-red-900/50' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`${baseClasses} ${borderClasses} ${stateClasses}`} onClick={onClick}>
      {isReadOnly ? (
        <span>{value}</span>
      ) : (
        <input
          type="number"
          value={value === null ? '' : value}
          onChange={handleChange}
          className="w-full h-full text-center bg-transparent outline-none sudoku-input"
          readOnly={isReadOnly}
          min="1"
          max="9"
        />
      )}
    </div>
  );
};

export default CellComponent;