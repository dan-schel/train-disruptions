import { DatabaseModel } from "./database-model";
import { CountQuery, FindQuery } from "./query-types";

export abstract class Database {
  /** Returns the record with the given id or null. */
  abstract get<IdType extends string | number, DataType extends object>(
    model: DatabaseModel<IdType, DataType>,
    id: IdType,
  ): Promise<DataType | null>;

  /** Returns all records matching the query. */
  abstract find<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    query: FindQuery,
  ): Promise<DataType[]>;

  /** Returns the number of records which the query. */
  abstract count(
    model: DatabaseModel<string | number, object>,
    query: CountQuery,
  ): Promise<number>;

  /** Creates a new record with the given value. */
  abstract create<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    item: DataType,
  ): Promise<void>;

  /** Replaces the record with the same id with the given value. */
  abstract update<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    item: DataType,
  ): Promise<void>;

  /** Deletes the record. */
  abstract delete<IdType extends string | number>(
    model: DatabaseModel<IdType, object>,
    id: IdType,
  ): Promise<void>;

  /** Returns the record with the given id or throws if not found. */
  async require<IdType extends string | number, DataType extends object>(
    model: DatabaseModel<IdType, DataType>,
    id: IdType,
  ): Promise<DataType> {
    const item = await this.get(model, id);
    if (item == null) {
      throw model.getErrorForRequire(id);
    }
    return item;
  }

  /** Returns the record matching the query or throws if zero/multiple match. */
  async findSingle<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    query: FindQuery,
  ): Promise<DataType> {
    const items = await this.find(model, query);
    if (items.length !== 1) {
      throw model.getErrorForFindSingle(query);
    }
    return items[0];
  }
}
