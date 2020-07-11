import { GameBuilder } from "../core/game-builder";
import { Game } from "../core/game-builder/game";
import { Game as GameType } from "../core/package-builder/types/game";

export const AddHoneySelectGame = (builder: GameBuilder) => {
  const name = "Honey Select";
  const dlls: string[] = [];

  const game = new Game({ game: GameType.HS1, name, dlls });
  builder.addGame(game);
};
