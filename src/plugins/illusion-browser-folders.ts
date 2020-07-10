import { PackageBuilder } from "../core/package-builder";
import { IContainer } from "../core/package-builder/container";
import { Lang } from "../core/package-builder/lang";
import { FileMover } from "../core/package-builder/movers/file-mover";
import { GitPlacer } from "../core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "../core/package-builder/resolvers/vs-resolver";
import { Game } from "../core/package-builder/types/game";

class IllusionBrowserFoldersPlugin {
  constructor(builder: PackageBuilder) {
    this.#builder = builder;
    this.#lang = builder.lang({
      uuid: this.#langUuid,
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
          file: "src/HS2_BrowserFolders/HS2_BrowserFolders.csproj",
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
      games: [Game.HS2],
      lang: this.#lang,
      uuid: this.#hs2Uuid,
      uuidentity: this.#uuidentity,
      nodes: [placer, resolver, mover],
      deps: [],
    };

    this.#builder.addPlugin(info);
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/src",
      build: [
        new VSProjectResolver({
          file: "src/AI_BrowserFolders/AI_BrowserFolders.csproj",
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
      games: [Game.AI],
      lang: this.#lang,
      uuid: this.#aiUuid,
      uuidentity: this.#uuidentity,
      nodes: [placer, resolver, mover],
      deps: [],
    };

    this.#builder.addPlugin(info);
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/src",
      build: [
        new VSProjectResolver({
          file: "src/KK_FolderBrowser/KK_BrowserFolders.csproj",
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
      games: [Game.KK],
      lang: this.#lang,
      uuid: this.#kkUuid,
      uuidentity: this.#uuidentity,
      nodes: [placer, resolver, mover],
      deps: [],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #builder: PackageBuilder;

  #langUuid = "fd363547-ea54-4db1-a08c-b13a1ae64542";

  #hs2Uuid = "3c57128a-e135-4824-b970-473d7210eea1";
  #aiUuid = "86640c8f-875c-4728-b272-f80a53e6fbd5";
  #kkUuid = "66b16a14-4fd9-4fce-9c73-db7b3d74d820";

  #uuidentity = "1865abff-3d7e-44d9-9e25-8ee659439d0a";
}

export const IllusionBrowserFoldersPluginAdd = (builder: PackageBuilder) => {
  const plugin = new IllusionBrowserFoldersPlugin(builder);
  plugin.Use();
};
