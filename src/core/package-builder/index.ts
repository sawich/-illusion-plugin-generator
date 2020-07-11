import { writeFile } from "fs/promises";
import { resolve } from "path";

import { removeFiles } from "../helpers/remove-helper";
import { Container, IGame } from "./container";
import { ILang, Lang } from "./lang";
import { IBuildable } from "./types/buildable";

interface IGrouped {
  [key: number]: {
    uuid: string;
    lang: string;
    uuidEntity: string;
  }[];
}

export class PackageContext {
  use(builder: PackageBuilder) {
    this.useLangs(builder);
    this.useContainers(builder);
  }

  async build() {
    const langsPromise = this.saveLangs();

    await Promise.all([
      removeFiles(resolve(this.#apiWorkDir, "packages")),
      removeFiles(resolve(this.#apiWorkDir, "scripts")),
    ]);

    await Promise.all([this.saveLists(), this.savePlugins(), langsPromise]);
  }

  private useLangs(builder: PackageBuilder) {
    for (const lang of builder.langs) {
      const found = this.#langs.find((l) => l.uuid == lang.uuid);
      if (found !== undefined) {
        console.log(`old: ${found.name} / ${found.description}`);
        console.log(`new: ${lang.name} / ${lang.description}`);

        throw new Error("Lang UUID already used");
      }
    }

    this.#langs.push(...builder.langs);
  }

  private useContainers(builder: PackageBuilder) {
    if (this.#packages.some((c) => c.uuidEntity == builder.uuidEntity)) {
      console.info(builder.uuidEntity);
      throw new Error("UUID.Entity already used");
    }

    for (const container of builder.packages) {
      if (this.#packages.some((c) => c.games.some((g) => container.games.some((cg) => cg.uuid == g.uuid)))) {
        console.info(container.lang.name);
        throw new Error("UUID already used");
      }

      this.#packages.push(new Container({ ...container, uuidEntity: builder.uuidEntity }));
    }
  }

  private async savePlugins() {
    for (const p of this.#packages) {
      for (const game of p.games) {
        const builded = p.build(game.id);
        const path = resolve(this.#apiWorkDir, "scripts", `${game.uuid}.json`);
        writeFile(path, JSON.stringify(builded), "utf-8");
      }
    }
  }

  private async saveLists() {
    const groups = this.#packages.reduce<IGrouped>((prev, curr) => {
      for (const game of curr.games) {
        (prev[game.id] = prev[game.id] || []).push({
          uuid: game.uuid,
          lang: curr.lang.uuid,
          uuidEntity: curr.uuidEntity,
        });
      }
      return prev;
    }, {});

    for (const game in groups) {
      const group = groups[game];
      writeFile(resolve(this.#apiWorkDir, "packages", `${game}.json`), JSON.stringify(group));
    }
  }

  private async saveLangs() {
    const data = JSON.stringify(
      Object.fromEntries(
        this.#langs.map((lang) => [
          lang.uuid,
          {
            name: lang.name,
            description: lang.description,
          },
        ])
      )
    );

    await writeFile("../illusion-plugin-manager/src/i18n/langs/en/packages.json", data);
  }

  #langs: Lang[] = [];
  #packages: Container[] = [];

  #apiWorkDir = "../illusion-plugin-fake-api/public";
}

export interface IPackageInfo {
  games: IGame[];
  lang: Lang;
  nodes: IBuildable[];
}

export class PackageBuilder {
  get langs() {
    return this.#langs;
  }

  get uuidEntity() {
    return this.#uuidEntity;
  }

  get packages() {
    return this.#packages;
  }

  lang(value: ILang) {
    const found = this.langs.find((l) => l.uuid == value.uuid);
    if (found !== undefined) {
      console.log(`old: ${found.name} / ${found.description}`);
      console.log(`new: ${value.name} / ${value.desc}`);

      throw new Error("Duplicate lang UUID");
    }

    const lang = new Lang(value);
    this.#langs.push(lang);
    return lang;
  }

  use(container: IPackageInfo) {
    if (container.games.some((g) => g.uuid.length == 0)) {
      console.info(container.lang.name);
      throw new Error("UUID is empty");
    }

    if (this.#packages.some((c) => c.games.some((g) => container.games.some((cg) => cg.uuid == g.uuid)))) {
      console.info(container.lang.name);
      throw new Error("Duplicate game UUID");
    }

    this.#packages.push(container);
  }

  constructor(uuidEntity: string) {
    this.#langs = [];
    this.#uuidEntity = uuidEntity;
    this.#packages = [];
  }

  #langs: Lang[];
  #uuidEntity: string;
  #packages: IPackageInfo[];
}

//https://youtu.be/ojU8W_ZgAjs
