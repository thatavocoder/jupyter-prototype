import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent } from "@heroui/modal";
import { z } from "zod";

import { useFiles } from "@/context/FileContext";

interface AddFileFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddFileForm({ isOpen, onClose }: AddFileFormProps) {
  const { addFile, openFile, allFiles } = useFiles();
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fileSchema = z.object({
    name: z
      .string()
      .refine((name) => !allFiles.some((file) => file.name === name), {
        message: "File name must be unique",
      }),
  });

  const handleSubmit = () => {
    try {
      const validated = fileSchema.parse({ name: fileName });

      const newFile = {
        name: validated.name,
        cells: [{ id: Date.now(), code: "", output: "" }],
      };

      addFile(newFile);
      openFile(validated.name);
      onClose();
      setFileName("");
      setError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add New File</h2>
          <div className="mb-4">
            <Input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
              className="w-full"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" onPress={onClose} color="danger">
              Cancel
            </Button>
            <Button onPress={handleSubmit}>Add File</Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
