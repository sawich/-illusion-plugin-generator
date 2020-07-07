// import { Game } from "../types/game";
// import { Resolve } from "../types/resolver";
// import { IBuildable } from "../types/buildable";

// export class ProjectGitPartialPlugin implements IEntity, IBuildable {
//   addDependence(...entities: IEntity[]) {
//     this.#dependencies.push(...entities);
//   }

//   get entity() {
//     return this.#entity;
//   }

//   build() {
//     return {
//       ...this.#entity.build(),
//       dependencies: this.#dependencies.map((d) => d.entity.id),
//       games: Array.from(this.#games),
//       folder: this.#folder,
//     };
//   }

//   constructor(entity: { lang: number; resolver: Resolve }, plugin: { games: Game[]; folder: string }) {
//     this.#entity = new Entity({ lang: entity.lang, resolver: entity.resolver });
//     this.#folder = plugin.folder;
//     this.#games = new Set(plugin.games);
//   }

//   #entity: Entity;
//   #dependencies: IEntity[] = [];
//   #games: Set<Game>;
//   #folder: string;
// }
