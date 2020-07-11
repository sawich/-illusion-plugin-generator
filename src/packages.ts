import { PackageContext } from "./core/package-builder";
import { BepInExPluginAdd, ConfigurationManagerPluginAdd } from "./packages/bep-in-ex-package";
import { BepisPluginsPluginAdd } from "./packages/bepis-plugins-package";
import { BetterHScenesPluginAdd } from "./packages/better-h-scenes-package";
import { HCharaSwitcherPluginAdd } from "./packages/h-chara-switcher-package";
import { IllusionBrowserFoldersPluginAdd } from "./packages/illusion-browser-folders-package";
import { IllusionFixesPluginAdd } from "./packages/illusion-fixes-builder";

export const context = new PackageContext();

context.use(BepInExPluginAdd());
context.use(BepisPluginsPluginAdd());
context.use(ConfigurationManagerPluginAdd());
context.use(BetterHScenesPluginAdd());
context.use(HCharaSwitcherPluginAdd());
context.use(IllusionBrowserFoldersPluginAdd());
context.use(IllusionFixesPluginAdd());
