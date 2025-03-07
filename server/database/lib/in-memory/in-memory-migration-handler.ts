import { MigrationHandler, Repository } from "../general/database";
import { DatabaseModel } from "../general/database-model";
import { Migrator } from "../general/migration";
import {
  MigrationMapCommand,
  MigrationDeleteCommand,
  MigrationRenameCommand,
  MigrationDropCommand,
} from "../general/migration-command-types";
import {
  InMemoryDatabaseData,
  InMemoryDatabaseItem,
} from "./in-memory-database-collection";
import { InMemoryRepository } from "./in-memory-repository";
import { InMemoryWhereClauseInterpreter } from "./in-memory-where-clause-interpreter";

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

  async map(query: MigrationMapCommand): Promise<void> {
    const filter = new InMemoryWhereClauseInterpreter(query.where);
    const collection = this._data.collection(query.collection);
    const items = collection.find((item) => filter.matches(item));

    for (const item of items) {
      const newItem = await query.fn(this._stripId(item), item.id);
      collection.update({ ...newItem, id: item.id });
    }
  }

  async delete(query: MigrationDeleteCommand): Promise<void> {
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

  async rename(query: MigrationRenameCommand): Promise<void> {
    this._data.renameCollection(
      query.oldCollectionName,
      query.newCollectionName,
    );
  }

  async drop(query: MigrationDropCommand): Promise<void> {
    this._data.dropCollection(query.collection);
  }

  withModel<Model extends DatabaseModel>(model: Model): Repository<Model> {
    return new InMemoryRepository(model, this._data.collection(model.name));
  }

  private _stripId(item: InMemoryDatabaseItem): unknown {
    return { ...item, id: undefined };
  }
}
