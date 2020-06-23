import { PluginPlaceType } from "../types/plugin-place-type";
import { PluginGameType } from "../types/plugin-game-type";
import { PluginResolver } from "../plugin-resolver";
import { Plugin } from "../plugin";
import { GitPartialPlugin } from "./git-partial-plugin";

export class ProjectGitPartialPlugin extends Plugin {
  build() {
    return { ...super.header, identity: this.#parent.identity, url: this.#parent.url, folder: this.#folder };
  }

  constructor(
    lang: number,
    games: PluginGameType[],
    resolver: PluginResolver,
    folder: string,
    parent: GitPartialPlugin
  ) {
    super(lang, PluginPlaceType.Git, games, resolver);

    this.#folder = folder;
    this.#parent = parent;
  }

  #folder: string;
  #parent: GitPartialPlugin;
}
