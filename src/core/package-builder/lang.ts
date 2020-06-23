export class Lang {
  get name() {
    return this.#name;
  }
  get description() {
    return this.#description;
  }

  constructor(name: string, description: string) {
    this.#name = name;
    this.#description = description;
  }

  #name: string;
  #description: string;
}
