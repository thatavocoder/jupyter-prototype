import { useFiles } from "@/context/FileContext";

export default function EditorTabs() {
  const { files, setActiveFile } = useFiles();

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div className="flex space-x-4 px-4">
        {files.map((file, index) => (
          <div
            key={index}
            className={`py-2 px-4 relative cursor-pointer ${
              file.active
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveFile(file.name)}
          >
            {file.name}
            {file.active && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
