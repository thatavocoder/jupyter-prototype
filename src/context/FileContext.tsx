import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface File {
  name: string;
  active?: boolean;
}

interface FileContextType {
  allFiles: File[]; // All files in the file tree
  openFiles: File[]; // Currently open tabs
  setAllFiles: (files: File[]) => void;
  addFile: (file: File) => void;
  removeFile: (fileName: string) => void;
  openFile: (fileName: string) => void;
  closeFile: (fileName: string) => void;
  setActiveFile: (fileName: string) => void;
}

const FileContext = createContext<FileContextType | null>(null);

// Helper functions for localStorage
const getLocalStorageItem = <T,>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : defaultValue;
};

const setLocalStorageItem = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export function FileProvider({ children }: { children: ReactNode }) {
  const [allFiles, setAllFiles] = useState<File[]>(
    getLocalStorageItem("allFiles", [
      { name: "notebook.ipynb" },
      { name: "data.csv" },
    ]),
  );
  const [openFiles, setOpenFiles] = useState<File[]>(
    getLocalStorageItem("openFiles", [
      { name: "notebook.ipynb", active: true },
    ]),
  );

  // Save to localStorage whenever allFiles changes
  useEffect(() => {
    setLocalStorageItem("allFiles", allFiles);
  }, [allFiles]);

  // Save to localStorage whenever openFiles changes
  useEffect(() => {
    setLocalStorageItem("openFiles", openFiles);
  }, [openFiles]);

  const addFile = (file: File) => {
    setAllFiles((prev) => [...prev, file]);
  };

  const openFile = (fileName: string) => {
    setOpenFiles((prev) => {
      // If file is already open, just make it active
      if (prev.some((file) => file.name === fileName)) {
        return prev.map((file) => ({
          ...file,
          active: file.name === fileName,
        }));
      }

      // If file is not open, add it and make it active
      return [
        ...prev.map((file) => ({ ...file, active: false })), // Deactivate all other files
        { name: fileName, active: true },
      ];
    });
  };

  const closeFile = (fileName: string) => {
    setOpenFiles((prev) => {
      const remainingFiles = prev.filter((file) => file.name !== fileName);

      // If we closed the active file and there are other files open
      if (
        prev.some((file) => file.name === fileName && file.active) &&
        remainingFiles.length > 0
      ) {
        // Activate the last file in the list
        return remainingFiles.map((file, index) => ({
          ...file,
          active: index === remainingFiles.length - 1,
        }));
      }

      return remainingFiles;
    });
  };

  const setActiveFile = (fileName: string) => {
    setOpenFiles((prev) =>
      prev.map((file) => ({
        ...file,
        active: file.name === fileName,
      })),
    );
  };

  return (
    <FileContext.Provider
      value={{
        allFiles,
        openFiles,
        setAllFiles,
        addFile,
        removeFile: closeFile,
        openFile,
        closeFile,
        setActiveFile,
      }}
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
