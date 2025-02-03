import { useParams } from "react-router-dom";
import { Button } from "@heroui/button";
import { FaPlus, FaPlay, FaTrash } from "react-icons/fa";

import { useFiles } from "@/context/FileContext";

interface CellListProps {
  activeCellId: number | null;
  setActiveCellId: (id: number) => void;
  addCell: (index: number) => void;
  runCode: (id: number) => void;
}

const CellList = ({
  activeCellId,
  setActiveCellId,
  addCell,
  runCode,
}: CellListProps) => {
  const { getFileCells, updateFileCells, deleteFileCell } = useFiles();
  const fileName = useParams().name ?? "";
  const cells = getFileCells(fileName);

  return (
    <div className="space-y-4 p-4 bg-gray-50 min-h-screen">
      {cells.map((cell, index) => (
        <div
          key={cell.id}
          className={`border rounded-lg overflow-hidden shadow-sm transition-all ${
            activeCellId === cell.id ? "ring-2 ring-blue-500" : ""
          }`}
          onClick={() => setActiveCellId(cell.id)}
        >
          <div className="flex items-center justify-between bg-gray-100 px-3 py-2 border-b">
            <span className="text-sm text-gray-500">In [ ]:</span>
            <div className="space-x-2">
              <Button
                size="sm"
                variant="light"
                onPress={() => runCode(cell.id)}
                startContent={<FaPlay className="w-3 h-3" />}
              >
                Run
              </Button>
              <Button
                size="sm"
                variant="light"
                onPress={() => addCell(index)}
                startContent={<FaPlus className="w-3 h-3" />}
              >
                Add Cell
              </Button>
              <Button
                size="sm"
                variant="light"
                onPress={() => deleteFileCell(fileName, cell.id)}
                startContent={<FaTrash className="w-3 h-3" />}
              >
                Delete
              </Button>
            </div>
          </div>
          <textarea
            className="w-full p-3 bg-white focus:outline-none font-mono text-sm"
            value={cell.code}
            onChange={(e) =>
              updateFileCells(
                fileName,
                cells.map((c) =>
                  c.id === cell.id ? { ...c, code: e.target.value } : c,
                ),
              )
            }
            rows={Math.max(4, cell.code.split("\n").length)}
            placeholder="Enter code..."
          />
          {cell.output && (
            <div className="p-3 bg-white border-t">
              <div className="text-sm text-gray-500 mb-1">Out [ ]:</div>
              <pre className="text-sm bg-gray-50 p-2 rounded">
                {cell.output}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CellList;
