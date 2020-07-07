import { Container, IContainer } from "./container";
import { open, writeFile, unlink, readdir } from "fs/promises";
import { Lang, ILang } from "./lang";
import { resolve } from "path";

interface IGrouped {
  [key: number]: string[];
}

export class PackageBuilder {
  lang(lang: ILang) {
    const entity = new Lang(lang);
    this.#langs.push(entity);
    return entity;
  }

  addPlugin(container: IContainer) {
    this.#plugins.push(new Container(container));
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
    for (const plugin of this.#plugins) {
      const builded = plugin.build();

      const path = resolve(this.#apiWorkDir, "scripts", `${builded.uuid}.json`);
      writeFile(path, JSON.stringify(builded), "utf-8");
    }
  }

  public async saveLists() {
    const groups = this.#plugins.reduce<IGrouped>((prev, curr) => {
      for (const game of curr.games) {
        (prev[game] = prev[game] || []).push(curr.uuid);
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
  #plugins: Container[] = [];

  #apiWorkDir = "../illusion-plugin-fake-api/public";
}
