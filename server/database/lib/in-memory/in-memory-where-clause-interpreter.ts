import { DatabaseModel } from "../general/database-model";
import {
  WhereClause,
  FieldConstraint,
  EqualOrNot,
  Comparison,
} from "../general/where-clause";
import { InMemoryDatabaseItem } from "./in-memory-database-collection";

/** Determines whether items match the provided WhereClause. */
export class InMemoryWhereClauseInterpreter<Model extends DatabaseModel> {
  constructor(private readonly _where: WhereClause<Model> | undefined) {}

  matches(item: InMemoryDatabaseItem): boolean {
    if (this._where == null) {
      return true;
    }

    return Object.entries(this._where).every(([field, constraint]) => {
      const value = item[field];
      return InMemoryWhereClauseInterpreter._isMatchingField(
        constraint!,
        value,
      );
    });
  }

  private static _isMatchingField(field: FieldConstraint, value: unknown) {
    // TODO: [DS] This sucks.
    if (
      field != null &&
      typeof field === "object" &&
      !(field instanceof Date)
    ) {
      if ("length" in field) {
        if (!Array.isArray(value)) {
          return false;
        }
        return InMemoryWhereClauseInterpreter._isMatchingComparison(
          field.length,
          value.length,
        );
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
        return InMemoryWhereClauseInterpreter._isMatchingComparison(
          field,
          value,
        );
      }
    } else {
      return InMemoryWhereClauseInterpreter._isMatchingComparison(field, value);
    }
  }

  private static _isMatchingComparison(
    comparison: EqualOrNot<string | boolean | null> | Comparison<number | Date>,
    value: unknown,
  ) {
    // TODO: [DS] This sucks.
    if (comparison instanceof Date) {
      return value instanceof Date && value.getTime() === comparison.getTime();
    } else if (comparison == null || typeof comparison !== "object") {
      return value === comparison;
    } else if ("not" in comparison) {
      if (comparison.not instanceof Date) {
        return !(
          value instanceof Date && value.getTime() === comparison.not.getTime()
        );
      } else {
        return value !== comparison.not;
      }
    } else {
      if (typeof value !== "number" && !(value instanceof Date)) {
        return false;
      }

      if ("gt" in comparison && !(value > comparison.gt!)) {
        return false;
      }
      if ("gte" in comparison && !(value >= comparison.gte!)) {
        return false;
      }
      if ("lt" in comparison && !(value < comparison.lt!)) {
        return false;
      }
      if ("lte" in comparison && !(value <= comparison.lte!)) {
        return false;
      }
      return true;
    }
  }
}
