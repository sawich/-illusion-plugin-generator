import { PackageBuilder, GitPlugin, PluginGameType, PluginResolver } from "../package-builder";

export const BetterHScenes = (pb: PackageBuilder, bepInEx: GitPlugin) => {
  const git = pb.addGitPartial("https://github.com/Mantas-2155X/BetterHScenes");
  git.addDependence(bepInEx);

  const lang = pb.lang("BetterHScenes", "This plugin fixes HScene performance bugs and adds extra features");
  git.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_BetterHScenes");
  git.addProject(lang, [PluginGameType.HS2], PluginResolver.VSCSP, "HS2_BetterHScenes");
};
