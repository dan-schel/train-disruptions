import { Database, Repository } from "../general/database";
import { DatabaseModel } from "../general/database-model";
import { InMemoryDatabaseCollection } from "./in-memory-database-collection";
import { InMemoryRepository } from "./in-memory-repository";

export class InMemoryDatabase extends Database {
  private readonly data: Map<string, InMemoryDatabaseCollection>;

  constructor() {
    super();
    this.data = new Map<string, InMemoryDatabaseCollection>();
  }

  of<Model extends DatabaseModel>(model: Model): Repository<Model> {
    return new InMemoryRepository(model, this._collection(model.name));
  }

  private _collection(name: string) {
    if (this.data.has(name)) {
      return this.data.get(name)!;
    }

    const collection = new InMemoryDatabaseCollection();
    this.data.set(name, collection);
    return collection;
  }
}
