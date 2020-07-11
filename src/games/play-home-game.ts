import { GameBuilder } from "../core/game-builder";
import { Game } from "../core/game-builder/game";
import { Game as GameType } from "../core/package-builder/types/game";

export const AddPlayHomeGame = (builder: GameBuilder) => {
  const name = "Play Home";
  const dlls: string[] = [];

  const game = new Game({ game: GameType.PH, name, dlls });
  builder.addGame(game);
};
