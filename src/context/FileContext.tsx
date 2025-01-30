import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface CustomFile {
  name: string;
  active?: boolean;
}

interface FileContextType {
  allFiles: CustomFile[];
  openFiles: CustomFile[];
  setAllFiles: Dispatch<SetStateAction<CustomFile[]>>;
  addFile: (file: CustomFile) => void;
  removeFile: (fileName: string) => void;
  openFile: (fileName: string) => void;
  closeFile: (fileName: string) => void;
  setActiveFile: (fileName: string) => void;
  closeAllFiles: () => void;
}

const FileContext = createContext<FileContextType | null>(null);

const getLocalStorageItem = <T,>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : defaultValue;
};

const setLocalStorageItem = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export function FileProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [allFiles, setAllFiles] = useState<CustomFile[]>(
    getLocalStorageItem("allFiles", [
      { name: "notebook.ipynb" },
      { name: "data.csv" },
    ]),
  );
  const [openFiles, setOpenFiles] = useState<CustomFile[]>(
    getLocalStorageItem("openFiles", [
      { name: "notebook.ipynb", active: true },
    ]),
  );

  useEffect(() => {
    const fileName = location.pathname.split("/file/")[1];

    if (fileName) {
      const decodedFileName = decodeURIComponent(fileName);

      if (!openFiles.some((file) => file.name === decodedFileName)) {
        setTimeout(() => {
          openFile(decodedFileName);
        }, 0);
      }
    }
  }, []);

  useEffect(() => {
    setLocalStorageItem("allFiles", allFiles);
  }, [allFiles]);

  useEffect(() => {
    setLocalStorageItem("openFiles", openFiles);
  }, [openFiles]);

  const addFile = (file: CustomFile) => {
    setAllFiles((prev) => [...prev, file]);
  };

  const openFile = (fileName: string) => {
    setOpenFiles((prev) => {
      if (prev.some((file) => file.name === fileName)) {
        return prev.map((file) => ({
          ...file,
          active: file.name === fileName,
        }));
      }

      return [
        ...prev.map((file) => ({ ...file, active: false })),
        { name: fileName, active: true },
      ];
    });
    setTimeout(() => {
      navigate(`/file/${encodeURIComponent(fileName)}`);
    }, 0);
  };

  const closeFile = (fileName: string) => {
    setOpenFiles((prev) => {
      const remainingFiles = prev.filter((file) => file.name !== fileName);

      if (
        prev.some((file) => file.name === fileName && file.active) &&
        remainingFiles.length > 0
      ) {
        return remainingFiles.map((file, index) => ({
          ...file,
          active: index === remainingFiles.length - 1,
        }));
      }

      return remainingFiles;
    });
    setTimeout(() => {
      const remainingFiles = openFiles.filter((file) => file.name !== fileName);

      if (remainingFiles.length > 0) {
        const lastFile = remainingFiles[remainingFiles.length - 1];

        navigate(`/file/${encodeURIComponent(lastFile.name)}`);
      } else {
        navigate("/");
      }
    }, 0);
  };

  const removeFile = (fileName: string) => {
    setAllFiles((prev) => prev.filter((file) => file.name !== fileName));
    closeFile(fileName);
  };

  const setActiveFile = (fileName: string) => {
    setOpenFiles((prev) =>
      prev.map((file) => ({
        ...file,
        active: file.name === fileName,
      })),
    );
    setTimeout(() => {
      navigate(`/file/${encodeURIComponent(fileName)}`);
    }, 0);
  };

  const closeAllFiles = () => {
    setOpenFiles([]);
  };

  return (
    <FileContext.Provider
      value={{
        allFiles,
        openFiles,
        setAllFiles,
        addFile,
        removeFile,
        openFile,
        closeFile,
        setActiveFile,
        closeAllFiles,
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
