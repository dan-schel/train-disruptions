import { DatabaseModel } from "../general/database-model";
import { SortClause } from "../general/query-types";
import { InMemoryDatabaseItem } from "./in-memory-database-collection";

/** Returns a sorting function based on the sort clause given. */
export function getItemSorter(sort: SortClause<DatabaseModel>) {
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
