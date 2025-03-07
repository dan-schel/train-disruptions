import { Repository } from "./database";
import { DatabaseModel } from "./database-model";
import {
  MigrationDeleteCommand,
  MigrationDropCommand,
  MigrationMapCommand,
  MigrationRenameCommand,
} from "./migration-command-types";

/**
 * Represents a one-off job to run on the database before the server starts.
 * Typically used if the database schema has changed (e.g. you've added a
 * column) and you need to migrate existing data to the new format.
 */
export abstract class Migration {
  constructor(
    /**
     * An ID for this migration. Must be prefixed with a YYYY-MM-DD date, e.g.
     * `2025-03-07-rename-alerts-model`.
     */
    readonly id: string,
  ) {
    if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/g.test(id)) {
      // This will give the date in UTC, which will be incorrect before 10/11am
      // in Melbourne, but close enough! The dev can correct it if they want.
      const suggestedName = `${new Date().toISOString().slice(0, 10)}-${id}`;

      throw new Error(
        `Migration "${id}" should prefix its name with the date it was ` +
          `written, e.g. "${suggestedName}".`,
      );
    }
  }

  abstract run(migrator: Migrator): Promise<void>;
}

/**
 * Allows the migration author to write a migration with a generic interface, so
 * they can write migrations that work with any database implementation.
 */
export abstract class Migrator {
  /**
   * Used to convert records from one format to another (e.g. adding a field).
   *
   * (If you're migrating a large collection, be sure to include a where clause
   * to avoid loading the entire collection into memory.)
   */
  abstract map(query: MigrationMapCommand): Promise<void>;

  /**
   * Used to delete all records matching a certain predicate without parsing
   * them against a model first (e.g. if the model has changed and you want to
   * delete all records that will be incompatible with the new model).
   *
   * (If possible use where instead of predicate, as it avoids loading the
   * entire collection into memory.)
   */
  abstract delete(query: MigrationDeleteCommand): Promise<void>;

  /** Used to rename an entire collection. */
  abstract rename(query: MigrationRenameCommand): Promise<void>;

  /** Used to delete a collection entirely. */
  abstract drop(query: MigrationDropCommand): Promise<void>;

  /**
   * Used to run regular database operations in situations where the data shape
   * hasn't changed, but you need to run a one-off job.
   */
  abstract withModel<Model extends DatabaseModel>(
    model: Model,
  ): Repository<Model>;
}
