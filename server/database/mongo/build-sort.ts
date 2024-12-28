import { Sort } from "mongodb";
import { Sorting } from "../general/query-types";
import { SerializedObject } from "../general/database-model";

export function buildSort<SerializedData extends SerializedObject>(
  sort: Sorting<SerializedData> | undefined,
): Sort | undefined {
  if (sort == null) {
    return undefined;
  }

  // TODO: [DS] Need the assert here. `keyof SerializedObject` is always a
  // string, but Typescript isn't smart enough to know.
  return [sort.by as string, sort.direction];
}
