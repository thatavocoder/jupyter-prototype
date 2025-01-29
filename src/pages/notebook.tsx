import DefaultLayout from "@/layouts/default";

interface NotebookPageProps {
  files: { name: string; active: boolean }[];
}

export default function NotebookPage({ files }: NotebookPageProps) {
  return (
    <DefaultLayout files={files}>
      <div className="space-y-4">
        {/* Code Cell */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <div className="mb-2">[1]:</div>
          <pre className="bg-white dark:bg-gray-900 p-4 rounded">
            <code>print(&quot;Hello, Jupyter!&quot;)</code>
          </pre>
        </div>

        {/* Markdown Cell */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
          <div className="prose dark:prose-invert">
            <h1>This is a Markdown Cell</h1>
            <p>You can write rich text here.</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
