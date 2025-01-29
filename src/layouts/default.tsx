export default function DefaultLayout({
  children,
  files,
}: {
  children: React.ReactNode;
  files: { name: string; active: boolean }[];
}) {
  return (
    <div className="flex h-screen">
      {/* File Management Sidebar */}
      <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Files</h2>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className={`flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer ${
                  file.active ? "border-b-2 border-blue-500" : ""
                }`}
              >
                <span>📄 {file.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Editor Tabs */}
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

        {/* Editor Area */}
        <div className="flex-1 bg-white dark:bg-gray-900 p-4 overflow-auto">
          {children}
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-sm">
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
}
