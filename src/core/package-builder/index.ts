import { mkdir, rmdir, writeFile } from "fs/promises";
import { resolve } from "path";

import { removeFiles } from "../helpers/remove-helper";
import { Container, IContainer } from "./container";
import { ILang, Lang } from "./lang";

interface IGrouped {
  [key: number]: {
    uuid: string;
    lang: string;
    uuidEntity: string;
  }[];
}

export class PackageBuilder {
  lang(lang: ILang) {
    const entity = new Lang(lang);
    this.#langs.push(entity);
    return entity;
  }

  addPlugin(container: IContainer) {
    this.#packages.push(new Container(container));
  }

  async build() {
    const langsPromise = this.saveLangs();

    await Promise.all([
      removeFiles(resolve(this.#apiWorkDir, "packages")),
      removeFiles(resolve(this.#apiWorkDir, "scripts")),
    ]);

    await Promise.all([this.saveLists(), this.savePlugins(), langsPromise]);
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

  public async saveLists() {
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
