import { Button } from "@heroui/button";
import { FaPlus, FaPlay } from "react-icons/fa";

interface ToolbarProps {
  activeCellId: number | null;
  addCell: (index: number) => void;
  runCode: (id: number) => void;
  runAllCells: () => void;
  cells: { id: number }[];
}

const Toolbar = ({
  activeCellId,
  addCell,
  runCode,
  runAllCells,
  cells,
}: ToolbarProps) => (
  <div className="px-2 border-b">
    <div className="flex justify-end">
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="light"
          onPress={() => {
            if (activeCellId !== null) {
              const index = cells.findIndex((cell) => cell.id === activeCellId);

              addCell(index);
            }
          }}
          startContent={<FaPlus className="w-3 h-3" />}
        >
          Add Cell Below
        </Button>
        <Button
          size="sm"
          variant="light"
          color="primary"
          onPress={() => {
            if (activeCellId !== null) {
              runCode(activeCellId);
            }
          }}
          startContent={<FaPlay className="w-3 h-3" />}
        >
          Run Cell
        </Button>
        <Button
          size="sm"
          variant="light"
          color="success"
          onPress={runAllCells}
          startContent={<FaPlay className="w-3 h-3" />}
        >
          Run All Cells
        </Button>
      </div>
    </div>
  </div>
);

export default Toolbar;
