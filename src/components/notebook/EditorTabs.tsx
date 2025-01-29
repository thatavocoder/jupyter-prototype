interface EditorTabsProps {
  files: { name: string; active: boolean }[];
}

export default function EditorTabs({ files }: EditorTabsProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div className="flex space-x-4 px-4">
        {files.map((file, index) => (
          <div
            key={index}
            className={`py-2 px-4 ${
              file.active
                ? "border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            } cursor-pointer`}
          >
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
}
