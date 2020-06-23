import { PackageBuilder } from "./core/package-builder";
import { BepInEx, ConfigurationManager } from "./plugins/BepInEx";
import { BetterHScenes } from "./plugins/BetterHScenes";
import { Illusion_BrowserFolders } from "./plugins/Illusion_BrowserFolders";
import { IllusionFixesBuilder } from "./plugins/IllusionFixesBuilder";

const builder = new PackageBuilder();

const bepInEx = BepInEx(builder);
ConfigurationManager(builder, bepInEx);

BetterHScenes(builder, bepInEx);
Illusion_BrowserFolders(builder, bepInEx);

const ifb = new IllusionFixesBuilder(builder);
ifb.addDependence(bepInEx);
ifb.build();

builder.build();
