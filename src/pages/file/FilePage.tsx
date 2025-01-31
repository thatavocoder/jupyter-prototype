import { useState } from "react";

import { CodeCell } from "@/types";
import DefaultLayout from "@/layouts/default";
import { executeCode, useStartKernel, useStartServer } from "@/api/jupyterApi";
import Toolbar from "@/components/Toolbar";
import CellList from "@/components/CellList";

interface FilePageProps {}

const FilePage = ({}: FilePageProps) => {
  const [cells, setCells] = useState<CodeCell[]>([
    { id: 1, code: "", output: "" },
  ]);
  const [activeCellId, setActiveCellId] = useState<number | null>(null);

  useStartServer();
  const { data: kernelData } = useStartKernel();

  const addCell = (index: number) => {
    const newCell = { id: Date.now(), code: "", output: "" };

    setCells([
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
    setCells(
      cells.map((cell) => ({
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
        cells={cells}
      />
      <CellList
        cells={cells}
        activeCellId={activeCellId}
        setActiveCellId={setActiveCellId}
        addCell={addCell}
        runCode={runCode}
        setCells={setCells}
      />
    </DefaultLayout>
  );
};

export default FilePage;
