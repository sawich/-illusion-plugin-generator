import { GameBuilder } from "../core/game-builder";
import { Game } from "../core/game-builder/game";
import { Game as GameType } from "../core/package-builder/types/game";

export const AddKoikatsuGame = (builder: GameBuilder) => {
  const name = "Koikatsu";
  const dlls: string[] = [
    "Koikatu_Data/Managed/AmplifyColor.dll",
    "Koikatu_Data/Managed/AmplifyOcclusion.dll",
    "Koikatu_Data/Managed/Assembly-CSharp-firstpass.dll",
    "Koikatu_Data/Managed/Assembly-CSharp.dll",
    "Koikatu_Data/Managed/Assembly-UnityScript.dll",
    "Koikatu_Data/Managed/Boo.Lang.dll",
    "Koikatu_Data/Managed/DOTween.dll",
    "Koikatu_Data/Managed/DOTween43.dll",
    "Koikatu_Data/Managed/DOTween46.dll",
    "Koikatu_Data/Managed/DOTween50.dll",
    "Koikatu_Data/Managed/Mono.Security.dll",
    "Koikatu_Data/Managed/mscorlib.dll",
    "Koikatu_Data/Managed/Sirenix.OdinInspector.Attributes.dll",
    "Koikatu_Data/Managed/Sirenix.Serialization.Config.dll",
    "Koikatu_Data/Managed/Sirenix.Serialization.dll",
    "Koikatu_Data/Managed/Sirenix.Utilities.dll",
    "Koikatu_Data/Managed/System.Core.dll",
    "Koikatu_Data/Managed/System.dll",
    "Koikatu_Data/Managed/System.Runtime.Serialization.dll",
    "Koikatu_Data/Managed/System.Xml.dll",
    "Koikatu_Data/Managed/System.Xml.Linq.dll",
    "Koikatu_Data/Managed/TextMeshPro-1.0.55.56.0b12.dll",
    "Koikatu_Data/Managed/UnityEngine.dll",
    "Koikatu_Data/Managed/UnityEngine.Networking.dll",
    "Koikatu_Data/Managed/UnityEngine.UI.dll",
    "Koikatu_Data/Managed/Vectrosity.dll",
  ];

  const game = new Game({ game: GameType.KK, name, dlls });
  builder.addGame(game);
};
