import { Lang } from "./lang";
import { IBuildable } from "./types/buildable";
import { Game } from "./types/game";

export interface IContainer {
  games: Game[];
  lang: Lang;
  uuid: string;
  uuidentity: string;
  nodes: IBuildable[];
  deps: string[];
}

export class Container implements IBuildable {
  get uuid() {
    return this.#uuid;
  }

  get uuidentity() {
    return this.#uuidentity;
  }

  get lang() {
    return this.#lang;
  }

  get games() {
    return this.#games;
  }

  build() {
    return {
      // uuid: this.#uuid,
      // uuidentity: this.#uuidentity,
      nodes: this.#nodes.map((b) => b.build()),
      dependence: this.#dependence,
    };
  }

  constructor(container: IContainer) {
    this.#games = container.games;
    this.#lang = container.lang;
    this.#uuid = container.uuid;
    this.#uuidentity = container.uuidentity;
    this.#nodes = container.nodes;
    this.#dependence = container.deps;
  }

  #games: Game[];
  #lang: Lang;
  #uuid: string;
  #uuidentity: string;
  #nodes: IBuildable[];
  #dependence: string[];
}

// https://youtu.be/Y7eMV0hg9Iw
