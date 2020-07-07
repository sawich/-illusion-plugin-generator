// import { IBuildable } from "./types/buildable";
// import { Unique } from "./unique";

// export class Entity implements IBuildable {
//   get id() {
//     return this.#id;
//   }

//   get lang() {
//     return this.#lang;
//   }

//   addDependence(...plugins: Entity[]) {
//     this.#dependencies.push(...plugins);
//   }

//   build() {
//     return {
//       id: this.#id,
//       lang: this.#lang,
//       dependencies: this.#dependencies.map((d) => d.id),
//     };
//   }

//   constructor(plugin: {}) {}
// }
