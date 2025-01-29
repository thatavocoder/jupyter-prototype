import NotebookPage from "./notebook";

export default function IndexPage() {
  const files = [
    { name: "notebook.ipynb", active: true },
    { name: "data.csv", active: false },
  ];

  return <NotebookPage files={files} />;
}
