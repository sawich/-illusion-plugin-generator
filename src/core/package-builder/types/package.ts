import { PackageBuilder } from "../";

export interface IPackage {
  use(): void;
}

export interface IPackageBuilder extends IPackage {
  builder: PackageBuilder;
}
