import { GameBuilder } from "src/core/game-builder";

import { Game } from "../core/game-builder/game";
import { Game as GameType } from "../core/package-builder/types/game";

export const AddAIShoujoGame = (builder: GameBuilder) => {
  const name = "AI Shoujo";
  const dlls: string[] = [];

  const game = new Game({ game: GameType.AI, name, dlls });
  builder.addGame(game);
};
