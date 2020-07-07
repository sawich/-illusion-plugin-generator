import { Lang } from "../core/package-builder/lang";
import { Game } from "../core/package-builder/types/game";
import { GitPlacer } from "../core/package-builder/places/git-placer";
import { PackageBuilder } from "../core/package-builder";
import { IContainer } from "../core/package-builder/container";
import { VSResolver, VSProjectResolver } from "../core/package-builder/resolvers/vs-resolver";

class BepInExPlugin {
  constructor(builder: PackageBuilder) {
    this.#builder = builder;
    this.#lang = builder.lang({ uuid: this.#uuid, name: "BepInEx", desc: "Bepis Injector Extensible" });
  }

  Use() {
    const resolver = new VSResolver({
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
      build: [
        new VSProjectResolver("submodules/BepInEx.Harmony/BepInEx.Harmony/BepInEx.Harmony.csproj"),
        new VSProjectResolver("BepInEx/BepInEx.csproj"),
        new VSProjectResolver("BepInEx.Preloader/BepInEx.Preloader.csproj"),
      ],
    });

    const info: IContainer = {
      games: [Game.PH, Game.HS1, Game.KK, Game.AI, Game.HS2],
      lang: this.#lang,
      uuid: this.#uuid,
      placer: new GitPlacer({ url: "https://github.com/BepInEx/BepInEx" }),
      resolver,
      deps: [],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #builder: PackageBuilder;
  #uuid = "2f94706f-97e3-4274-8ed1-53fbd1c82498";
}

export class ConfigurationManagerPlugin {
  constructor(builder: PackageBuilder) {
    this.#builder = builder;
    this.#lang = builder.lang({
      uuid: this.#uuid,
      name: "BepInEx.ConfigurationManager",
      desc: "Mod configuration manager for BepInEx 5",
    });
  }

  Use() {
    const resolver = new VSResolver({
      files: [
        {
          src: "bin/BepInEx/plugins/ConfigurationManager.dll",
          dst: "BepInEx/plugins/ConfigurationManager.dll",
        },
      ],
      build: [new VSProjectResolver("ConfigurationManager/ConfigurationManager.csproj")],
    });

    const info: IContainer = {
      games: [Game.PH, Game.HS1, Game.KK, Game.AI, Game.HS2],
      lang: this.#lang,
      uuid: this.#uuid,
      placer: new GitPlacer({ url: "https://github.com/BepInEx/BepInEx.ConfigurationManager" }),
      resolver,
      deps: ["2f94706f-97e3-4274-8ed1-53fbd1c82498"],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #builder: PackageBuilder;
  #uuid = "31388055-2886-40f7-9b43-c6ae146875da";
}

export const ConfigurationManagerPluginAdd = (builder: PackageBuilder) => {
  const plugin = new ConfigurationManagerPlugin(builder);
  plugin.Use();
};

export const BepInExPluginAdd = (builder: PackageBuilder) => {
  const plugin = new BepInExPlugin(builder);
  plugin.Use();
};
