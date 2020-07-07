import { PackageBuilder } from "./core/package-builder";
import { BepInExPluginAdd, ConfigurationManagerPluginAdd } from "./plugins/BepInEx";
import { BetterHScenesPluginAdd } from "./plugins/BetterHScenes";
// import { Illusion_BrowserFolders } from "./plugins/Illusion_BrowserFolders";
// import { IllusionFixesBuilder } from "./plugins/IllusionFixesBuilder";

const builder = new PackageBuilder();

// const bepInEx = BepInEx(builder);
// ConfigurationManager(builder, bepInEx);
BepInExPluginAdd(builder);
ConfigurationManagerPluginAdd(builder);
BetterHScenesPluginAdd(builder);

// Illusion_BrowserFolders(builder, bepInEx);

// const ifb = new IllusionFixesBuilder(builder);
// ifb.addDependence(bepInEx);
// ifb.build();

builder.build();
