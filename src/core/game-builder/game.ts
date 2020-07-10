import { parse } from "path";

import { IBuildable } from "../package-builder/types/buildable";
import { Game as GameType } from "../package-builder/types/game";

export class Game implements IBuildable {
  get id() {
    return this.#game;
  }

  get name() {
    return this.#name;
  }

  build() {
    return {
      dlls: {
        ...Object.fromEntries(this.#dlls.map((d) => [parse(d).name, d])),
      },
    };
  }

  constructor(info: { name: string; game: GameType; dlls: string[] }) {
    this.#name = info.name;
    this.#game = info.game;
    this.#dlls = info.dlls;
  }

  #name: string;
  #game: GameType;
  #dlls: string[];
}
