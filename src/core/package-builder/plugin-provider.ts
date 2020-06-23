import { PluginGameType } from "./types/plugin-game-type";

export abstract class PluginProvider {
  get games() {
    return this.#games;
  }

  protected constructor(games: PluginGameType) {
    this.#games = games;
  }

  #games: PluginGameType;
}
