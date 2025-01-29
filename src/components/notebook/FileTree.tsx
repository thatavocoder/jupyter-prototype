interface FileTreeProps {
  files: { name: string; active: boolean }[];
}

export default function FileTree({ files }: FileTreeProps) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Files</h2>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer"
          >
            <span>📄 {file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
