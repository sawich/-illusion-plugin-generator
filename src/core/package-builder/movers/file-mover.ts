import { IBuildable } from "../types/buildable";
import { Mover } from "../types/mover";
import { Node } from "../types/node";

export interface IFiles {
  src: string;
  dst: string;
}

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

  constructor(entity: { files: IFiles[] }) {
    this.#files = entity.files;
  }

  #files: IFiles[];
}
