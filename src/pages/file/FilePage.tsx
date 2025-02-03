import { useState } from "react";
import { useParams } from "react-router-dom";

import DefaultLayout from "@/layouts/default";
import Toolbar from "@/components/notebook/Toolbar";
import CellList from "@/components/notebook/CellList";
import { useFiles } from "@/context/FileContext";
import { useStartServer } from "@/api/useStartServer";
import { useStartKernel } from "@/api/useStartKernel";
import { useExecuteCode } from "@/api/useExecuteCode.ts";

interface FilePageProps {}

const FilePage = ({}: FilePageProps) => {
  const { updateFileCells, getFileCells } = useFiles();

  const [activeCellId, setActiveCellId] = useState<number | null>(null);

  const fileName = useParams().name ?? "";

  const cells = getFileCells(fileName);

  useStartServer();
  const { data: kernelData } = useStartKernel();

  const updateCellOutput = (cellId: number, output: string) => {
    updateFileCells(
      fileName,
      cells.map((cell) => (cell.id === cellId ? { ...cell, output } : cell)),
    );
  };

  const { executeCode } = useExecuteCode(
    kernelData?.id ?? "",
    updateCellOutput,
  );

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

    executeCode(cell.id, cell.code);
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
