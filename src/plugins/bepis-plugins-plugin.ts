import { PackageBuilder } from "../core/package-builder";
import { IContainer } from "../core/package-builder/container";
import { Lang } from "../core/package-builder/lang";
import { FileMover } from "../core/package-builder/movers/file-mover";
import { GitPlacer } from "../core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "../core/package-builder/resolvers/vs-resolver";
import { Game } from "../core/package-builder/types/game";

interface IPlugin {
  Use(): void;
}

interface IParams {
  builder: PackageBuilder;
  uuidentity: string;
  placer: GitPlacer;
}

class BgmLoaderPlugin implements IPlugin {
  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: this.#uuidLang,
      name: "BGMLoader",
      desc:
        "Loads custom BGMs and clips played on game startup. Stock audio is replaced during runtime by custom clips from BepInEx\\BGM and BepInEx\\IntroClips directories",
    });
    this.#uuidentity = info.uuidentity;
    this.#placer = info.placer;
  }

  Use() {
    this.addForKk();
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

    const info: IContainer = {
      games: [{ id: Game.KK, uuid: "15e503a0-fbda-46e9-9bd7-68ce6578d818", deps: [] }],
      lang: this.#lang,
      uuidentity: this.#uuidentity,
      nodes: [this.#placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidentity: string;

  #uuidLang = "4df25152-dc91-4b31-bfa4-904447a02a85";
}

class ColorCorrectorPlugin implements IPlugin {
  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: this.#uuidLang,
      name: "ColorCorrector",
      desc: "Allows configuration of some post-processing filters. (change of bloom amount, disable saturation filter)",
    });
    this.#uuidentity = info.uuidentity;
    this.#placer = info.placer;
  }

  Use() {
    this.addForKk();
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

    const info: IContainer = {
      games: [{ id: Game.KK, uuid: "e0a9d3b3-9809-41f2-9c1c-fbb935239b0a", deps: [] }],
      lang: this.#lang,
      uuidentity: this.#uuidentity,
      nodes: [this.#placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidentity: string;

  #uuidLang = "54daee20-d190-42ff-9756-438798cec16c";
}

class BepisPluginsPlugin implements IPlugin {
  constructor(builder: PackageBuilder) {
    const uuidentity = "0f70a52f-c506-4697-bd5f-0304e9f30c4a";
    const placer = new GitPlacer({ url: "https://github.com/IllusionMods/BepisPlugins" });
    this.#plugins.push(
      new BgmLoaderPlugin({ builder, uuidentity, placer }),
      new ColorCorrectorPlugin({ builder, uuidentity, placer })
    );
  }

  Use() {
    for (const plugin of this.#plugins) {
      plugin.Use();
    }
  }

  #plugins: IPlugin[] = [];
}

export const BepisPluginsPluginAdd = (builder: PackageBuilder) => {
  const plugin = new BepisPluginsPlugin(builder);
  plugin.Use();
};
