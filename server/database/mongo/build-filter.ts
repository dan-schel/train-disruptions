import { Filter } from "mongodb";
import {
  FieldMatcher,
  EqualOrNot,
  Comparison,
  FieldConstraint,
} from "../general/query-types";
import { ModelDocument } from "./mongo-model-resolver";
import { DatabaseModel } from "../general/database-model";

/** Convert FieldMatcher queries into MongoDB syntax queries. */
export function buildFilter<Model extends DatabaseModel>(
  where: FieldMatcher<Model> | undefined,
): Filter<ModelDocument> {
  if (where == null) {
    return {};
  }

  const filter: Filter<ModelDocument> = {};
  for (const field in where) {
    const value = where[field]!;
    filter[field] = buildFilterForField(value);
  }
  return filter;
}

function buildFilterForField(field: FieldConstraint) {
  if (field != null && typeof field === "object" && !(field instanceof Date)) {
    if ("length" in field) {
      return { $size: buildFilterForComparison(field.length) };
    } else if ("contains" in field) {
      return { $in: field.contains };
    } else if ("notContains" in field) {
      return { $nin: field.notContains };
    } else {
      return buildFilterForComparison(field);
    }
  } else {
    return buildFilterForComparison(field);
  }
}

function buildFilterForComparison(
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
