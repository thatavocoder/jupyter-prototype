export default function MarkdownCell({ content }: { content: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose dark:prose-invert"
      />
    </div>
  );
}
