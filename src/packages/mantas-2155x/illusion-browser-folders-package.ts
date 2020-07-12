import { PackageBuilder } from "@/core/package-builder";
import { Lang } from "@/core/package-builder/lang";
import { FileMover } from "@/core/package-builder/movers/file-mover";
import { GitPlacer } from "@/core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "@/core/package-builder/resolvers/vs-resolver";
import { Game } from "@/core/package-builder/types/game";
import { IPackage, IPackageBuilder } from "@/core/package-builder/types/package";

import { BepInExPlugin } from "../bep-in-ex/bep-in-ex-package";

class IllusionBrowserFoldersPlugin implements IPackageBuilder {
  static get Hs2Uuid() {
    return "3c57128a-e135-4824-b970-473d7210eea1";
  }

  static get AiUuid() {
    return "86640c8f-875c-4728-b272-f80a53e6fbd5";
  }

  static get KkUuid() {
    return "66b16a14-4fd9-4fce-9c73-db7b3d74d820";
  }

  get builder() {
    return this.#builder;
  }

  use() {
    this.addForHs2();
    this.addForAi();
    this.addForKk();
  }

  constructor() {
    this.#builder = new PackageBuilder("1865abff-3d7e-44d9-9e25-8ee659439d0a");
    this.#placer = new GitPlacer({ url: "https://github.com/ManlyMarco/Illusion_BrowserFolders" });
    this.#lang = this.#builder.lang({
      uuid: "fd363547-ea54-4db1-a08c-b13a1ae64542",
      name: "BrowserFolders",
      desc: "Maker and Studio File Browser Folders for games by Illusion",
    });
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

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/HS2_BrowserFolders.dll",
          dst: "BepInEx/plugins/HS2_BrowserFolders.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.HS2, uuid: IllusionBrowserFoldersPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
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

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/AI_BrowserFolders.dll",
          dst: "BepInEx/plugins/AI_BrowserFolders.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.AI, uuid: IllusionBrowserFoldersPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/src",
      build: [
        new VSProjectResolver({ file: "src/KK_FolderBrowser/KK_BrowserFolders.csproj", ignore: [] }),
        new VSProjectResolver({ file: "src/KK_Hooks_KK/KK_BrowserFolders_Hooks_KK.csproj", ignore: [] }),
        new VSProjectResolver({ file: "src/KK_Hooks_KKP/KK_BrowserFolders_Hooks_KKP.csproj", ignore: [] }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/KK_BrowserFolders.dll",
          dst: "BepInEx/plugins/KK_BrowserFolders.dll",
        },
        {
          src: "bin/BepInEx/plugins/KK_BrowserFolders_Hooks_KK.dll",
          dst: "BepInEx/plugins/KK_BrowserFolders_Hooks_KK.dll",
        },
        {
          src: "bin/BepInEx/plugins/KK_BrowserFolders_Hooks_KKP.dll",
          dst: "BepInEx/plugins/KK_BrowserFolders_Hooks_KKP.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: IllusionBrowserFoldersPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  #placer: GitPlacer;
  #lang: Lang;
  #builder: PackageBuilder;
}

export const IllusionBrowserFoldersPluginAdd = () => {
  const plugin = new IllusionBrowserFoldersPlugin();
  plugin.use();
  return plugin.builder;
};
