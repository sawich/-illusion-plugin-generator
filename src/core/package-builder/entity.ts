import { PluginPlaceType } from "./types/plugin-place-type";
import { PluginResolver } from "./plugin-resolver";
import { IBuildable } from "./types/buildable";
import { Unique } from "./unique";
import { EntityType } from "./types/type";

export abstract class Entity implements IBuildable {
  get type() {
    return this.#type;
  }

  get place() {
    return this.#place;
  }
  get id() {
    return this.#id;
  }

  get lang() {
    return this.#lang;
  }

  get resolver() {
    return this.#resolver;
  }

  get dependencies() {
    return this.#dependencies;
  }

  get header() {
    return {
      id: this.#id,
      lang: this.#lang,
      type: this.#type,
      place: this.#place,
      resolver: this.#resolver,
      dependencies: this.#dependencies.map((d) => d.id),
    };
  }

  addDependence(...plugins: Entity[]) {
    this.#dependencies.push(...plugins);
  }

  abstract build(): object;

  protected constructor(lang: number, type: EntityType, place: PluginPlaceType, resolver: PluginResolver) {
    this.#lang = lang;
    this.#type = type;
    this.#place = place;
    this.#resolver = resolver;
  }

  #id = Entity.makeId;
  #lang: number;
  #type: EntityType;
  #place: PluginPlaceType;
  #resolver: PluginResolver;
  #dependencies: Entity[] = [];

  private static get makeId() {
    return Entity.generateUniqueId.next().value;
  }

  private static generateUniqueId = Unique.idGenerator();
}
