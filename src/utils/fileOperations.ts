import { CustomFile } from "../types/fileTypes";

export const updateFileState = (
  files: CustomFile[],
  fileName: string,
  isActive: boolean,
): CustomFile[] => {
  return files.map((file) => ({
    ...file,
    active: file.name === fileName ? isActive : false,
  }));
};

export const getRemainingFiles = (
  files: CustomFile[],
  fileName: string,
): CustomFile[] => {
  return files.filter((file) => file.name !== fileName);
};
