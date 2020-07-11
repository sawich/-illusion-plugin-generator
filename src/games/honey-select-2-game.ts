import { GameBuilder } from "../core/game-builder";
import { Game } from "../core/game-builder/game";
import { Game as GameType } from "../core/package-builder/types/game";

export const AddHoneySelect2Game = (builder: GameBuilder) => {
  const name = "Honey Select 2";
  const dlls: string[] = [];

  const game = new Game({ game: GameType.HS2, name, dlls });
  builder.addGame(game);
};
