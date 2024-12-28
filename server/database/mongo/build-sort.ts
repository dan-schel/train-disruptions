import { Sort } from "mongodb";
import { Sorting } from "../general/query-types";
import { DatabaseModel } from "../general/database-model";

/** Convert sorting options into MongoDB's syntax. */
export function buildSort<Model extends DatabaseModel>(
  sort: Sorting<Model> | undefined,
): Sort | undefined {
  if (sort == null) {
    return undefined;
  }

  // TODO: [DS] Need the assert here. `keyof SerializedObject` is always a
  // string, but Typescript isn't smart enough to know.
  return [sort.by as string, sort.direction];
}
