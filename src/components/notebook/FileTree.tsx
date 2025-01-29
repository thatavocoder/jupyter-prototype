import { useState } from "react";
import { Button } from "@heroui/button";

import AddFileForm from "./AddFileForm";

import { useFiles } from "@/context/FileContext";

export default function FileTree() {
  const { allFiles, openFiles, openFile } = useFiles();
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);

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
    </div>
  );
}
