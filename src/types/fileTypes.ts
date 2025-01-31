import { Dispatch, SetStateAction } from "react";

import { CodeCell } from ".";

export interface CustomFile {
  name: string;
  active?: boolean;
  cells: CodeCell[];
}

export interface FileContextType {
  allFiles: CustomFile[];
  openFiles: CustomFile[];
  setAllFiles: Dispatch<SetStateAction<CustomFile[]>>;
  addFile: (file: CustomFile) => void;
  removeFile: (fileName: string) => void;
  updateFileCells: (fileName: string, updatedCells: CodeCell[]) => void;
  getFileCells: (fileName: string) => CodeCell[];
  deleteFileCell: (fileName: string, cellId: number) => void;
  openFile: (fileName: string) => void;
  closeFile: (fileName: string) => void;
  setActiveFile: (fileName: string) => void;
  closeAllFiles: () => void;
  handleRename: (oldName: string, newName: string) => void;
}
