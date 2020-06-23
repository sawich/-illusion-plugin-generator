import { PackageBuilder } from "./package-builder";
import { GitPlugin } from "./package-builder/plugins/git-plugin";
import { GitPartialPlugin } from "./package-builder/plugins/git-partial-plugin";
import { Plugin } from "./package-builder/plugin";
import { PluginResolver } from "./package-builder/plugin-resolver";
import { PluginGameType } from "./package-builder/types/plugin-game-type";

export abstract class PluginBuilder {
  protected get builder() {
    return this._builder;
  }

  abstract build(): void;

  protected constructor(builder: PackageBuilder) {
    this._builder = builder;
  }

  private _builder: PackageBuilder;
}

export abstract class GitPartialPluginBuilder extends PluginBuilder {
  protected get plugin() {
    return this._plugin;
  }

  addDependence(plugin: Plugin) {
    this._plugin.addDependence(plugin);
  }

  protected constructor(builder: PackageBuilder, url: string) {
    super(builder);
    this._plugin = builder.addGitPartialPlugin(url);
  }

  private _plugin: GitPartialPlugin;
}

export abstract class GitPluginBuilder extends PluginBuilder {
  get plugin() {
    return this._plugin;
  }

  addDependence(...plugin: Plugin[]) {
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
    this._plugin = builder.addGitPlugin(lang, games, resolver, url);
  }

  private _plugin: GitPlugin;
}
