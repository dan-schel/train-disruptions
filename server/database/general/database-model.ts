/** All fields must be primitive data types (or nested arrays/objects). */
export type SerializedObject = {
  // Disallow ID from being serialized, since it's handled by the database
  // implementation itself (using getId() to retrieve it).
  id?: undefined;

  [field: string]: SerializedData;
};

/** Primitive data types (or nested arrays/objects). */
export type SerializedData =
  | undefined
  | string
  | number
  | boolean
  | Date
  | null
  | SerializedObject
  | SerializedData[];

export abstract class DatabaseModel<
  Id extends string | number,
  Data extends object,
  SerializedData extends SerializedObject,
> {
  constructor(readonly name: string) {}

  abstract getId(item: Data): Id;

  abstract serialize(item: Data): SerializedData;
  abstract deserialize(id: Id, item: unknown): Data;
}
