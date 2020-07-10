import { mkdir, rmdir } from "fs/promises";

export const removeFiles = async (path: string) => {
  try {
    await rmdir(path, { recursive: true });
  } catch (error) {
    console.log(error);
  }

  try {
    await mkdir(path, { recursive: true });
  } catch (error) {
    console.log(error);
  }
};
