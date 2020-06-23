import { PackageBuilder } from "../core/package-builder";
import { GitPlugin } from "../core/package-builder/plugins/git-plugin";
import { PluginResolver } from "../core/package-builder/plugin-resolver";
import { PluginGameType } from "../core/package-builder/types/plugin-game-type";

export const Illusion_BrowserFolders = (pb: PackageBuilder, bepInEx: GitPlugin) => {
  const git = pb.addGitPartialPlugin("https://github.com/ManlyMarco/Illusion_BrowserFolders");
  git.addDependence(bepInEx);

  const lang = pb.lang("BrowserFolders", "Maker and Studio File Browser Folders for games by Illusion");
  git.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_BrowserFolders");
  git.addProject(lang, [PluginGameType.HS2], PluginResolver.VSCSP, "HS2_BrowserFolders");
  git.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_FolderBrowser");
};
