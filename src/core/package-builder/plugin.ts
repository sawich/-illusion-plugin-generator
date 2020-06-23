import { PluginPlaceType } from "./types/plugin-place-type";
import { PluginGameType } from "./types/plugin-game-type";
import { PluginResolver } from "./plugin-resolver";
import { EntityType } from "./types/type";
import { Entity } from "./entity";

export abstract class Plugin extends Entity {
  get games() {
    return this.#games;
  }

  get header() {
    return {
      ...super.header,
      games: Array.from(this.#games),
    };
  }

  abstract build(): object;

  protected constructor(
    lang: number,
    place: PluginPlaceType,
    games: PluginGameType[] | Set<PluginGameType>,
    resolver: PluginResolver
  ) {
    super(lang, EntityType.Plugin, place, resolver);
    this.#games = new Set(games);
  }

  #games: Set<PluginGameType>;
}
