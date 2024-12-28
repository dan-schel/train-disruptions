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

/** Can match any field (but not nested structures). */
export type FieldMatcher = {
  [field: string]:
    | EqualOrNot<string | boolean | null>
    | Comparison<number | Date>
    | { length: Comparison<number> }
    | { contains: string | number }
    | { notContains: string | number };
};

/** Arguments to a "find"/select query. */
export type FindQuery = {
  where?: FieldMatcher;
  sort?: Sorting;
  limit?: number;
};

/** Arguments to a first query (like "find" but limits are useless). */
export type FirstQuery = {
  where?: FieldMatcher;
};

/** Arguments to a count query (like "find" but limits/sorting are useless). */
export type CountQuery = {
  where?: FieldMatcher;
};

/** Can sort any field by ascending/descending (but not nested structures). */
export type Sorting = {
  by: string;
  direction: "asc" | "desc";
};
