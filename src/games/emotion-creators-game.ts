import { GameBuilder } from "src/core/game-builder";

import { Game } from "../core/game-builder/game";
import { Game as GameType } from "../core/package-builder/types/game";

export const AddEmotionCreatorsGame = (builder: GameBuilder) => {
  const name = "Emotion Creators Steam";
  const dlls: string[] = [];

  const game = new Game({ game: GameType.EC, name, dlls });
  builder.addGame(game);
};
