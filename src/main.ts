import { PackageBuilder } from "./package-builder";
import { BepInEx } from "./plugins/BepInEx";
import { BetterHScenes } from "./plugins/BetterHScenes";
import { Illusion_BrowserFolders } from "./plugins/Illusion_BrowserFolders";
import { IllusionFixesBuilder } from "./plugins/IllusionFixes";

const pb = new PackageBuilder();

const bepInEx = BepInEx(pb);

BetterHScenes(pb, bepInEx);
Illusion_BrowserFolders(pb, bepInEx);

const ifb = new IllusionFixesBuilder(pb);
ifb.addDependence(bepInEx);
ifb.build();

pb.build();
