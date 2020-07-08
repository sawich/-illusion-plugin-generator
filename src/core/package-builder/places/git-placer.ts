import { IBuildable } from "../types/buildable";
import { Placer } from "../types/placer";
import { Node } from "../types/node";

export class GitPlacer implements IBuildable {
  build() {
    return {
      type: Node.Placer,
      node: {
        type: Placer.Git,
        url: this.#url,
      },
    };
  }

  constructor(plugin: { url: string }) {
    this.#url = plugin.url;
  }

  #url: string;
}
