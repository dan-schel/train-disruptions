import { DatabaseModel, DataOf, IdOf } from "./database-model";
import { CountQuery, FindQuery, FirstQuery } from "./query-types";

export abstract class Database {
  abstract of<Model extends DatabaseModel>(model: Model): ModelResolver<Model>;
}

export abstract class ModelResolver<Model extends DatabaseModel> {
  constructor(protected readonly _model: Model) {}

  /** Returns the record with the given id or null. */
  abstract get(id: IdOf<Model>): Promise<DataOf<Model> | null>;

  /** Returns all records matching the query. */
  abstract find(query: FindQuery<Model>): Promise<DataOf<Model>[]>;

  /** Returns the first record matching the query. */
  abstract first(query: FirstQuery<Model>): Promise<DataOf<Model> | null>;

  /** Returns the number of records which the query. */
  abstract count(query: CountQuery<Model>): Promise<number>;

  /** Creates a new record with the given value. */
  abstract create(item: DataOf<Model>): Promise<void>;

  /** Replaces the record with the same id with the given value. */
  abstract update(item: DataOf<Model>): Promise<void>;

  /** Deletes the record. */
  abstract delete(id: IdOf<Model>): Promise<void>;

  /** Returns the record with the given id or throws if not found. */
  async require(id: IdOf<Model>): Promise<DataOf<Model>> {
    const item = await this.get(id);
    if (item == null) {
      throw new Error(`No item with ID="${id}" in "${this._model.name}".`);
    }
    return item;
  }

  /** Returns the record with the given id or throws if not found. */
  async requireFirst(query: FindQuery<Model>): Promise<DataOf<Model>> {
    const item = await this.first(query);
    if (item == null) {
      throw new Error(`No matching items found in "${this._model.name}".`);
    }
    return item;
  }

  /** Returns the record matching the query or throws if zero/multiple match. */
  async requireSingle(query: FindQuery<Model>): Promise<DataOf<Model>> {
    const items = await this.find(query);
    if (items.length !== 1) {
      throw new Error(
        `${items.length} items in "${this._model.name}" matched. Expected 1.`,
      );
    }
    return items[0];
  }
}
