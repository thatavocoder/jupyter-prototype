import { Dispatch, SetStateAction } from "react";

export interface CustomFile {
  name: string;
  active?: boolean;
}

export interface FileContextType {
  allFiles: CustomFile[];
  openFiles: CustomFile[];
  setAllFiles: Dispatch<SetStateAction<CustomFile[]>>;
  addFile: (file: CustomFile) => void;
  removeFile: (fileName: string) => void;
  openFile: (fileName: string) => void;
  closeFile: (fileName: string) => void;
  setActiveFile: (fileName: string) => void;
  closeAllFiles: () => void;
  handleRename: (oldName: string, newName: string) => void;
}
