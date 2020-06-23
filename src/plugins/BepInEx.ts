import { PackageBuilder, PluginGameType, PluginResolver, GitPlugin } from "../package-builder";

export const BepInEx = (builder: PackageBuilder) => {
  return builder.addGit(
    builder.lang("BepInEx", "Bepis Injector Extensible"),
    [PluginGameType.PH, PluginGameType.HS1, PluginGameType.KK, PluginGameType.AI, PluginGameType.HS2],
    PluginResolver.VSCSP,
    "https://github.com/BepInEx/BepInEx"
  );
};

export const ConfigurationManager = (builder: PackageBuilder, b: GitPlugin) => {
  const plugin = builder.addGit(
    builder.lang("BepInEx.ConfigurationManager", "Mod configuration manager for BepInEx 5"),
    b.games,
    PluginResolver.VSCSP,
    "https://github.com/BepInEx/BepInEx.ConfigurationManager"
  );

  plugin.addDependence(b);
  return plugin;
};
