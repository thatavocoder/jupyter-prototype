import DefaultLayout from "@/layouts/default";
import CodeCell from "@/components/notebook/CodeCell";
import MarkdownCell from "@/components/notebook/MarkdownCell";

export default function NotebookPage() {
  return (
    <DefaultLayout>
      <div className="space-y-4">
        <CodeCell cellNumber={1} code="print('Hello, Jupyter!')" />
        <MarkdownCell content="<h1>This is a Markdown Cell</h1><p>You can write rich text here.</p>" />
      </div>
    </DefaultLayout>
  );
}
