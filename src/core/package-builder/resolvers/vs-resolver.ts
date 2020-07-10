import { IBuildable } from "../types/buildable";
import { Node } from "../types/node";
import { Resolver } from "../types/resolver";

export class VSProjectResolver implements IBuildable {
  build(): object {
    return {
      file: this.#file,
      ignore: this.#ignore,
    };
  }

  constructor(info: { file: string; ignore: string[] }) {
    this.#file = info.file;
    this.#ignore = info.ignore;
  }

  #file: string;
  #ignore: string[];
}

export class VSResolver implements IBuildable {
  build() {
    return {
      type: Node.Resolver,
      node: {
        type: Resolver.VisualStudio,
        dir: this.#dir,
        projects: this.#projects.map((b) => b.build()),
      },
    };
  }

  constructor(entity: { dir: string; build: IBuildable[] }) {
    this.#dir = entity.dir;
    this.#projects = entity.build;
  }

  #dir: string;
  #projects: IBuildable[];
}
