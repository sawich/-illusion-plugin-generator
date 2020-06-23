import {
  PackageBuilder,
  BasePlugin,
  GitPartialPlugin,
  GitPlugin,
  PluginGameType,
  PluginResolver,
} from "./package-builder";

export abstract class PluginBuilder {
  protected get builder() {
    return this._builder;
  }

  public abstract build(): void;

  protected constructor(builder: PackageBuilder) {
    this._builder = builder;
  }

  private _builder: PackageBuilder;
}

export abstract class GitPartialPluginBuilder extends PluginBuilder {
  protected get plugin() {
    return this._plugin;
  }

  public addDependence(plugin: BasePlugin) {
    this._plugin.addDependence(plugin);
  }

  protected constructor(builder: PackageBuilder, url: string) {
    super(builder);
    this._plugin = builder.addGitPartial(url);
  }

  private _plugin: GitPartialPlugin;
}

export abstract class GitPluginBuilder extends PluginBuilder {
  public get plugin() {
    return this._plugin;
  }

  public addDependence(...plugin: BasePlugin[]) {
    this._plugin.addDependence(...plugin);
  }

  protected constructor(
    builder: PackageBuilder,
    url: string,
    name: string,
    description: string,
    games: PluginGameType[],
    resolver: PluginResolver
  ) {
    super(builder);

    const lang = builder.lang(name, description);
    this._plugin = builder.addGit(lang, games, resolver, url);
  }

  private _plugin: GitPlugin;
}
