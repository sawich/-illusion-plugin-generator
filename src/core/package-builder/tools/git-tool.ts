// import { PluginPlaceType } from "../types/plugin-placer-type";
// import { PluginResolver } from "../plugin-resolver";
// import { ContainerType } from "../types/container-type";
// import { Entity } from "../entity";

// export class GitTool extends Entity {
//   build() {
//     return { ...super.header, identity: this.#identity, url: this.#url };
//   }

//   constructor(lang: number, resolver: PluginResolver, url: string) {
//     super(lang, ContainerType.Entity, PluginPlaceType.Git, resolver);

//     this.#url = url;
//     this.#identity = IdEntity.makeIdentity();
//   }

//   #url: string;
//   #identity: number;
// }
