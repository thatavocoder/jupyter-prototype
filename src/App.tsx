import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import FilePage from "@/pages/file/FilePage";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<FilePage />} path="/file/:name" />
    </Routes>
  );
}

export default App;
