import { Lang } from "../core/package-builder/lang";
import { Game } from "../core/package-builder/types/game";
import { GitPlacer } from "../core/package-builder/places/git-placer";
import { PackageBuilder } from "../core/package-builder";
import { IContainer } from "../core/package-builder/container";
import { VSProjectResolver, VSResolver } from "../core/package-builder/resolvers/vs-resolver";
import { FileMover } from "../core/package-builder/movers/file-mover";

class BetterHScenesPlugin {
  constructor(builder: PackageBuilder) {
    this.#builder = builder;
    this.#lang = builder.lang({
      uuid: this.#langUuid,
      name: "BetterHScenes",
      desc: "This plugin fixes HScene performance bugs and adds extra features",
    });
  }

  Use() {
    this.addForHs2();
    this.addForAi();
  }

  private addForHs2() {
    const resolver = new VSResolver({
      build: [new VSProjectResolver("HS2_BetterHScenes/HS2_BetterHScenes.csproj")],
    });

    const placer = new GitPlacer({ url: "https://github.com/Mantas-2155X/BetterHScenes" });

    const mover = new FileMover({
      files: [
        {
          src: "bin/HS2_BetterHScenes.dll",
          dst: "BepInEx/plugins/2155X/HS2_BetterHScenes.dll",
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
      build: [new VSProjectResolver("AI_BetterHScenes/AI_BetterHScenes.csproj")],
    });

    const placer = new GitPlacer({ url: "https://github.com/Mantas-2155X/BetterHScenes" });

    const mover = new FileMover({
      files: [
        {
          src: "bin/AI_BetterHScenes.dll",
          dst: "BepInEx/plugins/2155X/AI_BetterHScenes.dll",
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

  #lang: Lang;
  #builder: PackageBuilder;
  #langUuid = "1885f293-ed59-4ec2-8746-14625a9c2ab3";
  #hs2Uuid = "4bc31922-a273-4cbb-b0b2-5cb565e58790";
  #aiUuid = "504f6621-0861-4f2f-bf8d-f8ad3d6c3558";

  #uuidentity = "22b08948-99f4-4ef0-86a5-b20506c1ca61";
}

export const BetterHScenesPluginAdd = (builder: PackageBuilder) => {
  const plugin = new BetterHScenesPlugin(builder);
  plugin.Use();
};
