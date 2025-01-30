import { useState } from "react";
import { Button } from "@heroui/button";

import AddFileForm from "./AddFileForm";
import FileContextMenu from "./FileContextMenu";

import { useFiles } from "@/context/FileContext";

export default function FileTree() {
  const { allFiles, openFiles, openFile, removeFile, handleRename } =
    useFiles();
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    file: string;
  } | null>(null);

  const handleContextMenu = (e: React.MouseEvent, fileName: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      file: fileName,
    });
  };

  const handleRenameClick = () => {
    if (contextMenu) {
      const newName = prompt("Enter new file name:", contextMenu.file);

      if (newName) {
        handleRename(contextMenu.file, newName);
      }
      setContextMenu(null);
    }
  };

  const handleDelete = () => {
    if (
      contextMenu &&
      window.confirm(`Are you sure you want to delete ${contextMenu.file}?`)
    ) {
      removeFile(contextMenu.file);
      setContextMenu(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Files</h2>
        <Button size="sm" onPress={() => setIsAddFileModalOpen(true)}>
          + Add File
        </Button>
      </div>
      <div className="space-y-2">
        {allFiles.map((file, index) => {
          const isActive = openFiles.some(
            (openFile) => openFile.name === file.name && openFile.active,
          );

          return (
            <div
              key={index}
              className={`flex items-center p-2 rounded cursor-pointer ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => openFile(file.name)}
              onContextMenu={(e) => handleContextMenu(e, file.name)}
            >
              <span>📄 {file.name}</span>
              {isActive && <span className="ml-2 text-blue-500">●</span>}
            </div>
          );
        })}
      </div>
      <AddFileForm
        isOpen={isAddFileModalOpen}
        onClose={() => setIsAddFileModalOpen(false)}
      />
      {contextMenu && (
        <FileContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onRename={handleRenameClick}
          onDelete={handleDelete}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}
