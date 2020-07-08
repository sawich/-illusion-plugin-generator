import { IBuildable } from "../types/buildable";
import { Mover } from "../types/mover";
import { Node } from "../types/node";

export interface IFile {
  src: string;
  dst: string;
}

type IFiles = IFile[];

export class FileMover implements IBuildable {
  build() {
    return {
      type: Node.Mover,
      node: {
        type: Mover.File,
        files: this.#files,
      },
    };
  }

  constructor(entity: { files: IFiles }) {
    this.#files = entity.files;
  }

  #files: IFiles;
}
