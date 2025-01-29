import { MdClose } from "react-icons/md";

import { useFiles } from "@/context/FileContext";

export default function EditorTabs() {
  const { openFiles, setActiveFile, closeFile } = useFiles();

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div className="flex space-x-4 px-4">
        {openFiles.map((file, index) => (
          <div
            key={index}
            className={`group py-2 px-4 relative cursor-pointer flex items-center space-x-2 ${
              file.active
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveFile(file.name)}
          >
            <span>{file.name}</span>
            <button
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                closeFile(file.name);
              }}
            >
              <MdClose className="w-4 h-4" />
            </button>
            {file.active && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
