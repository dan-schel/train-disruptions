import { Database, MigrationHandler, Repository } from "../general/database";
import { DatabaseModel } from "../general/database-model";
import { InMemoryDatabaseData } from "./in-memory-database-collection";
import { InMemoryMigrationHandler } from "./in-memory-migration-handler";
import { InMemoryRepository } from "./in-memory-repository";

export class InMemoryDatabase extends Database {
  private readonly _data: InMemoryDatabaseData;

  constructor() {
    super();
    this._data = new InMemoryDatabaseData();
  }

  of<Model extends DatabaseModel>(model: Model): Repository<Model> {
    return new InMemoryRepository(model, this._data.collection(model.name));
  }

  getMigrationHandler(): MigrationHandler {
    return new InMemoryMigrationHandler(this._data);
  }
}
