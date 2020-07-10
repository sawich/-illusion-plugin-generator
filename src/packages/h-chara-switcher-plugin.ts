import { PackageBuilder } from "../core/package-builder";
import { IContainer } from "../core/package-builder/container";
import { Lang } from "../core/package-builder/lang";
import { FileMover } from "../core/package-builder/movers/file-mover";
import { GitPlacer } from "../core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "../core/package-builder/resolvers/vs-resolver";
import { Game } from "../core/package-builder/types/game";
import { IPackage } from "../core/package-builder/types/package";
import { BepInExPlugin, ConfigurationManagerPlugin } from "./bep-in-ex-plugin";

export class HCharaSwitcherPlugin implements IPackage {
  static get Hs2Uuid() {
    return "f72d5253-c424-4910-8d5f-7ad96a34710d";
  }

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
          uuid: HCharaSwitcherPlugin.Hs2Uuid,
          deps: [BepInExPlugin.Hs2Uuid, ConfigurationManagerPlugin.Hs2Uuid],
        },
      ],
      lang: this.#lang,
      uuidEntity: this.#uuidEntity,
      nodes: [placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #builder: PackageBuilder;

  #uuidEntity = "4b11249a-f9a8-46d0-b372-748eb61091fe";
}

export const HCharaSwitcherPluginAdd = (builder: PackageBuilder) => {
  const plugin = new HCharaSwitcherPlugin(builder);
  plugin.Use();
};
