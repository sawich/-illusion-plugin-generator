import { PackageBuilder } from "./core/package-builder";
import { BepInExPluginAdd, ConfigurationManagerPluginAdd } from "./plugins/bep-in-ex-plugin";
import { BepisPluginsPluginAdd } from "./plugins/bepis-plugins-plugin";
import { BetterHScenesPluginAdd } from "./plugins/better-h-scenes-plugin";
import { HCharaSwitcherPluginAdd } from "./plugins/h-chara-switcher-plugin";
import { IllusionBrowserFoldersPluginAdd } from "./plugins/illusion-browser-folders";

// import { IllusionFixesBuilder } from "./plugins/IllusionFixesBuilder";

const builder = new PackageBuilder();

BepInExPluginAdd(builder);
BepisPluginsPluginAdd(builder);
ConfigurationManagerPluginAdd(builder);
BetterHScenesPluginAdd(builder);
HCharaSwitcherPluginAdd(builder);
IllusionBrowserFoldersPluginAdd(builder);

// const ifb = new IllusionFixesBuilder(builder);
// ifb.addDependence(bepInEx);
// ifb.build();

builder.build();
