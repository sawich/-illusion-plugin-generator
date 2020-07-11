import { PackageBuilder } from "../core/package-builder";
import { Lang } from "../core/package-builder/lang";
import { FileMover } from "../core/package-builder/movers/file-mover";
import { GitPlacer } from "../core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "../core/package-builder/resolvers/vs-resolver";
import { Game } from "../core/package-builder/types/game";
import { IPackageBuilder } from "../core/package-builder/types/package";
import { BepInExPlugin, ConfigurationManagerPlugin } from "./bep-in-ex-package";

export class HCharaSwitcherPlugin implements IPackageBuilder {
  static get Hs2Uuid() {
    return "f72d5253-c424-4910-8d5f-7ad96a34710d";
  }

  get builder() {
    return this.#builder;
  }

  use() {
    this.addForHs2();
  }

  constructor() {
    this.#builder = new PackageBuilder("4b11249a-f9a8-46d0-b372-748eb61091fe");
    this.#lang = this.#builder.lang({
      uuid: "1b4bb2d6-87e2-45fa-aee7-a27bba9f5342",
      name: "HCharaSwitcher",
      desc: "This plugin allows you to change character cards during H scene",
    });
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "HS2_HCharaSwitcher/HS2_HCharaSwitcher.csproj",
          ignore: [],
        }),
      ],
    });

    const placer = new GitPlacer({ url: "https://github.com/Mantas-2155X/HCharaSwitcher" });

    const mover = new FileMover({
      files: [
        {
          src: "_bin/HS2/BepInEx/plugins/2155X/HS2_HCharaSwitcher.dll",
          dst: "BepInEx/plugins/2155X/HS2_HCharaSwitcher.dll",
        },
      ],
    });

    this.#builder.use({
      games: [
        {
          id: Game.HS2,
          uuid: HCharaSwitcherPlugin.Hs2Uuid,
          deps: [BepInExPlugin.Hs2Uuid, ConfigurationManagerPlugin.Hs2Uuid],
        },
      ],
      lang: this.#lang,
      nodes: [placer, resolver, mover],
    });
  }

  #lang: Lang;
  #builder: PackageBuilder;
}

export const HCharaSwitcherPluginAdd = () => {
  const plugin = new HCharaSwitcherPlugin();
  plugin.use();
  return plugin.builder;
};
