import { PackageBuilder } from "../core/package-builder";
import { IContainer } from "../core/package-builder/container";
import { Lang } from "../core/package-builder/lang";
import { FileMover } from "../core/package-builder/movers/file-mover";
import { GitPlacer } from "../core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "../core/package-builder/resolvers/vs-resolver";
import { Game } from "../core/package-builder/types/game";
import { IPackage, IPackages } from "../core/package-builder/types/package";
import { BepInExPlugin } from "./bep-in-ex-plugin";

interface IParams {
  builder: PackageBuilder;
  uuidEntity: string;
  placer: GitPlacer;
}

export class CameraTargetPlugin implements IPackage {
  static get PhUuid() {
    return "08152a41-448f-4830-a071-d87c979e844e";
  }

  static get KkUuid() {
    return "98c700f7-1366-4e3d-b0d5-3554f7dc0163";
  }

  static get AiUuid() {
    return "47207778-37bd-4f30-9dc5-b7ebe0405a70";
  }

  static get Hs2Uuid() {
    return "b7da5ec1-cbb1-445e-97bd-54b17090fd27";
  }

  Use() {
    this.addForKk();
    this.addForAi();
    this.addForHs2();
    this.addForPh();
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "ebda00ee-be52-4115-81db-810cfd329044",
      name: "CameraTargetFix",
      desc:
        "Hides the cursor when the camera target is disabled in Studio. In AI Girl, also makes the camera target option in the game settings work properly for the character maker",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "../KK_Fix_CameraTarget/HS2_Fix_CameraTarget.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_CameraTarget.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_CameraTarget.dll",
        },
      ],
    });

    const info: IContainer = {
      games: [{ id: Game.HS2, uuid: "094b944c-959e-4055-b8de-6cb5e963e4be", deps: [BepInExPlugin.Hs2Uuid] }],
      lang: this.#lang,
      uuidEntity: this.#uuidEntity,
      nodes: [this.#placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "../KK_Fix_CameraTarget/AI_Fix_CameraTarget.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_CameraTarget.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_CameraTarget.dll",
        },
      ],
    });

    const info: IContainer = {
      games: [{ id: Game.AI, uuid: "a21eb1a5-7721-4687-8c16-8478229e5fd2", deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      uuidEntity: this.#uuidEntity,
      nodes: [this.#placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  private addForPh() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "../KK_Fix_CameraTarget/PH_Fix_CameraTarget.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/PH_Fix_CameraTarget.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/PH_Fix_CameraTarget.dll",
        },
      ],
    });

    const info: IContainer = {
      games: [{ id: Game.PH, uuid: "488673d3-e47d-437e-9338-721204413631", deps: [BepInExPlugin.PhUuid] }],
      lang: this.#lang,
      uuidEntity: this.#uuidEntity,
      nodes: [this.#placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "../KK_Fix_CameraTarget/KK_Fix_CameraTarget.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_CameraTarget.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_CameraTarget.dll",
        },
      ],
    });

    const info: IContainer = {
      games: [{ id: Game.KK, uuid: "18c7e8ab-3cf9-4bfc-b49d-8b85c4bb6ca0", deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      uuidEntity: this.#uuidEntity,
      nodes: [this.#placer, resolver, mover],
    };

    this.#builder.addPlugin(info);
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class CardImportPlugin implements IPackage {
  static get EcUuid() {
    return "e3b8d8ad-859a-4f18-a5aa-79b9c84967ad";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "2e1d8799-f202-41c5-a600-d743e7db0d4a",
      name: "CardImport",
      desc: "Prevents the game from crashing or stripping some modded data when importing KK cards",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class CharacterListOptimizationsPlugin implements IPackage {
  static get KkUuid() {
    return "bc673230-b4dc-432a-a677-1519826eee7c";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "8cd3047a-36ad-47d7-89ce-a6df64ec7763",
      name: "CharacterListOptimizations",
      desc: "Makes character lists load faster",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class CenteredHSceneCursorPlugin implements IPackage {
  static get KkUuid() {
    return "968da95f-973a-4da5-a3bf-5fda73bea847";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "76c3d68a-e284-43db-acdc-23178bac7302",
      name: "CenteredHSceneCursor",
      desc: "Fixes the cursor texture not being properly centeres in H scenes, so it's easier to click on things",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class DownloadRenamerPlugin implements IPackage {
  static get EcUuid() {
    return "4ed48b00-cd3d-4f9d-9bb2-b6c66201b275";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "2c6bcee3-5a8e-4720-a2ca-3363f96c3401",
      name: "DownloadRenamer",
      desc:
        "Maps, scenes, poses, and characters downloaded in game will have their file names changed to match the ones on the Illusion website",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class ExpandShaderDropdownPlugin implements IPackage {
  static get KkUuid() {
    return "4f7d159d-02e4-41c0-bd4f-49942cf73a79";
  }

  static get EcUuid() {
    return "2b2ebadc-1334-4fab-a9ae-864de161b450";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "c5b1197c-efe3-43f5-b06d-d7b81a1a1647",
      name: "ExpandShaderDropdown",
      desc:
        "Makes the shader drop down menu extend down instaed of up and expands it. Necessary to select modded shaders since they run off the screen by default",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class HeterochromiaFixPlugin implements IPackage {
  static get KkUuid() {
    return "f8042bc5-4cfa-43ed-9b42-54462381dd64";
  }

  static get EcUuid() {
    return "7d2232e9-1a5e-4cad-8e96-409d2a076ec4";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "07617ca7-cf7d-4338-b96f-c18ca4c9bd36",
      name: "HeterochromiaFix",
      desc: "Allows you to load characters with different iris types without them being reset",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class InvalidSceneFileProtectionPlugin implements IPackage {
  static get KkUuid() {
    return "234cd3cf-a68b-483f-9b7f-83e33fcf713c";
  }

  static get AiUuid() {
    return "bd620c3d-2d68-4ad6-96bd-7334c8c28225";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "44c1f320-804f-4d0f-9558-ca4ce164b377",
      name: "InvalidSceneFileProtection",
      desc:
        "Adds error handling to scene loading and importing. If a scene is invalid or from the wrong game version then a message is shown and the studio doesn't crash",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class LoadingFixesPlugin implements IPackage {
  static get AiUuid() {
    return "4e530ca2-3b9f-48ae-aac5-9f7977dd378f";
  }

  static get Hs2Uuid() {
    return "cd7e8a35-6972-44f3-84d6-c6e80df21ae4";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "03019556-69a6-4cde-87d8-251cf8d565f3",
      name: "LoadingFixes",
      desc:
        "Fixes some studio scenes failing to load (sometimes you can't load the scene you've just saved with the stock game, many scenes on uploader are like this). Also fixes color picker breaking in maker because of a similar issue",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class MainGameOptimizationsPlugin implements IPackage {
  static get KkUuid() {
    return "07487c55-0f8e-403f-af0c-8b4b2866ce99";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "dee878c1-9b79-4375-9731-b8b6ae3bb1ff",
      name: "MainGameOptimizations",
      desc: "Multiple performance optimizations for the story mode. Aimed to reduce stutter and random FPS drops",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class MakerOptimizationsPlugin implements IPackage {
  static get KkUuid() {
    return "1e3407d3-0a21-41e6-a0d6-3f43ef073c3d";
  }

  static get EcUuid() {
    return "b86cb746-1e37-4fbd-aade-9c9605f2fd06";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "a5f42f00-db29-4ff7-a75a-00f9f1eda344",
      name: "MakerOptimizations",
      desc:
        "Multiple performance optimizations for the character maker. Can greatly increase FPSMultiple performance optimizations for the character maker. Can greatly increase FPS, makes turning on/off the interface in maker by pressing space much faster (after the 1st press), and more",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class ManifestCorrectorPlugin implements IPackage {
  static get KkUuid() {
    return "4a0df063-8001-473d-a194-77eb0bb8a3d1";
  }

  static get EcUuid() {
    return "61868041-c2bf-418b-94f1-3ffe238241d3";
  }

  static get AiUuid() {
    return "41a4ae9d-b587-4d23-a420-80d71c96245c";
  }

  static get Hs2Uuid() {
    return "0535f94b-6f47-4b61-8c09-942c33eb4c60";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "4c021cfb-f769-42ea-af4a-33a0a0e6d00d",
      name: "ManifestCorrector",
      desc:
        "Prevents mods that use incorrect data in the MainManifest column of item lists from locking up the game in story mode",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class ModdedHeadEyelinerPlugin implements IPackage {
  static get KkUuid() {
    return "d6299980-c577-4df2-b810-5371cbfcdab2";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "30d58598-35bb-434c-91bc-798633c50f90",
      name: "ModdedHeadEyeliner",
      desc: "Fixes modded head eyeliners not working on other head types than default",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class NewGameShowAllCardsPlugin implements IPackage {
  static get AiUuid() {
    return "c3f88bc2-1e74-4ca1-811f-4d55fb0ed2e6";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "14ac8f39-f630-4daf-9e88-9770d1cac8f2",
      name: "NewGameShowAllCards",
      desc:
        "Fixes downloaded character cards not appearing in the New Game character selection (so you don't have to go to maker and re-save them)",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class NodeEditorUnlockPlugin implements IPackage {
  static get EcUuid() {
    return "2809ac1b-4ff5-432c-b8b0-ac9932be1810";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "40ca1340-02c8-42b3-8b1c-e916d453c5e9",
      name: "NodeEditorUnlock",
      desc: "",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class NullChecksPlugin implements IPackage {
  static get EcUuid() {
    return "276665f5-e72d-44d2-b09d-ed060479efca";
  }

  static get KkUuid() {
    return "1ddb9bd9-b84e-44b4-8aa5-6a79ec7869e0";
  }

  static get AiUuid() {
    return "c51f60f3-a520-4781-af3b-0e95e44aa8b7";
  }

  static get Hs2Uuid() {
    return "50f9edd7-efef-4ffc-925b-8a0ac893e924";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "8b50ef00-ff1e-4df9-8ab1-6743e6202e08",
      name: "NullChecks",
      desc: "Fixes for some questionably made mods causing issues",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class PartyCardCompatibilityPlugin implements IPackage {
  static get KkUuid() {
    return "5c6f748d-ff7b-4596-8d43-89816690f1ba";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "c5f3f32f-6634-4a5d-b9a0-2c1fdf735353",
      name: "PartyCardCompatibility",
      desc: "Allows loading of cards saved in Koikatsu Party (Steam release) in Koikatu and Studio",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class PersonalityCorrectorPlugin implements IPackage {
  static get KkUuid() {
    return "a56cbe02-6ecb-428d-acf5-ab35e1bc200e";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "ae846d66-4039-4c55-aeec-5090e0c8cc17",
      name: "PersonalityCorrector",
      desc:
        "Prevents cards with invalid or missing personalities from crashing the game. A default personality is set instead",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class PoseLoadPlugin implements IPackage {
  static get KkUuid() {
    return "33ac63e9-9bcf-46d0-b5e5-1239db885152";
  }

  static get AiUuid() {
    return "854f8873-c0b3-4eb0-be7c-9a9999a4c022";
  }

  static get Hs2Uuid() {
    return "0fddb29c-d877-4f99-a9ca-38975494483a";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "0416e7f0-61b7-4ce4-8dee-b98ce79d0df1",
      name: "PoseLoad",
      desc: "Corrects Honey Select poses loaded in Koikatsu and prevents errors",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class ResourceUnloadOptimizationsPlugin implements IPackage {
  static get PhUuid() {
    return "32d5a649-eabb-4a93-af90-9b7d4f5273b3";
  }

  static get Hs1Uuid() {
    return "f6b6c98d-1832-43d4-a7c2-77ff339499dc";
  }

  static get KkUuid() {
    return "afd0451d-7752-4969-ab60-19db01f415ea";
  }

  static get AiUuid() {
    return "f5aec295-1c0d-4122-b390-0341568386c2";
  }

  static get Hs2Uuid() {
    return "d1059a99-0b20-4131-a932-d10d3da173c5";
  }

  static get EcUuid() {
    return "02e2e5bc-0a83-4127-901f-c304825bae95";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "f7c9fd40-c737-4979-88db-9ded570a2a00",
      name: "ResourceUnloadOptimizations",
      desc: 'Improves loading times and eliminates stutter after loading was "finished"',
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class SettingsVerifierPlugin implements IPackage {
  static get KkUuid() {
    return "13a612a2-a9d5-452b-ba8a-d22e0a07c5ac";
  }

  static get AiUuid() {
    return "0d2af4b3-60c5-43ea-899e-af19b7bf58d4";
  }

  static get Hs2Uuid() {
    return "692e4415-0ac2-47e0-91de-092a1ea822c9";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "f6205520-177d-4db5-8680-6fa028934057",
      name: "SettingsVerifier",
      desc:
        "Prevents corrupted setting from causing issues and forces studio to use the settings.xml file instead of registry",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class ShowerAccessoriesPlugin implements IPackage {
  static get KkUuid() {
    return "55a723d7-b3e4-4a00-bece-01dd9a8785aa";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "ae1403dc-a9cd-4832-aff1-7fc08c3ede98",
      name: "ShowerAccessories",
      desc:
        "Prevents accessories from being removed in shower peeping mode. No more gaping holes in the head when using hair accessories",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class UnlimitedMapLightsPlugin implements IPackage {
  static get KkUuid() {
    return "01ade1a0-4d9c-428e-89d6-2ffbfe9a389f";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "a46a1305-55e3-4d8b-8090-558d654d80da",
      name: "UnlimitedMapLights",
      desc: "Allows using an unlimited amount of map lights in studio. Not all items support more than 3 lights",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class PatchSteamReleaseCompatibilityPlugin implements IPackage {
  static get AisUuid() {
    return "";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "f4bddb9d-308f-4c06-b59a-20d80277ed6c",
      name: "AI_Patch_SteamReleaseCompatibility",
      desc: "Allows using plugins made for the Japanese release of the game, and makes it possible to use Studio",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class PatchLogDespammerPlugin implements IPackage {
  static get AiUuid() {
    return "759f53ba-7fab-4a14-8553-c8c902616b2b";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "cde02419-a4ea-428c-b98d-d7efc5bbd272",
      name: "AI_Patch_LogDespammer",
      desc: "",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class CultureFixPlugin implements IPackage {
  static get EcUuid() {
    return "";
  }

  static get AiUuid() {
    return "";
  }

  static get Hs2Uuid() {
    return "";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "66365308-bb1e-4a54-aea8-056b7a753e43",
      name: "CultureFix",
      desc:
        "Set process culture to ja-JP, similarly to a locale emulator. Fixes game crashes and lockups on some system locales",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class MagicCarrotPlugin implements IPackage {
  static get AiUuid() {
    return "486dee0e-e431-4587-bb31-88defa2bd372";
  }

  Use() {}

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "41567941-3f02-4802-a5b9-f214bcf35fa6",
      name: "MagicCarrot",
      desc: "Prevents the game from locking up when starting",
    });
    this.#uuidEntity = info.uuidEntity;
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
  #uuidEntity: string;
}

export class IllusionFixesPlugin implements IPackage {
  Use() {
    for (const pack of this.#packages) {
      pack.Use();
    }
  }

  constructor(builder: PackageBuilder) {
    const uuidEntity = "62c81393-0655-4034-a999-c049850d8485";
    const placer = new GitPlacer({ url: "https://github.com/IllusionMods/IllusionFixes" });

    this.#packages.push(
      new CameraTargetPlugin({ builder, uuidEntity, placer }),
      new CardImportPlugin({ builder, uuidEntity, placer }),
      new CharacterListOptimizationsPlugin({ builder, uuidEntity, placer }),
      new CenteredHSceneCursorPlugin({ builder, uuidEntity, placer }),
      new DownloadRenamerPlugin({ builder, uuidEntity, placer }),
      new ExpandShaderDropdownPlugin({ builder, uuidEntity, placer }),
      new HeterochromiaFixPlugin({ builder, uuidEntity, placer }),
      new InvalidSceneFileProtectionPlugin({ builder, uuidEntity, placer }),
      new LoadingFixesPlugin({ builder, uuidEntity, placer }),
      new MainGameOptimizationsPlugin({ builder, uuidEntity, placer }),
      new MakerOptimizationsPlugin({ builder, uuidEntity, placer }),
      new ManifestCorrectorPlugin({ builder, uuidEntity, placer }),
      new ModdedHeadEyelinerPlugin({ builder, uuidEntity, placer }),
      new NewGameShowAllCardsPlugin({ builder, uuidEntity, placer }),
      new NodeEditorUnlockPlugin({ builder, uuidEntity, placer }),
      new NullChecksPlugin({ builder, uuidEntity, placer }),
      new PartyCardCompatibilityPlugin({ builder, uuidEntity, placer }),
      new PersonalityCorrectorPlugin({ builder, uuidEntity, placer }),
      new PoseLoadPlugin({ builder, uuidEntity, placer }),
      new ResourceUnloadOptimizationsPlugin({ builder, uuidEntity, placer }),
      new SettingsVerifierPlugin({ builder, uuidEntity, placer }),
      new ShowerAccessoriesPlugin({ builder, uuidEntity, placer }),
      new UnlimitedMapLightsPlugin({ builder, uuidEntity, placer }),
      new PatchSteamReleaseCompatibilityPlugin({ builder, uuidEntity, placer }),
      new PatchLogDespammerPlugin({ builder, uuidEntity, placer }),
      new CultureFixPlugin({ builder, uuidEntity, placer }),
      new MagicCarrotPlugin({ builder, uuidEntity, placer })
    );
  }

  #packages: IPackages = [];

  // private addCardImport() {
  //   // const lang = this.#builder.lang("CardImport", "Prevents the game from crashing or stripping some modded data when importing KK cards");
  // }

  // private addCharacterListOptimizations() {
  //   const lang = this.#builder.lang("CharacterListOptimizations", "Makes character lists load faster");
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_CharacterListOptimizations");
  // }

  // private addCenteredHSceneCursor() {
  //   const lang = this.#builder.lang(
  //     "CenteredHSceneCursor",
  //     "Fixes the cursor texture not being properly centeres in H scenes, so it's easier to click on things"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_CenteredHSceneCursor");
  // }

  // private addDownloadRenamer() {
  //   // const lang = this.#builder.lang("DownloadRenamer", "Maps, scenes, poses, and characters downloaded in game will have their file names changed to match the ones on the Illusion website");
  // }

  // private addExpandShaderDropdown() {
  //   const lang = this.#builder.lang(
  //     "ExpandShaderDropdown",
  //     "Makes the shader drop down menu extend down instaed of up and expands it. Necessary to select modded shaders since they run off the screen by default"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_ExpandShaderDropdown");
  // }

  // private addHeterochromiaFix() {
  //   const lang = this.#builder.lang(
  //     "HeterochromiaFix",
  //     "Allows you to load characters with different iris types without them being reset"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_HeterochromiaFix");
  // }

  // private addInvalidSceneFileProtection() {
  //   const lang = this.#builder.lang(
  //     "InvalidSceneFileProtection",
  //     "Adds error handling to scene loading and importing. If a scene is invalid or from the wrong game version then a message is shown and the studio doesn't crash"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_InvalidSceneFileProtection");
  //   this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VisualStudio, "AI_Fix_InvalidSceneFileProtection");
  // }

  // private addLoadingFixes() {
  //   const lang = this.#builder.lang(
  //     "LoadingFixes",
  //     "Fixes some studio scenes failing to load (sometimes you can't load the scene you've just saved with the stock game, many scenes on uploader are like this). Also fixes color picker breaking in maker because of a similar issue"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VisualStudio, "AI_Fix_LoadingFixes");
  //   this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VisualStudio, "HS2_Fix_LoadingFixes");
  // }

  // private addMainGameOptimizations() {
  //   const lang = this.#builder.lang(
  //     "MainGameOptimizations",
  //     "Multiple performance optimizations for the story mode. Aimed to reduce stutter and random FPS drops"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_MainGameOptimizations");
  // }

  // private addMakerOptimizations() {
  //   const lang = this.#builder.lang(
  //     "MakerOptimizations",
  //     "Multiple performance optimizations for the character maker. Can greatly increase FPSMultiple performance optimizations for the character maker. Can greatly increase FPS, makes turning on/off the interface in maker by pressing space much faster (after the 1st press), and more"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_MakerOptimizations");
  // }

  // private addManifestCorrector() {
  //   const lang = this.#builder.lang(
  //     "ManifestCorrector",
  //     "Prevents mods that use incorrect data in the MainManifest column of item lists from locking up the game in story mode"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_ManifestCorrector");
  //   this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VisualStudio, "AI_Fix_ManifestCorrector");
  //   this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VisualStudio, "HS2_Fix_ManifestCorrector");
  // }

  // private addModdedHeadEyeliner() {
  //   const lang = this.#builder.lang(
  //     "ModdedHeadEyeliner",
  //     "Fixes modded head eyeliners not working on other head types than default"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_ModdedHeadEyeliner");
  // }

  // private addNewGameShowAllCards() {
  //   const lang = this.#builder.lang(
  //     "NewGameShowAllCards",
  //     "Fixes downloaded character cards not appearing in the New Game character selection (so you don't have to go to maker and re-save them)"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VisualStudio, "AI_Fix_NewGameShowAllCards");
  // }

  // private addNodeEditorUnlock() {
  //   // const lang = this.#builder.lang("NodeEditorUnlock", "");
  // }

  // private addNullChecks() {
  //   const lang = this.#builder.lang("NullChecks", "Fixes for some questionably made mods causing issues");
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_NullChecks");
  //   this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VisualStudio, "AI_Fix_NullChecks");
  //   this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VisualStudio, "HS2_Fix_NullChecks");
  // }

  // private addPartyCardCompatibility() {
  //   const lang = this.#builder.lang(
  //     "PartyCardCompatibility",
  //     "Allows loading of cards saved in Koikatsu Party (Steam release) in Koikatu and Studio"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_PartyCardCompatibility");
  // }

  // private addPersonalityCorrector() {
  //   const lang = this.#builder.lang(
  //     "PersonalityCorrector",
  //     "Prevents cards with invalid or missing personalities from crashing the game. A default personality is set instead"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_PersonalityCorrector");
  // }

  // private addPoseLoad() {
  //   const lang = this.#builder.lang("PoseLoad", "Corrects Honey Select poses loaded in Koikatsu and prevents errors");
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_PoseLoad");
  //   this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VisualStudio, "AI_Fix_PoseLoad");
  //   this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VisualStudio, "HS2_Fix_PoseLoad");
  // }

  // private addResourceUnloadOptimizations() {
  //   const lang = this.#builder.lang(
  //     "ResourceUnloadOptimizations",
  //     'Improves loading times and eliminates stutter after loading was "finished"'
  //   );
  //   this.plugin.addProject(
  //     lang,
  //     [PluginGameType.PH],
  //     PluginResolver.VisualStudio,
  //     "PH_Fix_ResourceUnloadOptimizations"
  //   );
  //   this.plugin.addProject(
  //     lang,
  //     [PluginGameType.KK],
  //     PluginResolver.VisualStudio,
  //     "KK_Fix_ResourceUnloadOptimizations"
  //   );
  //   this.plugin.addProject(
  //     lang,
  //     [PluginGameType.HS1],
  //     PluginResolver.VisualStudio,
  //     "HS_Fix_ResourceUnloadOptimizations"
  //   );
  //   this.plugin.addProject(
  //     lang,
  //     [PluginGameType.AI],
  //     PluginResolver.VisualStudio,
  //     "AI_Fix_ResourceUnloadOptimizations"
  //   );
  //   this.plugin.addProject(
  //     lang,
  //     [PluginGameType.HS2],
  //     PluginResolver.VisualStudio,
  //     "HS2_Fix_ResourceUnloadOptimizations"
  //   );
  // }

  // private addSettingsVerifier() {
  //   const lang = this.#builder.lang(
  //     "SettingsVerifier",
  //     "Prevents corrupted setting from causing issues and forces studio to use the settings.xml file instead of registry"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_SettingsVerifier");
  //   this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VisualStudio, "AI_Fix_SettingsVerifier");
  //   this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VisualStudio, "HS2_Fix_SettingsVerifier");
  // }

  // private addShowerAccessories() {
  //   const lang = this.#builder.lang(
  //     "ShowerAccessories",
  //     "Prevents accessories from being removed in shower peeping mode. No more gaping holes in the head when using hair accessories"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_ShowerAccessories");
  // }

  // private addUnlimitedMapLights() {
  //   const lang = this.#builder.lang(
  //     "UnlimitedMapLights",
  //     "Allows using an unlimited amount of map lights in studio. Not all items support more than 3 lights"
  //   );
  //   this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VisualStudio, "KK_Fix_UnlimitedMapLights");
  // }
}

export const IllusionFixesPluginAdd = (builder: PackageBuilder) => {
  const plugin = new IllusionFixesPlugin(builder);
  plugin.Use();
};

// https://youtu.be/oZ_hW1E3q74?list=RDMMZJ__TExqiQk
