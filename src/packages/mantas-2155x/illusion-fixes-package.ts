import { PackageBuilder } from "@/core/package-builder";
import { Lang } from "@/core/package-builder/lang";
import { FileMover } from "@/core/package-builder/movers/file-mover";
import { GitPlacer } from "@/core/package-builder/places/git-placer";
import { VSProjectResolver, VSResolver } from "@/core/package-builder/resolvers/vs-resolver";
import { Game } from "@/core/package-builder/types/game";
import { IPackage, IPackageBuilder } from "@/core/package-builder/types/package";

import { BepInExPlugin } from "../bep-in-ex/bep-in-ex-package";

interface IParams {
  builder: PackageBuilder;
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

  use() {
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
    this.#placer = info.placer;
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/HS2_Fix_CameraTarget/HS2_Fix_CameraTarget.csproj",
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

    this.#builder.use({
      games: [{ id: Game.HS2, uuid: CameraTargetPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/AI_Fix_CameraTarget/AI_Fix_CameraTarget.csproj",
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

    this.#builder.use({
      games: [{ id: Game.AI, uuid: CameraTargetPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForPh() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/PH_Fix_CameraTarget/PH_Fix_CameraTarget.csproj",
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

    this.#builder.use({
      games: [{ id: Game.PH, uuid: CameraTargetPlugin.PhUuid, deps: [BepInExPlugin.PhUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_CameraTarget/KK_Fix_CameraTarget.csproj",
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

    this.#builder.use({
      games: [{ id: Game.KK, uuid: CameraTargetPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class CardImportPlugin implements IPackage {
  static get EcUuid() {
    return "e3b8d8ad-859a-4f18-a5aa-79b9c84967ad";
  }

  use() {
    this.addForEc();
  }

  private addForEc() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/CardImport/CardImport.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/CardImport.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/CardImport.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: CardImportPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "2e1d8799-f202-41c5-a600-d743e7db0d4a",
      name: "CardImport",
      desc: "Prevents the game from crashing or stripping some modded data when importing KK cards",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class CharacterListOptimizationsPlugin implements IPackage {
  static get KkUuid() {
    return "bc673230-b4dc-432a-a677-1519826eee7c";
  }

  use() {
    this.addForKk();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_CharacterListOptimizations/KK_Fix_CharacterListOptimizations.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_CharacterListOptimizations.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_CharacterListOptimizations.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: CharacterListOptimizationsPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "8cd3047a-36ad-47d7-89ce-a6df64ec7763",
      name: "CharacterListOptimizations",
      desc: "Makes character lists load faster",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class CenteredHSceneCursorPlugin implements IPackage {
  static get KkUuid() {
    return "968da95f-973a-4da5-a3bf-5fda73bea847";
  }

  use() {
    this.addForKk();
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "76c3d68a-e284-43db-acdc-23178bac7302",
      name: "CenteredHSceneCursor",
      desc: "Fixes the cursor texture not being properly centeres in H scenes, so it's easier to click on things",
    });
    this.#placer = info.placer;
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_CenteredHSceneCursor/KK_Fix_CenteredHSceneCursor.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_CenteredHSceneCursor.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_CenteredHSceneCursor.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: CenteredHSceneCursorPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class DownloadRenamerPlugin implements IPackage {
  static get EcUuid() {
    return "4ed48b00-cd3d-4f9d-9bb2-b6c66201b275";
  }

  use() {
    this.addForEc();
  }

  private addForEc() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/EC_Fix_DownloadRenamer/EC_Fix_DownloadRenamer.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_DownloadRenamer.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_DownloadRenamer.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: DownloadRenamerPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "2c6bcee3-5a8e-4720-a2ca-3363f96c3401",
      name: "DownloadRenamer",
      desc:
        "Maps, scenes, poses, and characters downloaded in game will have their file names changed to match the ones on the Illusion website",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class ExpandShaderDropdownPlugin implements IPackage {
  static get KkUuid() {
    return "4f7d159d-02e4-41c0-bd4f-49942cf73a79";
  }

  static get EcUuid() {
    return "2b2ebadc-1334-4fab-a9ae-864de161b450";
  }

  use() {
    this.addForKk();
    this.addForEc();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_fix_ExpandShaderDropdown/KK_Fix_ExpandShaderDropdown.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_ExpandShaderDropdown.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_ExpandShaderDropdown.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: ExpandShaderDropdownPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForEc() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/EC_Fix_ExpandShaderDropdown/EC_Fix_ExpandShaderDropdown.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_ExpandShaderDropdown.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_ExpandShaderDropdown.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: ExpandShaderDropdownPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "c5b1197c-efe3-43f5-b06d-d7b81a1a1647",
      name: "ExpandShaderDropdown",
      desc:
        "Makes the shader drop down menu extend down instaed of up and expands it. Necessary to select modded shaders since they run off the screen by default",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class HeterochromiaFixPlugin implements IPackage {
  static get KkUuid() {
    return "f8042bc5-4cfa-43ed-9b42-54462381dd64";
  }

  static get EcUuid() {
    return "7d2232e9-1a5e-4cad-8e96-409d2a076ec4";
  }

  use() {
    this.addForKk();
    this.addForEc();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_Heterochromia/KK_Fix_Heterochromia.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_Heterochromia.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_Heterochromia.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: HeterochromiaFixPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForEc() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/EC_Fix_Heterochromia/EC_Fix_Heterochromia.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_Heterochromia.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_Heterochromia.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: HeterochromiaFixPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "07617ca7-cf7d-4338-b96f-c18ca4c9bd36",
      name: "HeterochromiaFix",
      desc: "Allows you to load characters with different iris types without them being reset",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class InvalidSceneFileProtectionPlugin implements IPackage {
  static get KkUuid() {
    return "234cd3cf-a68b-483f-9b7f-83e33fcf713c";
  }

  static get AiUuid() {
    return "bd620c3d-2d68-4ad6-96bd-7334c8c28225";
  }

  static get Hs2Uuid() {
    return "ee7da67d-c3dc-405e-8397-25e74a27c4c4";
  }

  use() {
    this.addForKk();
    this.addForAi();
    this.addForHs2();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_InvalidSceneFileProtection/KK_Fix_InvalidSceneFileProtection.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_InvalidSceneFileProtection.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_InvalidSceneFileProtection.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: InvalidSceneFileProtectionPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/HS2_Fix_InvalidSceneFileProtection/HS2_Fix_InvalidSceneFileProtection.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_InvalidSceneFileProtection.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_InvalidSceneFileProtection.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.HS2, uuid: InvalidSceneFileProtectionPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/AI_Fix_InvalidSceneFileProtection/AI_Fix_InvalidSceneFileProtection.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_InvalidSceneFileProtection.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_InvalidSceneFileProtection.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.AI, uuid: InvalidSceneFileProtectionPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "44c1f320-804f-4d0f-9558-ca4ce164b377",
      name: "InvalidSceneFileProtection",
      desc:
        "Adds error handling to scene loading and importing. If a scene is invalid or from the wrong game version then a message is shown and the studio doesn't crash",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

// export class LoadingFixesPlugin implements IPackage {
//   static get AiUuid() {
//     return "4e530ca2-3b9f-48ae-aac5-9f7977dd378f";
//   }

//   static get Hs2Uuid() {
//     return "cd7e8a35-6972-44f3-84d6-c6e80df21ae4";
//   }

//   Use() {
//     this.addForAi();
//     this.addForHs2();
//   }

//   private addForAi() {
//     const resolver = new VSResolver({
//       dir: "/",
//       build: [
//         new VSProjectResolver({
//           file: "src/AI_Fix_LoadingFixes/AI_Fix_LoadingFixes.csproj",
//           ignore: [],
//         }),
//       ],
//     });

//     const mover = new FileMover({
//       files: [
//         {
//           src: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_LoadingFixes.dll",
//           dst: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_LoadingFixes.dll",
//         },
//       ],
//     });

//     this.#builder.use({//       games: [{ id: Game.AI, uuid: LoadingFixesPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] }],
//       lang: this.#lang,
//       uuidEntity: this.#uuidEntity,
// });
//     };

//     this.#builder.addPlugin(info);
//   }

//   private addForHs2() {
//     const resolver = new VSResolver({
//       dir: "/",
//       build: [
//         new VSProjectResolver({
//           file: "src/HS2_Fix_LoadingFixes/HS2_Fix_LoadingFixes.csproj",
//           ignore: [],
//         }),
//       ],
//     });

//     const mover = new FileMover({
//       files: [
//         {
//           src: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_LoadingFixes.dll",
//           dst: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_LoadingFixes.dll",
//         },
//       ],
//     });

//     this.#builder.use({//       games: [{ id: Game.HS2, uuid: LoadingFixesPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] }],
//       lang: this.#lang,
//       uuidEntity: this.#uuidEntity,
// });
//     };

//     this.#builder.addPlugin(info);
//   }

//   constructor(info: IParams) {
//     this.#builder = info.builder;
//     this.#lang = info.builder.lang({
//       uuid: "03019556-69a6-4cde-87d8-251cf8d565f3",
//       name: "LoadingFixes",
//       desc:
//         "Fixes some studio scenes failing to load (sometimes you can't load the scene you've just saved with the stock game, many scenes on uploader are like this). Also fixes color picker breaking in maker because of a similar issue",
//     });
//     this.#uuidEntity = info.uuidEntity;
//     this.#placer = info.placer;
//   }

//   #lang: Lang;
//   #placer: GitPlacer;
//   #builder: PackageBuilder;
//   #uuidEntity: string;
// }

export class MainGameOptimizationsPlugin implements IPackage {
  static get KkUuid() {
    return "07487c55-0f8e-403f-af0c-8b4b2866ce99";
  }

  use() {
    this.addForKk();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_MainGameOptimizations/KK_Fix_MainGameOptimizations.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_MainGameOptimizations.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_MainGameOptimizations.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: MainGameOptimizationsPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "dee878c1-9b79-4375-9731-b8b6ae3bb1ff",
      name: "MainGameOptimizations",
      desc: "Multiple performance optimizations for the story mode. Aimed to reduce stutter and random FPS drops",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class MakerOptimizationsPlugin implements IPackage {
  static get KkUuid() {
    return "1e3407d3-0a21-41e6-a0d6-3f43ef073c3d";
  }

  static get EcUuid() {
    return "b86cb746-1e37-4fbd-aade-9c9605f2fd06";
  }

  use() {
    this.addForKk();
    this.addForEc();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_MakerOptimizations/KK_Fix_MakerOptimizations.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_MakerOptimizations.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_MakerOptimizations.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: MakerOptimizationsPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForEc() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/EC_Fix_MakerOptimizations/EC_Fix_MakerOptimizations.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_MakerOptimizations.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_MakerOptimizations.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: MakerOptimizationsPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "a5f42f00-db29-4ff7-a75a-00f9f1eda344",
      name: "MakerOptimizations",
      desc:
        "Multiple performance optimizations for the character maker. Can greatly increase FPSMultiple performance optimizations for the character maker. Can greatly increase FPS, makes turning on/off the interface in maker by pressing space much faster (after the 1st press), and more",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
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

  use() {
    this.addForKk();
    this.addForAi();
    this.addForHs2();
    this.addForEc();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_ManifestCorrector/KK_Fix_ManifestCorrector.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_ManifestCorrector.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_ManifestCorrector.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: ManifestCorrectorPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/AI_Fix_ManifestCorrector/AI_Fix_ManifestCorrector.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_ManifestCorrector.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_ManifestCorrector.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.AI, uuid: ManifestCorrectorPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/HS2_Fix_ManifestCorrector/HS2_Fix_ManifestCorrector.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_ManifestCorrector.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_ManifestCorrector.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.HS2, uuid: ManifestCorrectorPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForEc() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/EC_Fix_ManifestCorrector/EC_Fix_ManifestCorrector.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_ManifestCorrector.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_ManifestCorrector.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: ManifestCorrectorPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "4c021cfb-f769-42ea-af4a-33a0a0e6d00d",
      name: "ManifestCorrector",
      desc:
        "Prevents mods that use incorrect data in the MainManifest column of item lists from locking up the game in story mode",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class ModdedHeadEyelinerPlugin implements IPackage {
  static get KkUuid() {
    return "d6299980-c577-4df2-b810-5371cbfcdab2";
  }

  static get EcUuid() {
    return "75384213-5262-4cda-9ea3-78db83161f2c";
  }

  use() {
    this.addForKk();
    this.addForEc();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_ModdedHeadEyeliner/KK_Fix_ModdedHeadEyeliner.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_ModdedHeadEyeliner.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_ModdedHeadEyeliner.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: ModdedHeadEyelinerPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForEc() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/EC_Fix_ModdedHeadEyeliner/EC_Fix_ModdedHeadEyeliner.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_ModdedHeadEyeliner.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_ModdedHeadEyeliner.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: ModdedHeadEyelinerPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "30d58598-35bb-434c-91bc-798633c50f90",
      name: "ModdedHeadEyeliner",
      desc: "Fixes modded head eyeliners not working on other head types than default",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class NewGameShowAllCardsPlugin implements IPackage {
  static get AiUuid() {
    return "c3f88bc2-1e74-4ca1-811f-4d55fb0ed2e6";
  }

  use() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/AI_Fix_NewGameShowAllCards/AI_Fix_NewGameShowAllCards.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_NewGameShowAllCards.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_NewGameShowAllCards.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.AI, uuid: NewGameShowAllCardsPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "14ac8f39-f630-4daf-9e88-9770d1cac8f2",
      name: "NewGameShowAllCards",
      desc:
        "Fixes downloaded character cards not appearing in the New Game character selection (so you don't have to go to maker and re-save them)",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class NodeEditorUnlockPlugin implements IPackage {
  static get EcUuid() {
    return "2809ac1b-4ff5-432c-b8b0-ac9932be1810";
  }

  use() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/EC_Fix_NodeUnlock/EC_Fix_NodeUnlock.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_NodeUnlock.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_NodeUnlock.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: NodeEditorUnlockPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "40ca1340-02c8-42b3-8b1c-e916d453c5e9",
      name: "NodeEditorUnlock",
      desc: "",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
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

  use() {
    this.addForKk();
    this.addForAi();
    this.addForHs2();
    this.addForEc();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_NullChecks/KK_Fix_NullChecks.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_NullChecks.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_NullChecks.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: NullChecksPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/AI_Fix_NullChecks/AI_Fix_NullChecks.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_NullChecks.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_NullChecks.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.AI, uuid: NullChecksPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/HS2_Fix_NullChecks/HS2_Fix_NullChecks.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_NullChecks.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_NullChecks.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.HS2, uuid: NullChecksPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForEc() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/EC_Fix_NullChecks/EC_Fix_NullChecks.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_NullChecks.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_NullChecks.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: NullChecksPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "8b50ef00-ff1e-4df9-8ab1-6743e6202e08",
      name: "NullChecks",
      desc: "Fixes for some questionably made mods causing issues",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class PartyCardCompatibilityPlugin implements IPackage {
  static get KkUuid() {
    return "5c6f748d-ff7b-4596-8d43-89816690f1ba";
  }

  static get EcUuid() {
    return "dd589831-bfc8-426f-ac61-fb3ba6856d9a";
  }

  use() {
    this.addForKk();
    this.addForEc();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_PartyCardCompatibility/KK_Fix_PartyCardCompatibility.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_PartyCardCompatibility.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_PartyCardCompatibility.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: PartyCardCompatibilityPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForEc() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/EC_Fix_PartyCardCompatibility/EC_Fix_PartyCardCompatibility.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_PartyCardCompatibility.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_PartyCardCompatibility.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: PartyCardCompatibilityPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "c5f3f32f-6634-4a5d-b9a0-2c1fdf735353",
      name: "PartyCardCompatibility",
      desc: "Allows loading of cards saved in Koikatsu Party (Steam release) in Koikatu and Studio",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class PersonalityCorrectorPlugin implements IPackage {
  static get KkUuid() {
    return "a56cbe02-6ecb-428d-acf5-ab35e1bc200e";
  }

  use() {
    this.addForKk();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_PersonalityCorrector/KK_Fix_PersonalityCorrector.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_PersonalityCorrector.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_PersonalityCorrector.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: PersonalityCorrectorPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "ae846d66-4039-4c55-aeec-5090e0c8cc17",
      name: "PersonalityCorrector",
      desc:
        "Prevents cards with invalid or missing personalities from crashing the game. A default personality is set instead",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
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

  use() {
    this.addForKk();
    this.addForAi();
    this.addForHs2();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_PoseLoad/KK_Fix_PoseLoad.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_PoseLoad.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_PoseLoad.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: PoseLoadPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/AI_Fix_PoseLoad/AI_Fix_PoseLoad.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_PoseLoad.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_PoseLoad.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.AI, uuid: PoseLoadPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/HS2_Fix_PoseLoad/HS2_Fix_PoseLoad.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_PoseLoad.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_PoseLoad.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.HS2, uuid: PoseLoadPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "0416e7f0-61b7-4ce4-8dee-b98ce79d0df1",
      name: "PoseLoad",
      desc: "Corrects Honey Select poses loaded in Koikatsu and prevents errors",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
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

  use() {
    this.addForKk();
    this.addForAi();
    this.addForHs1();
    this.addForHs2();
    this.addForPh();
    this.addForEc();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_ResourceUnloadOptimizations/KK_Fix_ResourceUnloadOptimizations.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_ResourceUnloadOptimizations.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_ResourceUnloadOptimizations.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: ResourceUnloadOptimizationsPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/AI_Fix_ResourceUnloadOptimizations/AI_Fix_ResourceUnloadOptimizations.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_ResourceUnloadOptimizations.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_ResourceUnloadOptimizations.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.AI, uuid: ResourceUnloadOptimizationsPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForHs1() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/HS_Fix_ResourceUnloadOptimizations/HS_Fix_ResourceUnloadOptimizations.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/HS_Fix_ResourceUnloadOptimizations.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/HS_Fix_ResourceUnloadOptimizations.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.HS1, uuid: ResourceUnloadOptimizationsPlugin.Hs1Uuid, deps: [BepInExPlugin.Hs1Uuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/HS2_Fix_ResourceUnloadOptimizations/HS2_Fix_ResourceUnloadOptimizations.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_ResourceUnloadOptimizations.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_ResourceUnloadOptimizations.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.HS2, uuid: ResourceUnloadOptimizationsPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForPh() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/PH_Fix_ResourceUnloadOptimizations/PH_Fix_ResourceUnloadOptimizations.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/PH_Fix_ResourceUnloadOptimizations.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/PH_Fix_ResourceUnloadOptimizations.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.PH, uuid: ResourceUnloadOptimizationsPlugin.PhUuid, deps: [BepInExPlugin.PhUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForEc() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/EC_Fix_ResourceUnloadOptimizations/EC_Fix_ResourceUnloadOptimizations.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_ResourceUnloadOptimizations.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_ResourceUnloadOptimizations.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: ResourceUnloadOptimizationsPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "f7c9fd40-c737-4979-88db-9ded570a2a00",
      name: "ResourceUnloadOptimizations",
      desc: 'Improves loading times and eliminates stutter after loading was "finished"',
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
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

  static get PhUuid() {
    return "49645d62-920d-4a2e-9895-d78a7fcb5ce6";
  }

  static get EcUuid() {
    return "e08af5e6-3eaf-4d10-ada3-f291dbb198a6";
  }

  use() {
    this.addForKk();
    this.addForAi();
    this.addForHs2();
    this.addForPh();
    this.addForEc();
  }

  private addForKk() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_SettingsVerifier/KK_Fix_SettingsVerifier.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_SettingsVerifier.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_SettingsVerifier.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: SettingsVerifierPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForAi() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/AI_Fix_SettingsVerifier/AI_Fix_SettingsVerifier.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_SettingsVerifier.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/AI_Fix_SettingsVerifier.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.AI, uuid: SettingsVerifierPlugin.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForHs2() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/HS2_Fix_SettingsVerifier/HS2_Fix_SettingsVerifier.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_SettingsVerifier.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/HS2_Fix_SettingsVerifier.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.HS2, uuid: SettingsVerifierPlugin.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForPh() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/PH_Fix_SettingsVerifier/PH_Fix_SettingsVerifier.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/PH_Fix_SettingsVerifier.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/PH_Fix_SettingsVerifier.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.PH, uuid: SettingsVerifierPlugin.PhUuid, deps: [BepInExPlugin.PhUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  private addForEc() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/EC_Fix_SettingsVerifier/EC_Fix_SettingsVerifier.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_SettingsVerifier.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/EC_Fix_SettingsVerifier.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.EC, uuid: SettingsVerifierPlugin.EcUuid, deps: [BepInExPlugin.EcUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "f6205520-177d-4db5-8680-6fa028934057",
      name: "SettingsVerifier",
      desc:
        "Prevents corrupted setting from causing issues and forces studio to use the settings.xml file instead of registry",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class ShowerAccessoriesPlugin implements IPackage {
  static get KkUuid() {
    return "55a723d7-b3e4-4a00-bece-01dd9a8785aa";
  }

  use() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_ShowerAccessories/KK_Fix_ShowerAccessories.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_ShowerAccessories.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_ShowerAccessories.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: ShowerAccessoriesPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "ae1403dc-a9cd-4832-aff1-7fc08c3ede98",
      name: "ShowerAccessories",
      desc:
        "Prevents accessories from being removed in shower peeping mode. No more gaping holes in the head when using hair accessories",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class UnlimitedMapLightsPlugin implements IPackage {
  static get KkUuid() {
    return "01ade1a0-4d9c-428e-89d6-2ffbfe9a389f";
  }

  use() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/KK_Fix_UnlimitedMapLights/KK_Fix_UnlimitedMapLights.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_UnlimitedMapLights.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/KK_Fix_UnlimitedMapLights.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.KK, uuid: UnlimitedMapLightsPlugin.KkUuid, deps: [BepInExPlugin.KkUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "a46a1305-55e3-4d8b-8090-558d654d80da",
      name: "UnlimitedMapLights",
      desc: "Allows using an unlimited amount of map lights in studio. Not all items support more than 3 lights",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class SteamReleaseCompatibilityPath implements IPackage {
  static get AisUuid() {
    return "18c7e8ab-3cf9-4bfc-b49d-8b85c4bb6ca0";
  }

  use() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/AI_Patch_SteamReleaseCompatibility/AI_Patch_SteamReleaseCompatibility.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/AI_Patch_SteamReleaseCompatibility.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/AI_Patch_SteamReleaseCompatibility.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.AIS, uuid: SteamReleaseCompatibilityPath.AisUuid, deps: [BepInExPlugin.AisUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "f4bddb9d-308f-4c06-b59a-20d80277ed6c",
      name: "SteamReleaseCompatibility",
      desc: "Allows using plugins made for the Japanese release of the game, and makes it possible to use Studio",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class LogDespammerPath implements IPackage {
  static get AiUuid() {
    return "759f53ba-7fab-4a14-8553-c8c902616b2b";
  }

  use() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/AI_Patch_LogDespammer/AI_Patch_LogDespammer.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/plugins/IllusionFixes/AI_Patch_LogDespammer.dll",
          dst: "bin/BepInEx/plugins/IllusionFixes/AI_Patch_LogDespammer.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.AI, uuid: LogDespammerPath.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "cde02419-a4ea-428c-b98d-d7efc5bbd272",
      name: "LogDespammerPlugin",
      desc: "",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class CultureFixPath implements IPackage {
  static get EcUuid() {
    return "094b944c-959e-4055-b8de-6cb5e963e4be";
  }

  static get AiUuid() {
    return "a21eb1a5-7721-4687-8c16-8478229e5fd2";
  }

  static get Hs2Uuid() {
    return "488673d3-e47d-437e-9338-721204413631";
  }

  use() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/Patch_CultureFix/Patch_CultureFix.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/patchers/CultureFix.dll",
          dst: "bin/BepInEx/patchers/CultureFix.dll",
        },
      ],
    });

    this.#builder.use({
      games: [
        { id: Game.AI, uuid: CultureFixPath.AiUuid, deps: [BepInExPlugin.AiUuid] },
        { id: Game.HS2, uuid: CultureFixPath.Hs2Uuid, deps: [BepInExPlugin.Hs2Uuid] },
      ],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "66365308-bb1e-4a54-aea8-056b7a753e43",
      name: "CultureFix",
      desc:
        "Set process culture to ja-JP, similarly to a locale emulator. Fixes game crashes and lockups on some system locales",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class MagicCarrotPath implements IPackage {
  static get AiUuid() {
    return "486dee0e-e431-4587-bb31-88defa2bd372";
  }

  use() {
    const resolver = new VSResolver({
      dir: "/",
      build: [
        new VSProjectResolver({
          file: "src/Patch_MagicCarrot/.csproj",
          ignore: [],
        }),
      ],
    });

    const mover = new FileMover({
      files: [
        {
          src: "bin/BepInEx/patchers/Patch_MagicCarrot.dll",
          dst: "bin/BepInEx/patchers/Patch_MagicCarrot.dll",
        },
      ],
    });

    this.#builder.use({
      games: [{ id: Game.AI, uuid: MagicCarrotPath.AiUuid, deps: [BepInExPlugin.AiUuid] }],
      lang: this.#lang,
      nodes: [this.#placer, resolver, mover],
    });
  }

  constructor(info: IParams) {
    this.#builder = info.builder;
    this.#lang = info.builder.lang({
      uuid: "41567941-3f02-4802-a5b9-f214bcf35fa6",
      name: "MagicCarrot",
      desc: "Prevents the game from locking up when starting",
    });
    this.#placer = info.placer;
  }

  #lang: Lang;
  #placer: GitPlacer;
  #builder: PackageBuilder;
}

export class IllusionFixesPlugin implements IPackageBuilder {
  get builder() {
    return this.#builder;
  }

  use() {
    for (const pack of this.#packages) {
      pack.use();
    }
  }

  constructor() {
    this.#builder = new PackageBuilder("62c81393-0655-4034-a999-c049850d8485");
    const placer = new GitPlacer({ url: "https://github.com/IllusionMods/IllusionFixes" });

    this.#packages.push(
      new CameraTargetPlugin({ builder: this.builder, placer }),
      new CardImportPlugin({ builder: this.builder, placer }),
      new CharacterListOptimizationsPlugin({ builder: this.builder, placer }),
      new CenteredHSceneCursorPlugin({ builder: this.builder, placer }),
      new DownloadRenamerPlugin({ builder: this.builder, placer }),
      new ExpandShaderDropdownPlugin({ builder: this.builder, placer }),
      new HeterochromiaFixPlugin({ builder: this.builder, placer }),
      new InvalidSceneFileProtectionPlugin({ builder: this.builder, placer }),
      // new LoadingFixesPlugin({ builder: this.builder, placer }),
      new MainGameOptimizationsPlugin({ builder: this.builder, placer }),
      new MakerOptimizationsPlugin({ builder: this.builder, placer }),
      new ManifestCorrectorPlugin({ builder: this.builder, placer }),
      new ModdedHeadEyelinerPlugin({ builder: this.builder, placer }),
      new NewGameShowAllCardsPlugin({ builder: this.builder, placer }),
      new NodeEditorUnlockPlugin({ builder: this.builder, placer }),
      new NullChecksPlugin({ builder: this.builder, placer }),
      new PartyCardCompatibilityPlugin({ builder: this.builder, placer }),
      new PersonalityCorrectorPlugin({ builder: this.builder, placer }),
      new PoseLoadPlugin({ builder: this.builder, placer }),
      new ResourceUnloadOptimizationsPlugin({ builder: this.builder, placer }),
      new SettingsVerifierPlugin({ builder: this.builder, placer }),
      new ShowerAccessoriesPlugin({ builder: this.builder, placer }),
      new UnlimitedMapLightsPlugin({ builder: this.builder, placer }),
      new SteamReleaseCompatibilityPath({ builder: this.builder, placer }),
      new LogDespammerPath({ builder: this.builder, placer }),
      new CultureFixPath({ builder: this.builder, placer }),
      new MagicCarrotPath({ builder: this.builder, placer })
    );
  }

  #builder: PackageBuilder;
  #packages: IPackage[] = [];
}

export const IllusionFixesPluginAdd = () => {
  const plugin = new IllusionFixesPlugin();
  plugin.use();
  return plugin.builder;
};

// https://youtu.be/oZ_hW1E3q74?list=RDMMZJ__TExqiQk
