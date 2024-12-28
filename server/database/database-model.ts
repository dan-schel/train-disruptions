import { FindQuery } from "./query-types";

/** All fields must be primitive data types (or nested arrays/objects). */
export type SerializedObject = {
  [field: string]: SerializedData;
};

/** Primitive data types (or nested arrays/objects). */
export type SerializedData =
  | string
  | number
  | boolean
  | Date
  | null
  | SerializedObject
  | SerializedData[];

export abstract class DatabaseModel<
  IdType extends string | number,
  DataType extends object,
> {
  constructor(readonly name: string) {}

  abstract getId(item: DataType): IdType;

  abstract serialize(item: DataType): SerializedObject;
  abstract deserialize(item: SerializedObject): DataType;

  abstract getErrorForRequire(id: IdType): Error;
  abstract getErrorForRequireFirst(query: FindQuery): Error;
  abstract getErrorForRequireSingle(query: FindQuery, count: number): Error;
}
