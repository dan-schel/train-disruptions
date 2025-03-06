import { DatabaseModel, IdOf } from "./database-model";
import { SerializedObject } from "./serialized-types";
import { WhereClause } from "./where-clause";

/** Arguments to the migrators map command. */
export type MigrationMapCommand = {
  collection: string;
  fn: (input: unknown, id: IdOf<DatabaseModel>) => Promise<SerializedObject>;
  where?: WhereClause<DatabaseModel>;
};

/** Arguments to the migrators delete command. */
export type MigrationDeleteCommand = {
  collection: string;
  where?: WhereClause<DatabaseModel>;
  predicate?: (input: unknown, id: IdOf<DatabaseModel>) => boolean;
};

/** Arguments to the migrators rename command. */
export type MigrationRenameCommand = {
  oldCollectionName: string;
  newCollectionName: string;
};

/** Arguments to the migrators drop command. */
export type MigrationDropCommand = { collection: string };
