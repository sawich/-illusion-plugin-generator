import { GameBuilder } from "src/core/game-builder";

import { Game } from "../core/game-builder/game";
import { Game as GameType } from "../core/package-builder/types/game";

export const AddAIShoujoSteamGame = (builder: GameBuilder) => {
  const name = "AI Shoujo Steam";
  const dlls: string[] = [];

  const game = new Game({ game: GameType.AIS, name, dlls });
  builder.addGame(game);
};
