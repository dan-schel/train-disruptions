import {
  Database,
  MigrationHandler,
  Repository,
} from "@/server/database/lib/general/database";
import { DatabaseModel } from "@/server/database/lib/general/database-model";
import { InMemoryDatabaseData } from "@/server/database/lib/in-memory/in-memory-database-collection";
import { InMemoryMigrationHandler } from "@/server/database/lib/in-memory/in-memory-migration-handler";
import { InMemoryRepository } from "@/server/database/lib/in-memory/in-memory-repository";

export class InMemoryDatabase extends Database {
  private readonly _data: InMemoryDatabaseData;

  constructor() {
    super();
    this._data = new InMemoryDatabaseData();
  }

  of<Model extends DatabaseModel>(model: Model): Repository<Model> {
    return new InMemoryRepository(model, this._data.collection(model.name));
  }

  protected getMigrationHandler(): MigrationHandler {
    return new InMemoryMigrationHandler(this._data);
  }
}
