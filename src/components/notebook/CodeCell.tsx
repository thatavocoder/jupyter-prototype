interface CodeCellProps {
  code: string;
  cellNumber: number;
}

export default function CodeCell({ code, cellNumber }: CodeCellProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
      <div className="mb-2">[{cellNumber}]:</div>
      <pre className="bg-white dark:bg-gray-900 p-4 rounded">
        <code>{code}</code>
      </pre>
    </div>
  );
}
