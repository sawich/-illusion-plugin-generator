import { Game } from "./types/game";
import { Lang } from "./lang";
import { IBuildable } from "./types/buildable";

export interface IContainer {
  games: Game[];
  lang: Lang;
  uuid: string;
  placer: IBuildable;
  resolver: IBuildable;
  deps: string[];
}

export class Container implements IBuildable {
  get uuid() {
    return this.#uuid;
  }

  get games() {
    return this.#games;
  }

  build() {
    return {
      // game: this.#games,
      uuid: this.#uuid,
      lang: this.#lang.uuid,
      placer: this.#placer.build(),
      resolver: this.#resolver.build(),
    };
  }

  constructor(container: IContainer) {
    this.#games = container.games;
    this.#uuid = container.uuid;
    this.#lang = container.lang;
    this.#placer = container.placer;
    this.#resolver = container.resolver;
  }

  #games: Game[];
  #uuid: string;
  #lang: Lang;
  #placer: IBuildable;
  #resolver: IBuildable;
}

// https://youtu.be/Y7eMV0hg9Iw
