import { SerializedObject } from "./serialized-types";

/** Typescript magic to extract the Id type used by a DatabaseModel. */
export type IdOf<T extends DatabaseModel> =
  T extends DatabaseModel<infer Id, object, SerializedObject> ? Id : never;

/** Typescript magic to extract the Data type used by a DatabaseModel. */
export type DataOf<T extends DatabaseModel> =
  T extends DatabaseModel<string | number, infer Data, SerializedObject>
    ? Data
    : never;

/** Typescript magic to extract the SerializedData type used by a DatabaseModel. */
export type SerializedDataOf<T extends DatabaseModel> =
  T extends DatabaseModel<string | number, object, infer SerializedData>
    ? SerializedData
    : never;

export abstract class DatabaseModel<
  Id extends string | number = string | number,
  Data extends object = object,
  SerializedData extends SerializedObject = SerializedObject,
> {
  constructor(readonly name: string) {}

  abstract getId(item: Data): Id;

  abstract serialize(item: Data): SerializedData;
  abstract deserialize(id: Id, item: unknown): Data;
}
