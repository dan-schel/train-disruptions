import { DatabaseModel, IdOf } from "./database-model";
import { SerializedObject } from "./serialized-types";
import { WhereClause } from "./where-clause";

/** Arguments to the Migrator's map command. */
export type MigratorMapCommand = {
  collection: string;
  fn: (input: unknown, id: IdOf<DatabaseModel>) => Promise<SerializedObject>;
  where?: WhereClause<DatabaseModel>;
};

/** Arguments to the Migrator's delete command. */
export type MigratorDeleteCommand = {
  collection: string;
  where?: WhereClause<DatabaseModel>;
  predicate?: (input: unknown, id: IdOf<DatabaseModel>) => boolean;
};

/** Arguments to the Migrator's rename command. */
export type MigratorRenameCommand = {
  oldCollectionName: string;
  newCollectionName: string;
};

/** Arguments to the Migrator's drop command. */
export type MigratorDropCommand = { collection: string };
