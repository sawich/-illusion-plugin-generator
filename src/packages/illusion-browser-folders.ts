import { PackageBuilder } from "../core/package-builder";
import { IContainer } from "../core/package-builder/container";
import { Lang } from "../core/package-builder/lang";
import { FileMover } from "../core/package-builder/movers/file-mover";
import { GitPlacer } from "../core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "../core/package-builder/resolvers/vs-resolver";
import { Game } from "../core/package-builder/types/game";
import { IPackage } from "../core/package-builder/types/package";
import { BepInExPlugin } from "./bep-in-ex-plugin";

class IllusionBrowserFoldersPlugin implements IPackage {
  static get Hs2Uuid() {
    return "3c57128a-e135-4824-b970-473d7210eea1";
  }

  static get AiUuid() {
    return "86640c8f-875c-4728-b272-f80a53e6fbd5";
  }

  static get KkUuid() {
    return "66b16a14-4fd9-4fce-9c73-db7b3d74d820";
  }

  constructor(builder: PackageBuilder) {
    this.#builder = builder;
    this.#lang = builder.lang({
      uuid: "fd363547-ea54-4db1-a08c-b13a1ae64542",
      name: "BrowserFolders",
      desc: "Maker and Studio File Browser Folders for games by Illusion",
    });
  }

  Use() {
    this.addForHs2();
    this.addForAi();
    this.addForKk();
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/src",
      build: [
        new VSProjectResolver({
          file: "../HS2_BrowserFolders/HS2_BrowserFolders.csproj",
          ignore: [],
        }),
      ],
    });

    const placer = new GitPlacer({ url: "https://github.com/ManlyMarco/Illusion_BrowserFolders" });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/HS2_BrowserFolders.dll",
          dst: "BepInEx/plugins/HS2_BrowserFolders.dll",
        },
      ],
    });

    const info: IContainer = {
      games: [{ id: Game.HS2, uuid: IllusionBrowserFoldersPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] }],
      lang: this.#lang,
      uuidEntity: this.#uuidEntity,
      nodes: [placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/src",
      build: [
        new VSProjectResolver({
          file: "../AI_BrowserFolders/AI_BrowserFolders.csproj",
          ignore: [],
        }),
      ],
    });

    const placer = new GitPlacer({ url: "https://github.com/ManlyMarco/Illusion_BrowserFolders" });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/AI_BrowserFolders.dll",
          dst: "BepInEx/plugins/AI_BrowserFolders.dll",
        },
      ],
    });

    const info: IContainer = {
      games: [{ id: Game.AI, uuid: IllusionBrowserFoldersPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      uuidEntity: this.#uuidEntity,
      nodes: [placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/src",
      build: [
        new VSProjectResolver({
          file: "../KK_FolderBrowser/KK_BrowserFolders.csproj",
          ignore: [],
        }),
      ],
    });

    const placer = new GitPlacer({ url: "https://github.com/ManlyMarco/Illusion_BrowserFolders" });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/KK_BrowserFolders.dll",
          dst: "BepInEx/plugins/KK_BrowserFolders.dll",
        },
      ],
    });

    const info: IContainer = {
      games: [{ id: Game.KK, uuid: IllusionBrowserFoldersPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      uuidEntity: this.#uuidEntity,
      nodes: [placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #builder: PackageBuilder;

  #uuidEntity = "1865abff-3d7e-44d9-9e25-8ee659439d0a";
}

export const IllusionBrowserFoldersPluginAdd = (builder: PackageBuilder) => {
  const plugin = new IllusionBrowserFoldersPlugin(builder);
  plugin.Use();
};
