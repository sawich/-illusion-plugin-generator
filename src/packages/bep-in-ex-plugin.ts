import { PackageBuilder } from "../core/package-builder";
import { IContainer } from "../core/package-builder/container";
import { Lang } from "../core/package-builder/lang";
import { FileMover } from "../core/package-builder/movers/file-mover";
import { GitPlacer } from "../core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "../core/package-builder/resolvers/vs-resolver";
import { Game } from "../core/package-builder/types/game";
import { IPackage } from "../core/package-builder/types/package";

export class BepInExPlugin implements IPackage {
  static get PhUuid() {
    return "0dd5a5bc-5bec-4706-8ea6-30f1e029016f";
  }

  static get Hs1Uuid() {
    return "17a9f3ce-b426-4357-ba70-b0d882754c24";
  }

  static get KkUuid() {
    return "07259b2c-efb9-479d-a9e7-46f0c6c4dceb";
  }

  static get AiUuid() {
    return "6665aecd-9eef-4856-b941-4bc397d80eff";
  }

  static get Hs2Uuid() {
    return "83f46fb9-a52d-45a4-8823-3858d3e4c605";
  }

  constructor(builder: PackageBuilder) {
    this.#builder = builder;
    this.#lang = builder.lang({ uuid: this.#uuidLang, name: "BepInEx", desc: "Bepis Injector Extensible" });
  }

  Use() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "BepInEx/BepInEx.csproj",
          ignore: ["UnityEngine"],
        }),
        new VSProjectResolver({
          file: "BepInEx.Preloader/BepInEx.Preloader.csproj",
          ignore: [],
        }),
      ],
    });

    const placer = new GitPlacer({ url: "https://github.com/BepInEx/BepInEx" });

    const mover = new FileMover({
      files: [
        { src: "bin/0Harmony.dll", dst: "BepInEx/core/0Harmony.dll" },
        { src: "bin/BepInEx.dll", dst: "BepInEx/core/BepInEx.dll" },
        { src: "bin/BepInEx.Harmony.dll", dst: "BepInEx/core/BepInEx.Harmony.dll" },
        { src: "bin/BepInEx.Preloader.dll", dst: "BepInEx/core/BepInEx.Preloader.dll" },
        { src: "bin/Mono.Cecil.dll", dst: "BepInEx/core/Mono.Cecil.dll" },
        { src: "bin/Mono.Cecil.Mdb.dll", dst: "BepInEx/core/Mono.Cecil.Mdb.dll" },
        { src: "bin/Mono.Cecil.Pdb.dll", dst: "BepInEx/core/Mono.Cecil.Pdb.dll" },
        { src: "bin/Mono.Cecil.Rocks.dll", dst: "BepInEx/core/Mono.Cecil.Rocks.dll" },
        { src: "bin/MonoMod.RuntimeDetour.dll", dst: "BepInEx/core/MonoMod.RuntimeDetour.dll" },
        { src: "bin/MonoMod.Utils.dll", dst: "BepInEx/core/MonoMod.Utils.dll" },
        { src: "bin/0Harmony.xml", dst: "BepInEx/core/0Harmony.xml" },
        { src: "bin/BepInEx.Harmony.xml", dst: "BepInEx/core/BepInEx.Harmony.xml" },
        { src: "bin/BepInEx.Preloader.xml", dst: "BepInEx/core/BepInEx.Preloader.xml" },
        { src: "bin/BepInEx.xml", dst: "BepInEx/core/BepInEx.xml" },
        { src: "bin/MonoMod.RuntimeDetour.xml", dst: "BepInEx/core/MonoMod.RuntimeDetour.xml" },
        { src: "bin/MonoMod.Utils.xml", dst: "BepInEx/core/MonoMod.Utils.xml" },
      ],
    });

    const info: IContainer = {
      games: [
        { id: Game.PH, uuid: BepInExPlugin.PhUuid, deps: [] },
        { id: Game.HS1, uuid: BepInExPlugin.Hs1Uuid, deps: [] },
        { id: Game.KK, uuid: BepInExPlugin.KkUuid, deps: [] },
        { id: Game.AI, uuid: BepInExPlugin.AiUuid, deps: [] },
        { id: Game.HS2, uuid: BepInExPlugin.Hs2Uuid, deps: [] },
      ],
      lang: this.#lang,
      uuidEntity: this.#uuidEntity,
      nodes: [placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #builder: PackageBuilder;
  #uuidLang = "e30cfeba-c751-4dbb-a350-1209acd960e1";
  #uuidEntity = "2f94706f-97e3-4274-8ed1-53fbd1c82498";
}

export class ConfigurationManagerPlugin implements IPackage {
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

  constructor(builder: PackageBuilder) {
    this.#builder = builder;
    this.#lang = builder.lang({
      uuid: this.#uuidLang,
      name: "BepInEx.ConfigurationManager",
      desc: "Mod configuration manager for BepInEx 5",
    });
  }

  Use() {
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

    const info: IContainer = {
      games: [
        { id: Game.PH, uuid: ConfigurationManagerPlugin.PhUuid, deps: [BepInExPlugin.PhUuid] },
        { id: Game.HS1, uuid: ConfigurationManagerPlugin.Hs1Uuid, deps: [BepInExPlugin.Hs1Uuid] },
        { id: Game.KK, uuid: ConfigurationManagerPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] },
        { id: Game.AI, uuid: ConfigurationManagerPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] },
        { id: Game.HS2, uuid: ConfigurationManagerPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] },
      ],
      lang: this.#lang,
      uuidEntity: this.#uuidEntity,
      nodes: [placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #builder: PackageBuilder;

  #uuidLang = "c3db40bf-d97d-4cd4-859c-9dd453f5e789";
  #uuidEntity = "31388055-2886-40f7-9b43-c6ae146875da";
}

export const ConfigurationManagerPluginAdd = (builder: PackageBuilder) => {
  const plugin = new ConfigurationManagerPlugin(builder);
  plugin.Use();
};

export const BepInExPluginAdd = (builder: PackageBuilder) => {
  const plugin = new BepInExPlugin(builder);
  plugin.Use();
};
