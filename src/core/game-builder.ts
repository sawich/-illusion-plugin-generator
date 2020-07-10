import { writeFile } from "fs/promises";
import { join, resolve } from "path";

import { Game } from "./game-builder/game";
import { IGames } from "./game-builder/types/game";
import { removeFiles } from "./helpers/remove-helper";

export class GameBuilder {
  addGame(game: Game) {
    if (this.#games.some((g) => g.id == game.id)) {
      throw new Error("Game exists");
    }

    this.#games.push(game);
  }

  async build() {
    await this.saveGames();
    await this.saveLangs();
  }

  private async saveGames() {
    const path = resolve(this.#apiWorkDir, "games");
    await removeFiles(path);

    for (const game of this.#games) {
      const data = game.build();
      await writeFile(join(path, `${game.id}.json`), JSON.stringify(data));
    }
  }

  private async saveLangs() {
    const data = JSON.stringify(Object.fromEntries(this.#games.map((game) => [game.id, game.name])));

    await writeFile("../illusion-plugin-manager/src/i18n/langs/en/games.json", data);
  }

  #games: IGames = [];

  #apiWorkDir = "../illusion-plugin-fake-api/public";
}
