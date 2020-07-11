import { PackageBuilder } from "../core/package-builder";
import { Lang } from "../core/package-builder/lang";
import { FileMover } from "../core/package-builder/movers/file-mover";
import { GitPlacer } from "../core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "../core/package-builder/resolvers/vs-resolver";
import { Game } from "../core/package-builder/types/game";
import { IPackageBuilder } from "../core/package-builder/types/package";
import { BepInExPlugin, ConfigurationManagerPlugin } from "./bep-in-ex-package";

export class BetterHScenesPlugin implements IPackageBuilder {
  static get Hs2Uuid() {
    return "4bc31922-a273-4cbb-b0b2-5cb565e58790";
  }

  static get AiUuid() {
    return "504f6621-0861-4f2f-bf8d-f8ad3d6c3558";
  }

  get builder() {
    return this.#builder;
  }

  use() {
    this.addForHs2();
    this.addForAi();
  }

  constructor() {
    this.#builder = new PackageBuilder("22b08948-99f4-4ef0-86a5-b20506c1ca61");
    this.#lang = this.#builder.lang({
      uuid: "1885f293-ed59-4ec2-8746-14625a9c2ab3",
      name: "BetterHScenes",
      desc: "This plugin fixes HScene performance bugs and adds extra features",
    });
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "HS2_BetterHScenes/HS2_BetterHScenes.csproj",
          ignore: [],
        }),
      ],
    });

    const placer = new GitPlacer({ url: "https://github.com/Mantas-2155X/BetterHScenes" });

    const mover = new FileMover({
      files: [
        {
          src: "_bin/HS2/BepInEx/plugins/2155X/HS2_BetterHScenes.dll",
          dst: "BepInEx/plugins/2155X/HS2_BetterHScenes.dll",
        },
      ],
    });

    this.#builder.use({
      games: [
        {
          id: Game.HS2,
          uuid: BetterHScenesPlugin.Hs2Uuid,
          deps: [BepInExPlugin.Hs2Uuid, ConfigurationManagerPlugin.Hs2Uuid],
        },
      ],
      lang: this.#lang,
      nodes: [placer, resolver, mover],
    });
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "AI_BetterHScenes/AI_BetterHScenes.csproj",
          ignore: [],
        }),
      ],
    });

    const placer = new GitPlacer({ url: "https://github.com/Mantas-2155X/BetterHScenes" });

    const mover = new FileMover({
      files: [
        {
          src: "_bin/HS2/BepInEx/plugins/2155X/AI_BetterHScenes.dll",
          dst: "BepInEx/plugins/2155X/AI_BetterHScenes.dll",
        },
      ],
    });

    this.#builder.use({
      games: [
        {
          id: Game.AI,
          uuid: BetterHScenesPlugin.AiUuid,
          deps: [BepInExPlugin.AiUuid, ConfigurationManagerPlugin.AiUuid],
        },
      ],
      lang: this.#lang,
      nodes: [placer, resolver, mover],
    });
  }

  #lang: Lang;
  #builder: PackageBuilder;
}

export const BetterHScenesPluginAdd = () => {
  const plugin = new BetterHScenesPlugin();
  plugin.use();
  return plugin.builder;
};
