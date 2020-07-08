import { IBuildable } from "../types/buildable";
import { Resolver } from "../types/resolver";
import { Node } from "../types/node";

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
      type: Node.Resolver,
      node: {
        type: Resolver.VisualStudio,
        build: this.#build.map((b) => b.build()),
      },
    };
  }

  constructor(entity: { build: IBuildable[] }) {
    this.#build = entity.build;
  }

  #build: IBuildable[];
}
