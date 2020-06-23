import { PluginGameType } from "../types/plugin-game-type";
import { PluginResolver } from "../plugin-resolver";
import { IBuildable } from "../types/buildable";
import { IdEntity } from "../id-entity";
import { Plugin } from "../plugin";
import { ProjectGitPartialPlugin } from "./project-git-partial-plugin";

export class GitPartialPlugin extends IdEntity implements IBuildable {
  get url() {
    return this.#url;
  }

  addDependence(...plugins: Plugin[]) {
    this.#dependencies.push(...plugins);
  }

  addProject(lang: number, games: PluginGameType[], resolver: PluginResolver, folder: string) {
    const item = new ProjectGitPartialPlugin(lang, games, resolver, folder, this);
    item.addDependence(...this.#dependencies);
    this.#projects.push(item);
    return item;
  }

  build() {
    return this.#projects.map((p) => p.build());
  }

  constructor(url: string) {
    super();

    this.#url = url;
  }

  #url: string;
  #projects: ProjectGitPartialPlugin[] = [];
  #dependencies: Plugin[] = [];
}
