import { DatabaseModel, SerializedDataOf } from "./database-model";

/** Can match any field (but not nested structures). */
export type WhereClause<Model extends DatabaseModel> = {
  [field in keyof SerializedDataOf<Model>]?: FieldConstraint;
};

/** All supported queries on a field. */
export type FieldConstraint =
  | EqualOrNot<string | boolean | null>
  | Comparison<number | Date>
  | { length: Comparison<number> }
  | { contains: string | number }
  | { notContains: string | number };

export type EqualOrNot<T> = T | { not: T };

/** Can choose an exact value or gt/lt (greater/less than). */
export type Comparison<T> =
  | EqualOrNot<T>
  | (GreaterThan<T, boolean> & LessThan<T, boolean>);

/** Typescript magic to force either `gt` or `gte` to be defined but never both. */
type GreaterThan<T, Equals extends boolean> = Equals extends true
  ? { gte?: T; gt?: never }
  : { gt?: T; gte?: never };

/** Typescript magic to force either `lt` or `lte` to be defined but never both. */
type LessThan<T, Equals extends boolean> = Equals extends true
  ? { lte?: T; lt?: never }
  : { lt?: T; lte?: never };