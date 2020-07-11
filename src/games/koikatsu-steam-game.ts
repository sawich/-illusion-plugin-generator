import { GameBuilder } from "../core/game-builder";
import { Game } from "../core/game-builder/game";
import { Game as GameType } from "../core/package-builder/types/game";

export const AddKoikatsuSteamGame = (builder: GameBuilder) => {
  const name = "Koikatsu Steam";
  const dlls: string[] = [];

  const game = new Game({ game: GameType.KKS, name, dlls });
  builder.addGame(game);
};
