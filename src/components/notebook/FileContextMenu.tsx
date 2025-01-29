import { useEffect, useRef } from "react";
import { Button } from "@heroui/button";

interface FileContextMenuProps {
  x: number;
  y: number;
  onRename: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function FileContextMenu({
  x,
  y,
  onRename,
  onDelete,
  onClose,
}: FileContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg"
      style={{ top: y, left: x }}
    >
      <div className="p-1">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={onRename}
        >
          Rename
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600"
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
