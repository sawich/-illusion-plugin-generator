import { PackageBuilder } from "@/core/package-builder";
import { Lang } from "@/core/package-builder/lang";
import { FileMover } from "@/core/package-builder/movers/file-mover";
import { GitPlacer } from "@/core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "@/core/package-builder/resolvers/vs-resolver";
import { Game } from "@/core/package-builder/types/game";
import { IPackageBuilder } from "@/core/package-builder/types/package";

import { BepInExPlugin } from "./bep-in-ex-package";

export class ConfigurationManagerPlugin implements IPackageBuilder {
  static get PhUuid() {
    return "852e2807-85d6-4826-ac90-0f62910c63f5";
  }

  static get Hs1Uuid() {
    return "7427d5a7-1ff8-41d1-8d7d-fe57eaee7998";
  }

  static get KkUuid() {
    return "a0088b70-3f30-4fae-87b9-1cd0eba71333";
  }

  static get AiUuid() {
    return "2fa9504d-5ed5-4cbf-b12f-dc61467ecb91";
  }

  static get Hs2Uuid() {
    return "78402dca-9897-4e76-ae02-ee349a511110";
  }

  get builder() {
    return this.#builder;
  }

  constructor() {
    this.#builder = new PackageBuilder("31388055-2886-40f7-9b43-c6ae146875da");
    this.#lang = this.#builder.lang({
      uuid: "c3db40bf-d97d-4cd4-859c-9dd453f5e789",
      name: "BepInEx.ConfigurationManager",
      desc: "Mod configuration manager for BepInEx 5",
    });
  }

  use() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "ConfigurationManager/ConfigurationManager.csproj",
          ignore: [
            "UnityEngine",
            "0Harmony",
            "Mono.Cecil",
            "Mono.Cecil.Mdb",
            "Mono.Cecil.Pdb",
            "Mono.Cecil.Rocks",
            "MonoMod.RuntimeDetour",
            "MonoMod.Utils",
          ],
        }),
      ],
    });

    const placer = new GitPlacer({ url: "https://github.com/BepInEx/BepInEx.ConfigurationManager" });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/ConfigurationManager.dll",
          dst: "BepInEx/plugins/ConfigurationManager.dll",
        },
      ],
    });

    this.#builder.use({
      games: [
        { id: Game.PH, uuid: ConfigurationManagerPlugin.PhUuid, deps: [BepInExPlugin.PhUuid] },
        { id: Game.HS1, uuid: ConfigurationManagerPlugin.Hs1Uuid, deps: [BepInExPlugin.Hs1Uuid] },
        { id: Game.KK, uuid: ConfigurationManagerPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] },
        { id: Game.AI, uuid: ConfigurationManagerPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] },
        { id: Game.HS2, uuid: ConfigurationManagerPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] },
      ],
      lang: this.#lang,
      nodes: [placer, resolver, mover],
    });
  }

  #lang: Lang;
  #builder: PackageBuilder;
}

export const ConfigurationManagerPluginAdd = () => {
  const plugin = new ConfigurationManagerPlugin();
  plugin.use();
  return plugin.builder;
};

export const BepInExPluginAdd = () => {
  const plugin = new BepInExPlugin();
  plugin.use();
  return plugin.builder;
};
