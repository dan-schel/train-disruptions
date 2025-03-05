import { Repository } from "./database";
import { DatabaseModel } from "./database-model";
import { SerializedObject } from "./serialized-types";
import { WhereClause } from "./where-clause";

/**
 * Represents a one-off job to run on the database before the server starts.
 * Typically used if the database schema has changed (e.g. you've added a
 * column) and you need to migrate existing data to the new format.
 */
export abstract class Migration {
  constructor(
    /** An ID for this migration. Can be anything as long as it's unique! */
    readonly id: string,
  ) {}

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
  abstract map(options: {
    collection: string;
    fn: (input: SerializedObject) => Promise<SerializedObject>;
    where?: WhereClause<DatabaseModel>;
  }): Promise<void>;

  /**
   * Used to delete all records matching a certain predicate without parsing
   * them against a model first (e.g. if the model has changed and you want to
   * delete all records that will be incompatible with the new model).
   *
   * (If possible use where instead of predicate, as it avoids loading the
   * entire collection into memory.)
   */
  abstract delete(options: {
    collection: string;
    where?: WhereClause<DatabaseModel>;
    predicate?: (input: SerializedObject) => boolean;
  }): Promise<void>;

  /** Used to rename an entire collection. */
  abstract rename(options: {
    oldCollectionName: string;
    newCollectionName: string;
  }): Promise<void>;

  /** Used to delete a collection entirely. */
  abstract drop(options: { collection: string }): Promise<void>;

  /**
   * Used to run regular database operations in situations where the data shape
   * hasn't changed, but you need to run a one-off job.
   */
  abstract withModel<Model extends DatabaseModel>(
    model: Model,
  ): Repository<Model>;
}
