import { Unique } from "./unique";

export abstract class IdEntity {
  static makeIdentity() {
    return IdEntity.makeId;
  }

  get identity() {
    return this.#identity;
  }

  #identity = IdEntity.makeId;

  private static get makeId() {
    return IdEntity.generateUniqueId.next().value;
  }

  private static generateUniqueId = Unique.idGenerator();
}
