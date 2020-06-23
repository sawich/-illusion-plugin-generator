import { GitPartialPlugin } from "./plugins/git-partial-plugin";
import { PluginGameType } from "./types/plugin-game-type";
import { PluginResolver } from "./plugin-resolver";
import { GitPlugin } from "./plugins/git-plugin";
import { IBuildable } from "./types/buildable";
import { GitTool } from "./tools/git-tool";
import { open } from "fs/promises";
import { Unique } from "./unique";
import { Lang } from "./lang";

export class PackageBuilder {
  lang(name: string, description: string) {
    this.#langs.push(new Lang(name, description));
    return this.#lang.next().value as number;
  }

  async build() {
    {
      const stream = await open("../illusion-plugin-manager/public/packages.json", "w");
      await stream.write(JSON.stringify(this.#plugins.flatMap((p) => p.build())));
    }
    {
      const stream = await open("lang.json", "w");
      await stream.write(JSON.stringify(this.#langs.map((l) => ({ name: l.name, description: l.description }))));
    }
  }

  addGitPartialPlugin(url: string) {
    const item = new GitPartialPlugin(url);
    this.#plugins.push(item);
    return item;
  }

  addGitPlugin(lang: number, games: PluginGameType[] | Set<PluginGameType>, resolver: PluginResolver, url: string) {
    const item = new GitPlugin(lang, games, resolver, url);
    this.#plugins.push(item);
    return item;
  }

  addGitTool(lang: number, resolver: PluginResolver, url: string) {
    const item = new GitTool(lang, resolver, url);
    this.#plugins.push(item);
    return item;
  }

  #langs: Lang[] = [];
  #lang = Unique.idGenerator();
  #plugins: IBuildable[] = [];
}
