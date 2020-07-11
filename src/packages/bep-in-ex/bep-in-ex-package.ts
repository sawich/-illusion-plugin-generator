import { PackageBuilder } from "@/core/package-builder";
import { Lang } from "@/core/package-builder/lang";
import { FileMover } from "@/core/package-builder/movers/file-mover";
import { GitPlacer } from "@/core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "@/core/package-builder/resolvers/vs-resolver";
import { Game } from "@/core/package-builder/types/game";
import { IPackageBuilder } from "@/core/package-builder/types/package";

export class BepInExPlugin implements IPackageBuilder {
  static get PhUuid() {
    return "0dd5a5bc-5bec-4706-8ea6-30f1e029016f";
  }

  static get Hs1Uuid() {
    return "17a9f3ce-b426-4357-ba70-b0d882754c24";
  }

  static get KkUuid() {
    return "07259b2c-efb9-479d-a9e7-46f0c6c4dceb";
  }

  static get KksUuid() {
    return "5d425ce2-6c8a-4682-b5b8-b77025239ba6";
  }

  static get AiUuid() {
    return "6665aecd-9eef-4856-b941-4bc397d80eff";
  }

  static get AisUuid() {
    return "35b660b1-5110-4f70-814b-72e9afc9b767";
  }

  static get Hs2Uuid() {
    return "83f46fb9-a52d-45a4-8823-3858d3e4c605";
  }

  static get EcUuid() {
    return "5c283b27-f67d-431f-93bb-66d31d59e6e1";
  }

  get builder() {
    return this.#builder;
  }

  constructor() {
    this.#builder = new PackageBuilder(this.#uuidEntity);
    this.#lang = this.#builder.lang({ uuid: this.#uuidLang, name: "BepInEx", desc: "Bepis Injector Extensible" });
  }

  use() {
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

    this.#builder.use({
      games: [
        { id: Game.PH, uuid: BepInExPlugin.PhUuid, deps: [] },
        { id: Game.EC, uuid: BepInExPlugin.EcUuid, deps: [] },
        { id: Game.HS1, uuid: BepInExPlugin.Hs1Uuid, deps: [] },
        { id: Game.HS2, uuid: BepInExPlugin.Hs2Uuid, deps: [] },
        { id: Game.KK, uuid: BepInExPlugin.KkUuid, deps: [] },
        { id: Game.KKS, uuid: BepInExPlugin.KksUuid, deps: [] },
        { id: Game.AI, uuid: BepInExPlugin.AiUuid, deps: [] },
        { id: Game.AIS, uuid: BepInExPlugin.AisUuid, deps: [] },
      ],
      lang: this.#lang,
      nodes: [placer, resolver, mover],
    });
  }

  #lang: Lang;

  #uuidLang = "e30cfeba-c751-4dbb-a350-1209acd960e1";
  #uuidEntity = "2f94706f-97e3-4274-8ed1-53fbd1c82498";

  #builder: PackageBuilder;
}

export const BepInExPluginAdd = () => {
  const plugin = new BepInExPlugin();
  plugin.use();
  return plugin.builder;
};
