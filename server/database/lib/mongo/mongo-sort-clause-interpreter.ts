import { Sort } from "mongodb";
import { SortClause } from "@/server/database/lib/general/query-types";
import { DatabaseModel } from "@/server/database/lib/general/database-model";

/** Takes a SortClause and converts it to MongoDB's sort syntax. */
export class MongoSortClauseInterpreter<Model extends DatabaseModel> {
  constructor(private readonly _sort: SortClause<Model> | undefined) {}

  toMongoSort(): Sort | undefined {
    if (this._sort == null) {
      return undefined;
    }

    return [this._sort.by, this._sort.direction];
  }
}
