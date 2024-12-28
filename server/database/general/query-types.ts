import { SerializedObject } from "./database-model";

/** Typescript magic to force either gt or gte to be defined but never both. */
type GreaterThan<T, Equals extends boolean> = Equals extends true
  ? { gte?: T; gt?: never }
  : { gt?: T; gte?: never };

/** Typescript magic to force either lt or lte to be defined but never both. */
type LessThan<T, Equals extends boolean> = Equals extends true
  ? { lte?: T; lt?: never }
  : { lt?: T; lte?: never };

export type EqualOrNot<T> = T | { not: T };

/** Can choose an exact value or gt/lt (greater/less than). */
export type Comparison<T> =
  | EqualOrNot<T>
  | (GreaterThan<T, boolean> & LessThan<T, boolean>);

export type FieldConstraint =
  | EqualOrNot<string | boolean | null>
  | Comparison<number | Date>
  | { length: Comparison<number> }
  | { contains: string | number }
  | { notContains: string | number };

/** Can match any field (but not nested structures). */
export type FieldMatcher<SerializedData extends SerializedObject> = {
  [field in keyof SerializedData]?: FieldConstraint;
};

/** Arguments to a "find"/select query. */
export type FindQuery<SerializedData extends SerializedObject> = {
  where?: FieldMatcher<SerializedData>;
  sort?: Sorting<SerializedData>;
  limit?: number;
};

/** Arguments to a first query (like "find" but limits are useless). */
export type FirstQuery<SerializedData extends SerializedObject> = {
  where?: FieldMatcher<SerializedData>;
};

/** Arguments to a count query (like "find" but limits/sorting are useless). */
export type CountQuery<SerializedData extends SerializedObject> = {
  where?: FieldMatcher<SerializedData>;
};

/** Can sort any field by ascending/descending (but not nested structures). */
export type Sorting<SerializedData extends SerializedObject> = {
  by: keyof SerializedData;
  direction: "asc" | "desc";
};
