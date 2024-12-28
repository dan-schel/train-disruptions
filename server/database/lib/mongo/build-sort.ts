import { Sort } from "mongodb";
import { SortClause } from "../general/query-types";
import { DatabaseModel } from "../general/database-model";

/** Convert the SortClause into MongoDB's sorting syntax. */
export function buildSort<Model extends DatabaseModel>(
  sort: SortClause<Model> | undefined,
): Sort | undefined {
  if (sort == null) {
    return undefined;
  }

  return [sort.by, sort.direction];
}
