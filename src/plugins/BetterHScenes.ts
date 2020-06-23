import { PackageBuilder } from "../core/package-builder";
import { GitPlugin } from "../core/package-builder/plugins/git-plugin";
import { PluginResolver } from "../core/package-builder/plugin-resolver";
import { PluginGameType } from "../core/package-builder/types/plugin-game-type";

export const BetterHScenes = (pb: PackageBuilder, bepInEx: GitPlugin) => {
  const git = pb.addGitPartialPlugin("https://github.com/Mantas-2155X/BetterHScenes");
  git.addDependence(bepInEx);

  const lang = pb.lang("BetterHScenes", "This plugin fixes HScene performance bugs and adds extra features");
  git.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_BetterHScenes");
  git.addProject(lang, [PluginGameType.HS2], PluginResolver.VSCSP, "HS2_BetterHScenes");
};
