import { PluginPlaceType } from "../types/plugin-place-type";
import { PluginResolver } from "../plugin-resolver";
import { EntityType } from "../types/type";
import { IdEntity } from "../id-entity";
import { Entity } from "../entity";

export class GitTool extends Entity {
  build() {
    return { ...super.header, identity: this.#identity, url: this.#url };
  }

  constructor(lang: number, resolver: PluginResolver, url: string) {
    super(lang, EntityType.Plugin, PluginPlaceType.Git, resolver);

    this.#url = url;
    this.#identity = IdEntity.makeIdentity();
  }

  #url: string;
  #identity: number;
}
