import { Filter } from "mongodb";
import { ModelDocument } from "./mongo-repository";
import { DatabaseModel } from "../general/database-model";
import {
  WhereClause,
  FieldConstraint,
  EqualOrNot,
  Comparison,
} from "../general/where-clause";

/** Takes a WhereClause and builds the equivalent filter in MongoDB syntax. */
export class MongoWhereClauseInterpreter<Model extends DatabaseModel> {
  constructor(private readonly _where: WhereClause<Model> | undefined) {}

  toMongoFilter(): Filter<ModelDocument> {
    if (this._where == null) {
      return {};
    }

    const filter: Filter<ModelDocument> = {};
    for (const field in this._where) {
      const value = this._where[field]!;
      filter[field] = MongoWhereClauseInterpreter._buildFilterForField(value);
    }
    return filter;
  }

  private static _buildFilterForField(field: FieldConstraint) {
    if (
      field != null &&
      typeof field === "object" &&
      !(field instanceof Date)
    ) {
      if ("length" in field) {
        return {
          $size: MongoWhereClauseInterpreter._buildFilterForComparison(
            field.length,
          ),
        };
      } else if ("contains" in field) {
        return { $in: field.contains };
      } else if ("notContains" in field) {
        return { $nin: field.notContains };
      } else {
        return MongoWhereClauseInterpreter._buildFilterForComparison(field);
      }
    } else {
      return MongoWhereClauseInterpreter._buildFilterForComparison(field);
    }
  }

  private static _buildFilterForComparison(
    comparison: EqualOrNot<string | boolean | null> | Comparison<number | Date>,
  ) {
    if (
      comparison == null ||
      typeof comparison !== "object" ||
      comparison instanceof Date
    ) {
      return comparison;
    } else if ("not" in comparison) {
      return { $ne: comparison.not };
    } else {
      const result: {
        $gt?: number | Date;
        $gte?: number | Date;
        $lt?: number | Date;
        $lte?: number | Date;
      } = {};

      if ("gt" in comparison) {
        result.$gt = comparison.gt;
      }
      if ("gte" in comparison) {
        result.$gte = comparison.gte;
      }
      if ("lt" in comparison) {
        result.$lt = comparison.lt;
      }
      if ("lte" in comparison) {
        result.$lte = comparison.lte;
      }

      return result;
    }
  }
}
