import { PackageBuilder } from "./core/package-builder";
import { BepInExPluginAdd, ConfigurationManagerPluginAdd } from "./packages/bep-in-ex-plugin";
import { BepisPluginsPluginAdd } from "./packages/bepis-plugins-plugin";
import { BetterHScenesPluginAdd } from "./packages/better-h-scenes-plugin";
import { HCharaSwitcherPluginAdd } from "./packages/h-chara-switcher-plugin";
import { IllusionBrowserFoldersPluginAdd } from "./packages/illusion-browser-folders";
import { IllusionFixesPluginAdd } from "./packages/illusion-fixes-builder";

export const builder = new PackageBuilder();

BepInExPluginAdd(builder);
BepisPluginsPluginAdd(builder);
ConfigurationManagerPluginAdd(builder);
BetterHScenesPluginAdd(builder);
HCharaSwitcherPluginAdd(builder);
IllusionBrowserFoldersPluginAdd(builder);
IllusionFixesPluginAdd(builder);
