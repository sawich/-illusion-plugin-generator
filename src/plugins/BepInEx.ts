import { PackageBuilder, PluginGameType, PluginResolver } from "../package-builder";

export const BepInEx = (pb: PackageBuilder) => {
  const git = pb.addGit(
    pb.lang("BepInEx", "Bepis Injector Extensible"),
    [PluginGameType.PH, PluginGameType.HS1, PluginGameType.KK, PluginGameType.AI, PluginGameType.HS2],
    PluginResolver.VSCSP,
    "https://github.com/BepInEx/BepInEx"
  );
  return git;
};
