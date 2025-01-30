import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { CustomFile, FileContextType } from "../types/fileTypes";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorageUtils";
import { updateFileState, getRemainingFiles } from "../utils/fileOperations";

const FileContext = createContext<FileContextType | null>(null);

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

  const updateNavigation = (fileName: string) => {
    setTimeout(() => navigate(`/file/${encodeURIComponent(fileName)}`), 0);
  };

  const getFileNameFromPath = () => {
    const path = location.pathname.split("/file/")[1];

    return path ? decodeURIComponent(path) : null;
  };

  useEffect(() => {
    const fileName = getFileNameFromPath();

    if (fileName && !openFiles.some((file) => file.name === fileName)) {
      setTimeout(() => openFile(fileName), 0);
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
      const isFileOpen = prev.some((file) => file.name === fileName);
      const updatedFiles = updateFileState(prev, fileName, true);

      return isFileOpen
        ? updatedFiles
        : [...updatedFiles, { name: fileName, active: true }];
    });
    updateNavigation(fileName);
  };

  const closeFile = (fileName: string) => {
    setOpenFiles((prev) => {
      const remainingFiles = getRemainingFiles(prev, fileName);
      const wasActive = prev.some(
        (file) => file.name === fileName && file.active,
      );

      if (wasActive && remainingFiles.length > 0) {
        return remainingFiles.map((file, index) => ({
          ...file,
          active: index === remainingFiles.length - 1,
        }));
      }

      return remainingFiles;
    });

    const remainingFiles = getRemainingFiles(openFiles, fileName);

    if (remainingFiles.length > 0) {
      updateNavigation(remainingFiles[remainingFiles.length - 1].name);
    } else {
      setTimeout(() => navigate("/"), 0);
    }
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
    updateNavigation(fileName);
  };

  const closeAllFiles = () => {
    setOpenFiles([]);
    setTimeout(() => navigate("/"), 0);
  };

  const handleRename = (oldName: string, newName: string) => {
    setAllFiles((prev) =>
      prev.map((file) =>
        file.name === oldName ? { ...file, name: newName } : file,
      ),
    );

    setOpenFiles((prev) =>
      prev.map((file) => ({
        ...file,
        name: file.name === oldName ? newName : file.name,
        active: file.name === oldName ? true : false,
      })),
    );

    updateNavigation(newName);
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
        handleRename,
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
