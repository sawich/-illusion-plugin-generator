import { PackageBuilder } from "@/core/package-builder";
import { Lang } from "@/core/package-builder/lang";
import { FileMover } from "@/core/package-builder/movers/file-mover";
import { GitPlacer } from "@/core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "@/core/package-builder/resolvers/vs-resolver";
import { Game } from "@/core/package-builder/types/game";
import { IPackageBuilder } from "@/core/package-builder/types/package";

import { BepInExPlugin } from "../bep-in-ex/bep-in-ex-package";
import { ConfigurationManagerPlugin } from "../bep-in-ex/configuration-manager-package";

export class UnlockPlayerHeightPlugin implements IPackageBuilder {
  static get AiUuid() {
    return "16a8a4e7-351c-45df-ab73-ed86ce94b687";
  }

  static get Hs2Uuid() {
    return "abc3e032-9b31-4901-a635-4c98d3938b3d";
  }

  get builder() {
    return this.#builder;
  }

  constructor() {
    this.#builder = new PackageBuilder("6936157a-e285-4596-8538-7e35f5d2b384");
    this.#placer = new GitPlacer({ url: "https://github.com/Mantas-2155X/UnlockPlayerHeight" });
    this.#lang = this.#builder.lang({
      uuid: "4b1fb4d9-cd19-42ce-9ac1-2018ef1e631f",
      name: "UnlockPlayerHeight",
      desc:
        "This plugin unlocks the players (or male chara) height hard lock of 75 and adds a male height slider to the maker",
    });
  }

  use() {
    this.addForAi();
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "AI_UnlockPlayerHeight/AI_UnlockPlayerHeight.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "_bin/AI/BepInEx/plugins/2155X/AI_UnlockPlayerHeight.dll",
          dst: "BepInEx/plugins/2155X/AI_UnlockPlayerHeight.dll",
        },
      ],
    });

    this.#builder.use({
      games: [
        {
          id: Game.AI,
          uuid: UnlockPlayerHeightPlugin.AiUuid,
          deps: [BepInExPlugin.AiUuid, ConfigurationManagerPlugin.AiUuid],
        },
      ],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "HS2_UnlockPlayerHeight/HS2_UnlockPlayerHeight.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "_bin/AI/BepInEx/plugins/2155X/HS2_UnlockPlayerHeight.dll",
          dst: "BepInEx/plugins/2155X/HS2_UnlockPlayerHeight.dll",
        },
      ],
    });

    this.#builder.use({
      games: [
        {
          id: Game.HS2,
          uuid: UnlockPlayerHeightPlugin.Hs2Uuid,
          deps: [BepInExPlugin.Hs2Uuid, ConfigurationManagerPlugin.Hs2Uuid],
        },
      ],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  #lang: Lang;
  #builder: PackageBuilder;
  #placer: GitPlacer;
}

export const UnlockPlayerHeightPluginAdd = () => {
  const plugin = new UnlockPlayerHeightPlugin();
  plugin.use();
  return plugin.builder;
};
