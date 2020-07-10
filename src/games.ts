import { GameBuilder } from "./core/game-builder";
import { AddAIShoujoGame } from "./games/ai-shoujo-game";
import { AddAIShoujoSteamGame } from "./games/ai-shoujo-steam-game";
import { AddEmotionCreatorsGame } from "./games/emotion-creators-game";
import { AddHoneySelect2Game } from "./games/honey-select-2-game";
import { AddHoneySelectGame } from "./games/honey-select-game";
import { AddKoikatsuGame } from "./games/koikatsu-game";
import { AddKoikatsuSteamGame } from "./games/koikatsu-steam-game";
import { AddPlayHomeGame } from "./games/play-home-game";

export const builder = new GameBuilder();

AddAIShoujoSteamGame(builder);
AddEmotionCreatorsGame(builder);
AddHoneySelect2Game(builder);
AddHoneySelectGame(builder);
AddKoikatsuGame(builder);
AddKoikatsuSteamGame(builder);
AddPlayHomeGame(builder);
AddAIShoujoGame(builder);
