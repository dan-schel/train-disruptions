import { DatabaseModel } from "./database-model";
import { CountQuery, FindQuery, FirstQuery } from "./query-types";

export abstract class Database {
  abstract of<IdType extends string | number, DataType extends object>(
    model: DatabaseModel<IdType, DataType>,
  ): ModelResolver<IdType, DataType>;
}

export abstract class ModelResolver<
  IdType extends string | number,
  DataType extends object,
> {
  constructor(protected readonly _model: DatabaseModel<IdType, DataType>) {}

  /** Returns the record with the given id or null. */
  abstract get(id: IdType): Promise<DataType | null>;

  /** Returns all records matching the query. */
  abstract find(query: FindQuery): Promise<DataType[]>;

  /** Returns the first record matching the query. */
  abstract first(query: FirstQuery): Promise<DataType | null>;

  /** Returns the number of records which the query. */
  abstract count(query: CountQuery): Promise<number>;

  /** Creates a new record with the given value. */
  abstract create(item: DataType): Promise<void>;

  /** Replaces the record with the same id with the given value. */
  abstract update(item: DataType): Promise<void>;

  /** Deletes the record. */
  abstract delete(id: IdType): Promise<void>;

  /** Returns the record with the given id or throws if not found. */
  async require(id: IdType): Promise<DataType> {
    const item = await this.get(id);
    if (item == null) {
      throw this._model.getErrorForRequire(id);
    }
    return item;
  }

  /** Returns the record with the given id or throws if not found. */
  async requireFirst(query: FindQuery): Promise<DataType> {
    const item = await this.first(query);
    if (item == null) {
      throw this._model.getErrorForRequireFirst(query);
    }
    return item;
  }

  /** Returns the record matching the query or throws if zero/multiple match. */
  async requireSingle(query: FindQuery): Promise<DataType> {
    const items = await this.find(query);
    if (items.length !== 1) {
      throw this._model.getErrorForRequireSingle(query, items.length);
    }
    return items[0];
  }
}
