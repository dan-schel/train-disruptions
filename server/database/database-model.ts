import { FindQuery } from "./database";

export abstract class DatabaseModel<
  IdType extends string | number,
  DataType extends object,
> {
  constructor(readonly name: string) {}

  abstract getErrorForRequire(id: IdType): Error;
  abstract getErrorForFindSingle(query: FindQuery): Error;

  abstract getId(item: DataType): IdType;

  abstract serialize(item: DataType): object;
  abstract deserialize(item: object): DataType;
}
