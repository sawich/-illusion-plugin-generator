import { GameBuilder } from "src/core/game-builder";

import { Game } from "../core/game-builder/game";
import { Game as GameType } from "../core/package-builder/types/game";

export const AddKoikatsuGame = (builder: GameBuilder) => {
  const name = "Koikatsu";
  const dlls: string[] = [];

  const game = new Game({ game: GameType.KK, name, dlls });
  builder.addGame(game);
};
