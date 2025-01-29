import { createContext, useContext, ReactNode, useState } from "react";

interface File {
  name: string;
  active: boolean;
}

interface FileContextType {
  files: File[];
  setFiles: (files: File[]) => void;
  addFile: (file: File) => void;
  removeFile: (fileName: string) => void;
  setActiveFile: (fileName: string) => void;
}

const FileContext = createContext<FileContextType | null>(null);

export function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<File[]>([
    { name: "notebook.ipynb", active: true },
    { name: "data.csv", active: false },
  ]);

  const addFile = (file: File) => {
    setFiles((prev) => [...prev, file]);
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const setActiveFile = (fileName: string) => {
    setFiles((prev) =>
      prev.map((file) => ({
        ...file,
        active: file.name === fileName,
      })),
    );
  };

  return (
    <FileContext.Provider
      value={{ files, setFiles, addFile, removeFile, setActiveFile }}
    >
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error("useFiles must be used within a FileProvider");
  }

  return context;
}
