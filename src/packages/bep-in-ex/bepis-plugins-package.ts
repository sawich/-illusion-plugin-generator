import { PackageBuilder } from "@/core/package-builder";
import { Lang } from "@/core/package-builder/lang";
import { FileMover } from "@/core/package-builder/movers/file-mover";
import { GitPlacer } from "@/core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "@/core/package-builder/resolvers/vs-resolver";
import { Game } from "@/core/package-builder/types/game";
import { IPackage } from "@/core/package-builder/types/package";

interface IParams {
  builder: PackageBuilder;
  placer: GitPlacer;
}

class BgmLoaderPlugin implements IPackage {
  static get kkUuid() {
    return "15e503a0-fbda-46e9-9bd7-68ce6578d818";
  }

  use() {
    this.addForKk();
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "4df25152-dc91-4b31-bfa4-904447a02a85",
      name: "BGMLoader",
      desc:
        "Loads custom BGMs and clips played on game startup. Stock audio is replaced during runtime by custom clips from BepInEx\\BGM and BepInEx\\IntroClips directories",
    });
    this.#placer = info.placer;
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_BGMLoader/KK_BGMLoader.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/KK_BepisPlugins/BGMLoader.dll",
          dst: "BepInEx/plugins/KK_BepisPlugins/BGMLoader.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: BgmLoaderPlugin.kkUuid, deps: [] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

class ColorCorrectorPlugin implements IPackage {
  static get kkUuid() {
    return "e0a9d3b3-9809-41f2-9c1c-fbb935239b0a";
  }

  use() {
    this.addForKk();
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "54daee20-d190-42ff-9756-438798cec16c",
      name: "ColorCorrector",
      desc: "Allows configuration of some post-processing filters. (change of bloom amount, disable saturation filter)",
    });
    this.#placer = info.placer;
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_ColorCorrector/KK_ColorCorrector.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/KK_BepisPlugins/ColorCorrector.dll",
          dst: "BepInEx/plugins/KK_BepisPlugins/ColorCorrector.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: "e0a9d3b3-9809-41f2-9c1c-fbb935239b0a", deps: [] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

class BepisPluginsPlugin implements IPackage {
  get builder() {
    return this.#builder;
  }

  use() {
    for (const pack of this.#packages) {
      pack.use();
    }
  }

  constructor() {
    this.#builder = new PackageBuilder("0f70a52f-c506-4697-bd5f-0304e9f30c4a");
    const placer = new GitPlacer({ url: "https://github.com/IllusionMods/BepisPlugins" });

    this.#packages.push(
      new BgmLoaderPlugin({ builder: this.#builder, placer }),
      new ColorCorrectorPlugin({ builder: this.#builder, placer })
    );
  }

  #builder: PackageBuilder;
  #packages: IPackage[] = [];
}

export const BepisPluginsPluginAdd = () => {
  const plugin = new BepisPluginsPlugin();
  plugin.use();
  return plugin.builder;
};
