import { Database, ModelResolver } from "../general/database";
import { DatabaseModel } from "../general/database-model";
import {
  InMemoryDatabaseCollection,
  InMemoryModelResolver,
} from "./in-memory-model-resolver";

export class InMemoryDatabase extends Database {
  private readonly data: Map<string, InMemoryDatabaseCollection>;

  constructor() {
    super();
    this.data = new Map<string, InMemoryDatabaseCollection>();
  }

  of<Model extends DatabaseModel>(model: Model): ModelResolver<Model> {
    return new InMemoryModelResolver(model, this._collection(model.name));
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
