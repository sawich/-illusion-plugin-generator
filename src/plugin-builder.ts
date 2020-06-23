import { PackageBuilder, BasePlugin, GitPartialPlugin } from "./package-builder";

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

  public addDependencies(...plugin: BasePlugin[]) {
    this._plugin.addDependencies(...plugin);
  }

  protected constructor(builder: PackageBuilder, url: string) {
    super(builder);
    this._plugin = builder.addGitPartial(url);
  }

  private _plugin: GitPartialPlugin;
}
