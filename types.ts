
export type CellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

export interface CellData {
  value: CellValue;
  isReadOnly: boolean;
  hasError: boolean;
}

export type Board = CellData[][];

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}
