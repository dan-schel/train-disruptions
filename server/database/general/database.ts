import { DatabaseModel, SerializedObject } from "./database-model";
import { CountQuery, FindQuery, FirstQuery } from "./query-types";

export abstract class Database {
  abstract of<
    Id extends string | number,
    Data extends object,
    SerializedData extends SerializedObject,
  >(
    model: DatabaseModel<Id, Data, SerializedData>,
  ): ModelResolver<Id, Data, SerializedData>;
}

export abstract class ModelResolver<
  Id extends string | number,
  Data extends object,
  SerializedData extends SerializedObject,
> {
  constructor(
    protected readonly _model: DatabaseModel<Id, Data, SerializedData>,
  ) {}

  /** Returns the record with the given id or null. */
  abstract get(id: Id): Promise<Data | null>;

  /** Returns all records matching the query. */
  abstract find(query: FindQuery<SerializedData>): Promise<Data[]>;

  /** Returns the first record matching the query. */
  abstract first(query: FirstQuery<SerializedData>): Promise<Data | null>;

  /** Returns the number of records which the query. */
  abstract count(query: CountQuery<SerializedData>): Promise<number>;

  /** Creates a new record with the given value. */
  abstract create(item: Data): Promise<void>;

  /** Replaces the record with the same id with the given value. */
  abstract update(item: Data): Promise<void>;

  /** Deletes the record. */
  abstract delete(id: Id): Promise<void>;

  /** Returns the record with the given id or throws if not found. */
  async require(id: Id): Promise<Data> {
    const item = await this.get(id);
    if (item == null) {
      throw new Error(`No item with ID="${id}" in "${this._model.name}".`);
    }
    return item;
  }

  /** Returns the record with the given id or throws if not found. */
  async requireFirst(query: FindQuery<SerializedData>): Promise<Data> {
    const item = await this.first(query);
    if (item == null) {
      throw new Error(`No matching items found in "${this._model.name}".`);
    }
    return item;
  }

  /** Returns the record matching the query or throws if zero/multiple match. */
  async requireSingle(query: FindQuery<SerializedData>): Promise<Data> {
    const items = await this.find(query);
    if (items.length !== 1) {
      throw new Error(
        `${items.length} items in "${this._model.name}" matched. Expected 1.`,
      );
    }
    return items[0];
  }
}
