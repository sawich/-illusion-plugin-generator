import { PackageBuilder } from "../core/package-builder";
import { GitPlugin } from "../core/package-builder/plugins/git-plugin";
import { PluginResolver } from "../core/package-builder/plugin-resolver";
import { PluginGameType } from "../core/package-builder/types/plugin-game-type";

export const BepInEx = (builder: PackageBuilder) => {
  return builder.addGitPlugin(
    builder.lang("BepInEx", "Bepis Injector Extensible"),
    [PluginGameType.PH, PluginGameType.HS1, PluginGameType.KK, PluginGameType.AI, PluginGameType.HS2],
    PluginResolver.VSCSP,
    "https://github.com/BepInEx/BepInEx"
  );
};

export const ConfigurationManager = (builder: PackageBuilder, b: GitPlugin) => {
  const plugin = builder.addGitPlugin(
    builder.lang("BepInEx.ConfigurationManager", "Mod configuration manager for BepInEx 5"),
    b.games,
    PluginResolver.VSCSP,
    "https://github.com/BepInEx/BepInEx.ConfigurationManager"
  );

  plugin.addDependence(b);
  return plugin;
};
