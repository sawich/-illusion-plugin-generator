// import { VSPartialResolve } from "../core/package-builder/resolvers/vs-partial-resolver";
// import { AResolve } from "../core/package-builder/resolvers/vs-resolver";
// import { GitPlace } from "../core/package-builder/places/git-placer";
// import { Game } from "../core/package-builder/types/game";
// import { PackageBuilder } from "../core/package-builder";

// export const Illusion_BrowserFolders = (builder: PackageBuilder, plugin: AResolve) => {
//   const lang = builder.lang("BrowserFolders", "Maker and Studio File Browser Folders for games by Illusion");

//   const resolver = new VSPartialResolve(plugin);
//   resolver.addResolve({ files: [], lang, games: [Game.AI], folder: "AI_BrowserFolders" });
//   resolver.addResolve({ files: [], lang, games: [Game.HS2], folder: "HS2_BrowserFolders" });
//   resolver.addResolve({ files: [], lang, games: [Game.KK], folder: "KK_FolderBrowser" });

//   builder.addPlugin({
//     placer: new GitPlace({ url: "https://github.com/ManlyMarco/Illusion_BrowserFolders" }),
//     resolver,
//   });
// };
