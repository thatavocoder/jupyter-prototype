import { useFiles } from "@/context/FileContext";

export default function FileTree() {
  const { files, setActiveFile } = useFiles();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Files</h2>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className={`flex items-center p-2 rounded cursor-pointer ${
              file.active
                ? "bg-blue-100 dark:bg-blue-900"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveFile(file.name)}
          >
            <span>📄 {file.name}</span>
            {file.active && <span className="ml-2 text-blue-500">●</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
