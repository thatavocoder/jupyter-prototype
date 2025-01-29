import { FileProvider } from "@/context/FileContext";
import NotebookPage from "@/components/index-page/notebook";

export default function IndexPage() {
  return (
    <FileProvider>
      <NotebookPage />
    </FileProvider>
  );
}
