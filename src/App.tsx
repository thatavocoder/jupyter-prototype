import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import FilePage from "@/pages/file/FilePage";
import { FileProvider } from "@/context/FileContext";

function App() {
  return (
    <FileProvider>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<FilePage />} path="/file/:name" />
      </Routes>
    </FileProvider>
  );
}

export default App;
