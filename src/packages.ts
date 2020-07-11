import { PackageContext } from "./core/package-builder";
import { BepInExPluginAdd } from "./packages/bep-in-ex/bep-in-ex-package";
import { BepisPluginsPluginAdd } from "./packages/bep-in-ex/bepis-plugins-package";
import { ConfigurationManagerPluginAdd } from "./packages/bep-in-ex/configuration-manager-package";
import { BetterHScenesPluginAdd } from "./packages/mantas-2155x/better-h-scenes-package";
import { HCharaSwitcherPluginAdd } from "./packages/mantas-2155x/h-chara-switcher-package";
import {
    IllusionBrowserFoldersPluginAdd
} from "./packages/mantas-2155x/illusion-browser-folders-package";
import { IllusionFixesPluginAdd } from "./packages/mantas-2155x/illusion-fixes-package";
import { UnlockPlayerHeightPluginAdd } from "./packages/mantas-2155x/unlock-player-height-package";

export const context = new PackageContext();

context.use(BepInExPluginAdd());
context.use(BepisPluginsPluginAdd());
context.use(ConfigurationManagerPluginAdd());
context.use(BetterHScenesPluginAdd());
context.use(HCharaSwitcherPluginAdd());
context.use(IllusionBrowserFoldersPluginAdd());
context.use(IllusionFixesPluginAdd());
context.use(UnlockPlayerHeightPluginAdd());
