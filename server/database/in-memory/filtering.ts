import { DatabaseModel } from "../general/database-model";
import {
  FieldMatcher,
  FieldConstraint,
  EqualOrNot,
  Comparison,
} from "../general/query-types";
import { InMemoryDatabaseItem } from "./in-memory-database-collection";

export function isMatchingItem(
  item: InMemoryDatabaseItem,
  where: FieldMatcher<DatabaseModel>,
) {
  return Object.entries(where).every(([field, constraint]) => {
    const value = item[field];
    return isMatchingField(constraint!, value);
  });
}

function isMatchingField(field: FieldConstraint, value: unknown) {
  if (field != null && typeof field === "object" && !(field instanceof Date)) {
    if ("length" in field) {
      if (!Array.isArray(value)) {
        return false;
      }
      return field.length === value.length;
    } else if ("contains" in field) {
      if (!Array.isArray(value)) {
        return false;
      }
      return value.includes(field.contains);
    } else if ("notContains" in field) {
      if (!Array.isArray(value)) {
        return false;
      }
      return !value.includes(field.notContains);
    } else {
      return isMatchingComparison(field, value);
    }
  } else {
    return isMatchingComparison(field, value);
  }
}

function isMatchingComparison(
  comparison: EqualOrNot<string | boolean | null> | Comparison<number | Date>,
  value: unknown,
) {
  if (
    comparison == null ||
    typeof comparison !== "object" ||
    comparison instanceof Date
  ) {
    return value === comparison;
  } else if ("not" in comparison) {
    return value !== comparison.not;
  } else {
    if (typeof value !== "number" && !(value instanceof Date)) {
      return false;
    }

    if ("gt" in comparison && !(value > comparison.gt!)) {
      return false;
    }
    if ("gte" in comparison && !(value >= comparison.gt!)) {
      return false;
    }
    if ("lt" in comparison && !(value < comparison.gt!)) {
      return false;
    }
    if ("lte" in comparison && !(value <= comparison.gt!)) {
      return false;
    }
    return true;
  }
}
