export class Unique {
  static *idGenerator(): Generator<number, number, number> {
    let id = 0;
    while (true) yield id++;
  }
}
