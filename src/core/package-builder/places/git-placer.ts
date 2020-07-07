import { IBuildable } from "../types/buildable";
import { Placer } from "../types/container-placer";

export class GitPlacer implements IBuildable {
  build() {
    return { type: Placer.Git, url: this.#url };
  }

  constructor(plugin: { url: string }) {
    this.#url = plugin.url;
  }

  #url: string;
}
