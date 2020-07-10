import { PackageBuilder } from "../core/package-builder";
import { IContainer } from "../core/package-builder/container";
import { Lang } from "../core/package-builder/lang";
import { FileMover } from "../core/package-builder/movers/file-mover";
import { GitPlacer } from "../core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "../core/package-builder/resolvers/vs-resolver";
import { Game } from "../core/package-builder/types/game";

class HCharaSwitcherPlugin {
  constructor(builder: PackageBuilder) {
    this.#builder = builder;
    this.#lang = builder.lang({
      uuid: "1b4bb2d6-87e2-45fa-aee7-a27bba9f5342",
      name: "HCharaSwitcher",
      desc: "This plugin allows you to change character cards during H scene",
    });
  }

  Use() {
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

    const info: IContainer = {
      games: [
        {
          id: Game.HS2,
          uuid: "f72d5253-c424-4910-8d5f-7ad96a34710d",
          deps: ["83f46fb9-a52d-45a4-8823-3858d3e4c605", "78402dca-9897-4e76-ae02-ee349a511110"],
        },
      ],
      lang: this.#lang,
      uuidentity: this.#uuidentity,
      nodes: [placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #builder: PackageBuilder;

  #uuidentity = "4b11249a-f9a8-46d0-b372-748eb61091fe";
}

export const HCharaSwitcherPluginAdd = (builder: PackageBuilder) => {
  const plugin = new HCharaSwitcherPlugin(builder);
  plugin.Use();
};
