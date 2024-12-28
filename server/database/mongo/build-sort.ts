import { Sort } from "mongodb";
import { Sorting } from "../query-types";

export function buildSort(sort: Sorting | undefined): Sort | undefined {
  if (sort == null) {
    return undefined;
  }

  return [sort.by, sort.direction];
}
