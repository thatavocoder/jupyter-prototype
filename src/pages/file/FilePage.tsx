import { useState } from "react";
import { useParams } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import { executeCode, useStartKernel, useStartServer } from "@/api/jupyterApi";
import Toolbar from "@/components/Toolbar";
import CellList from "@/components/CellList";
import { useFiles } from "@/context/FileContext";

interface FilePageProps {}

const FilePage = ({}: FilePageProps) => {
  const { updateFileCells, getFileCells } = useFiles();

  const [activeCellId, setActiveCellId] = useState<number | null>(null);

  const fileName = useParams().name ?? "";

  const cells = getFileCells(fileName);

  useStartServer();
  const { data: kernelData } = useStartKernel();

  const addCell = (index: number) => {
    const newCell = { id: Date.now(), code: "", output: "" };

    updateFileCells(fileName, [
      ...cells.slice(0, index + 1),
      newCell,
      ...cells.slice(index + 1),
    ]);
    setActiveCellId(newCell.id);
  };

  const runCode = (id: number) => {
    const cell = cells.find((cell) => cell.id === id);

    if (!cell || !kernelData) return;

    executeCode(kernelData.id);
  };

  const runAllCells = () => {
    updateFileCells(
      fileName,
      getFileCells(fileName).map((cell) => ({
        ...cell,
        output: `Output for: ${cell.code}`,
      })),
    );
  };

  return (
    <DefaultLayout>
      <Toolbar
        activeCellId={activeCellId}
        addCell={addCell}
        runCode={runCode}
        runAllCells={runAllCells}
      />
      <CellList
        activeCellId={activeCellId}
        setActiveCellId={setActiveCellId}
        addCell={addCell}
        runCode={runCode}
      />
    </DefaultLayout>
  );
};

export default FilePage;
