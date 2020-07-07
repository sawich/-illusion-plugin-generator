import { IBuildable } from "../types/buildable";
import { Resolver } from "../types/resolver";

export interface IVSFiles {
  src: string;
  dst: string;
}

export class VSProjectResolver implements IBuildable {
  build(): object {
    return { file: this.#file };
  }

  constructor(file: string) {
    this.#file = file;
  }

  #file: string;
}

export class VSResolver implements IBuildable {
  build() {
    return {
      type: Resolver.VisualStudio,
      files: this.#files,
      build: this.#build.map((b) => b.build()),
    };
  }

  constructor(entity: { files: IVSFiles[]; build: IBuildable[] }) {
    this.#build = entity.build;
    this.#files = entity.files;
  }

  #build: IBuildable[];
  #files: IVSFiles[];
}
