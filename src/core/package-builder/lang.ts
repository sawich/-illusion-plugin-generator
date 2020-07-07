export interface ILang {
  uuid: string;
  name: string;
  desc: string;
}

export class Lang {
  get uuid() {
    return this.#uuid;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  constructor(lang: ILang) {
    this.#uuid = lang.uuid;
    this.#name = lang.name;
    this.#description = lang.desc;
  }

  #uuid: string;
  #name: string;
  #description: string;
}
