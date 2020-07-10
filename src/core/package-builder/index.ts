import { open, readdir, unlink, writeFile } from "fs/promises";
import { resolve } from "path";

import { Container, IContainer } from "./container";
import { ILang, Lang } from "./lang";

interface IGrouped {
  [key: number]: {
    uuid: string;
    lang: string;
    uuidentity: string;
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
    await this.removeFiles(resolve(this.#apiWorkDir, "packages"));
    await this.saveLists();

    await this.removeFiles(resolve(this.#apiWorkDir, "scripts"));
    await this.savePlugins();

    await this.saveLangs();
  }

  private async removeFiles(path: string) {
    const files = await readdir(path);
    for (const file of files) {
      await unlink(resolve(path, file));
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

  public async saveLists() {
    const groups = this.#packages.reduce<IGrouped>((prev, curr) => {
      for (const game of curr.games) {
        (prev[game.id] = prev[game.id] || []).push({
          uuid: game.uuid,
          lang: curr.lang.uuid,
          uuidentity: curr.uuidentity,
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
    const stream = await open("lang.json", "w");
    await stream.write(
      JSON.stringify(
        Object.fromEntries(
          this.#langs.map((lang) => [
            lang.uuid,
            {
              name: lang.name,
              description: lang.description,
            },
          ])
        )
      )
    );
  }

  #langs: Lang[] = [];
  #packages: Container[] = [];

  #apiWorkDir = "../illusion-plugin-fake-api/public";
}
