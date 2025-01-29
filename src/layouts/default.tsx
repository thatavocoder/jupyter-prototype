import FileTree from "@/components/notebook/FileTree";
import EditorTabs from "@/components/notebook/EditorTabs";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <FileTree />
      </div>

      <div className="flex-1 flex flex-col">
        <EditorTabs />
        <div className="flex-1 bg-white dark:bg-gray-900 p-4 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
