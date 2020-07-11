import { Lang } from "./lang";
import { IBuildable } from "./types/buildable";
import { Game } from "./types/game";

export interface IGame {
  id: Game;
  uuid: string;
  deps: string[];
}

export interface IContainer {
  games: IGame[];
  lang: Lang;
  uuidEntity: string;
  nodes: IBuildable[];
}

export class Container {
  get uuidEntity() {
    return this.#uuidEntity;
  }

  get lang() {
    return this.#lang;
  }

  get games() {
    return this.#games;
  }

  build(game: Game) {
    const found = this.#games.find((g) => g.id == game);
    if (found === undefined) {
      throw new Error("");
    }

    return {
      nodes: this.#nodes.map((b) => b.build()),
      dependence: found.deps,
    };
  }

  constructor(container: IContainer) {
    this.#games = container.games;
    this.#lang = container.lang;
    this.#uuidEntity = container.uuidEntity;
    this.#nodes = container.nodes;
  }

  #games: IGame[];
  #lang: Lang;
  #uuidEntity: string;
  #nodes: IBuildable[];
}

// https://youtu.be/Y7eMV0hg9Iw
