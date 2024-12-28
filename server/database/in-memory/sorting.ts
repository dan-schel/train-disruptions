import { DatabaseModel } from "../general/database-model";
import { Sorting } from "../general/query-types";
import { InMemoryDatabaseItem } from "./in-memory-database-collection";

export function getItemSorter(sort: Sorting<DatabaseModel>) {
  return (a: InMemoryDatabaseItem, b: InMemoryDatabaseItem) => {
    const valueA = a[sort.by];
    const valueB = b[sort.by];
    if (typeof valueA === "number" && typeof valueB === "number") {
      return valueA - valueB;
    }
    if (valueA instanceof Date && valueB instanceof Date) {
      return valueA.getTime() - valueB.getTime();
    }
    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB);
    }
    return 0;
  };
}
