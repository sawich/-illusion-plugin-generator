import { open } from "fs/promises";

export enum PluginPlaceType {
  Git,
  Patreon,
}

export enum PluginGameType {
  PH,
  HS1,
  KK,
  AI,
  HS2,
}

export enum PluginResolver {
  /** Visual Studio C# Project */
  VSCSP,

  /** Visual Studio C# Solution */
  VSCS,

  /** Visual Studio C++ Solution */
  VSCpp,

  /** Zip archive */
  UnZip,
}

export abstract class PluginProvider {
  public get games() {
    return this.#games;
  }

  protected constructor(games: PluginGameType) {
    this.#games = games;
  }

  #games: PluginGameType;
}

export interface IBuildable {
  build(): object;
}

export class Unique {
  public static *idGenerator() {
    let id = 0;
    while (true) yield id++;
  }
}

export abstract class Identity {
  public static makeIdentity() {
    return Identity.makeId;
  }

  public get identity() {
    return this.#identity;
  }

  #identity = Identity.makeId;

  private static get makeId() {
    return Identity.generateUniqueId.next().value;
  }

  private static generateUniqueId = Unique.idGenerator();
}

export abstract class BasePlugin implements IBuildable {
  public get id() {
    return this.#id;
  }

  public get lang() {
    return this.#lang;
  }

  public get place() {
    return this.#place;
  }

  public get games() {
    return this.#games;
  }

  public get resolver() {
    return this.#resolver;
  }

  public get dependencies() {
    return this.#dependencies;
  }

  public addDependence(...plugins: BasePlugin[]) {
    this.#dependencies.push(...plugins);
  }

  public get header() {
    return {
      id: this.#id,
      lang: this.#lang,
      place: this.#place,
      games: Array.from(this.#games),
      resolver: this.#resolver,
      dependencies: this.#dependencies.map((d) => d.#id),
    };
  }

  public abstract build(): object;

  protected constructor(
    lang: number,
    place: PluginPlaceType,
    games: PluginGameType[] | Set<PluginGameType>,
    resolver: PluginResolver
  ) {
    this.#lang = lang;
    this.#place = place;
    this.#games = new Set(games);
    this.#resolver = resolver;
  }

  #id = BasePlugin.makeId;
  #lang: number;
  #place: PluginPlaceType;
  #games: Set<PluginGameType>;
  #resolver: PluginResolver;
  #dependencies: BasePlugin[] = [];

  private static get makeId() {
    return BasePlugin.generateUniqueId.next().value;
  }

  private static generateUniqueId = Unique.idGenerator();
}

export class ProjectGitPartialPlugin extends BasePlugin {
  public build() {
    return {
      ...super.header,
      identity: this.#parent.identity,
      url: this.#parent.url,
      folder: this.#folder,
    };
  }

  public constructor(
    lang: number,
    games: PluginGameType[],
    resolver: PluginResolver,
    folder: string,
    parent: GitPartialPlugin
  ) {
    super(lang, PluginPlaceType.Git, games, resolver);

    this.#folder = folder;
    this.#parent = parent;
  }

  #folder: string;
  #parent: GitPartialPlugin;
}

export class GitPartialPlugin extends Identity implements IBuildable {
  public get url() {
    return this.#url;
  }

  public addDependence(...plugins: BasePlugin[]) {
    this.#dependencies.push(...plugins);
  }

  public addProject(lang: number, games: PluginGameType[], resolver: PluginResolver, folder: string) {
    const item = new ProjectGitPartialPlugin(lang, games, resolver, folder, this);
    item.addDependence(...this.#dependencies);
    this.#projects.push(item);
    return item;
  }

  public build() {
    return this.#projects.map((p) => p.build());
  }

  public constructor(url: string) {
    super();

    this.#url = url;
  }

  #url: string;
  #projects: ProjectGitPartialPlugin[] = [];
  #dependencies: BasePlugin[] = [];
}

export class GitPlugin extends BasePlugin {
  public build() {
    return {
      ...super.header,
      identity: this.#identity,
      url: this.#url,
    };
  }

  public constructor(
    lang: number,
    games: PluginGameType[] | Set<PluginGameType>,
    resolver: PluginResolver,
    url: string
  ) {
    super(lang, PluginPlaceType.Git, games, resolver);

    this.#url = url;
    this.#identity = Identity.makeIdentity() as number;
  }

  #url: string;
  #identity: number;
}

class Lang {
  public get name() {
    return this.#name;
  }
  public get description() {
    return this.#description;
  }

  public constructor(name: string, description: string) {
    this.#name = name;
    this.#description = description;
  }

  #name: string;
  #description: string;
}

export class PackageBuilder {
  public lang(name: string, description: string) {
    this.#langs.push(new Lang(name, description));
    return this.#lang.next().value as number;
  }

  public async build() {
    {
      const stream = await open("../illusion-plugin-manager/public/plugins.json", "w");
      await stream.write(JSON.stringify(this.#plugins.flatMap((p) => p.build())));
    }
    {
      const stream = await open("lang.json", "w");
      await stream.write(JSON.stringify(this.#langs.map((l) => ({ name: l.name, description: l.description }))));
    }
  }

  public addGitPartial(url: string) {
    const item = new GitPartialPlugin(url);
    this.#plugins.push(item);
    return item;
  }

  public addGit(lang: number, games: PluginGameType[] | Set<PluginGameType>, resolver: PluginResolver, url: string) {
    const item = new GitPlugin(lang, games, resolver, url);
    this.#plugins.push(item);
    return item;
  }

  #langs: Lang[] = [];
  #lang = Unique.idGenerator();
  #plugins: IBuildable[] = [];
}
