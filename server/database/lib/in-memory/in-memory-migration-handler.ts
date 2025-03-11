import {
  MigrationHandler,
  Repository,
} from "@/server/database/lib/general/database";
import { DatabaseModel } from "@/server/database/lib/general/database-model";
import { Migrator } from "@/server/database/lib/general/migration";
import {
  MigratorMapCommand,
  MigratorDeleteCommand,
  MigratorRenameCommand,
  MigratorDropCommand,
} from "@/server/database/lib/general/migration-command-types";
import {
  InMemoryDatabaseData,
  InMemoryDatabaseItem,
} from "@/server/database/lib/in-memory/in-memory-database-collection";
import { InMemoryRepository } from "@/server/database/lib/in-memory/in-memory-repository";
import { InMemoryWhereClauseInterpreter } from "@/server/database/lib/in-memory/in-memory-where-clause-interpreter";

export class InMemoryMigrationHandler extends MigrationHandler {
  constructor(private readonly _data: InMemoryDatabaseData) {
    super();
  }

  protected getMigrator(): Migrator {
    return new InMemoryMigrator(this._data);
  }

  protected async getCompletedMigrationIds(): Promise<string[]> {
    return this._data.getCompletedMigrations();
  }

  protected async markMigrationComplete(id: string): Promise<void> {
    this._data.addCompletedMigration(id);
  }
}

export class InMemoryMigrator extends Migrator {
  constructor(private readonly _data: InMemoryDatabaseData) {
    super();
  }

  async map(query: MigratorMapCommand): Promise<void> {
    const filter = new InMemoryWhereClauseInterpreter(query.where);
    const collection = this._data.collection(query.collection);
    const items = collection.find((item) => filter.matches(item));

    for (const item of items) {
      const newItem = await query.fn(this._stripId(item), item.id);
      collection.update({ ...newItem, id: item.id });
    }
  }

  async delete(query: MigratorDeleteCommand): Promise<void> {
    const filter = new InMemoryWhereClauseInterpreter(query.where);
    const collection = this._data.collection(query.collection);
    const items = collection.find((item) => filter.matches(item));

    for (const item of items) {
      if (
        query.predicate == null ||
        query.predicate(this._stripId(item), item.id)
      ) {
        collection.delete(item.id);
      }
    }
  }

  async rename(query: MigratorRenameCommand): Promise<void> {
    this._data.renameCollection(
      query.oldCollectionName,
      query.newCollectionName,
    );
  }

  async drop(query: MigratorDropCommand): Promise<void> {
    this._data.dropCollection(query.collection);
  }

  withModel<Model extends DatabaseModel>(model: Model): Repository<Model> {
    return new InMemoryRepository(model, this._data.collection(model.name));
  }

  private _stripId(item: InMemoryDatabaseItem): unknown {
    return { ...item, id: undefined };
  }
}
