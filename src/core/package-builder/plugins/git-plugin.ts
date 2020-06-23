import { PluginPlaceType } from "../types/plugin-place-type";
import { PluginGameType } from "../types/plugin-game-type";
import { PluginResolver } from "../plugin-resolver";
import { IdEntity } from "../id-entity";
import { Plugin } from "../plugin";

export class GitPlugin extends Plugin {
  build() {
    return { ...super.header, identity: this.#identity, url: this.#url };
  }

  constructor(lang: number, games: PluginGameType[] | Set<PluginGameType>, resolver: PluginResolver, url: string) {
    super(lang, PluginPlaceType.Git, games, resolver);

    this.#url = url;
    this.#identity = IdEntity.makeIdentity();
  }

  #url: string;
  #identity: number;
}
