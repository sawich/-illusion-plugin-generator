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
      uuid: this.#uuid,
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
      games: [Game.HS2],
      lang: this.#lang,
      uuid: this.#uuid,
      uuidentity: this.#uuid,
      nodes: [placer, resolver, mover],
      deps: ["2f94706f-97e3-4274-8ed1-53fbd1c82498", "31388055-2886-40f7-9b43-c6ae146875da"],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #builder: PackageBuilder;

  #uuid = "4b11249a-f9a8-46d0-b372-748eb61091fe";
}

export const HCharaSwitcherPluginAdd = (builder: PackageBuilder) => {
  const plugin = new HCharaSwitcherPlugin(builder);
  plugin.Use();
};
