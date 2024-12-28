import { Repository } from "../general/database";
import { DatabaseModel, DataOf, IdOf } from "../general/database-model";
import { FindQuery, FirstQuery, CountQuery } from "../general/query-types";
import {
  InMemoryDatabaseCollection,
  InMemoryDatabaseItem,
} from "./in-memory-database-collection";
import { InMemoryWhereClauseInterpreter } from "./in-memory-where-clause-interpreter";
import { getItemSorter } from "./sorting";

export class InMemoryRepository<
  Model extends DatabaseModel,
> extends Repository<Model> {
  constructor(
    model: Model,
    private readonly _collection: InMemoryDatabaseCollection,
  ) {
    super(model);
  }

  async get(id: IdOf<Model>): Promise<DataOf<Model> | null> {
    const item = this._collection.get(id);
    if (item === null) {
      return null;
    }
    return this._deserialize(item);
  }

  async find(query: FindQuery<Model>): Promise<DataOf<Model>[]> {
    const filter = new InMemoryWhereClauseInterpreter(query.where);

    let items = this._collection.find((item) => filter.matches(item));
    if (query.sort != null) {
      items.sort(getItemSorter(query.sort));
    }
    if (query.limit != null) {
      items = items.slice(0, query.limit);
    }

    return items.map((item) => this._deserialize(item));
  }

  async first(query: FirstQuery<Model>): Promise<DataOf<Model> | null> {
    const filter = new InMemoryWhereClauseInterpreter(query.where);

    const item = this._collection.first((item) => filter.matches(item));
    if (item === null) {
      return null;
    }

    return this._deserialize(item);
  }

  async count(query: CountQuery<Model>): Promise<number> {
    const filter = new InMemoryWhereClauseInterpreter(query.where);
    return this._collection.count((item) => filter.matches(item));
  }

  async create(item: DataOf<Model>): Promise<void> {
    this._collection.create(this._serialize(item));
  }

  async update(item: DataOf<Model>): Promise<void> {
    this._collection.update(this._serialize(item));
  }

  async delete(id: IdOf<Model>): Promise<void> {
    this._collection.delete(id);
  }

  private _serialize(item: DataOf<Model>): InMemoryDatabaseItem {
    return {
      ...this._model.serialize(item),
      id: this._model.getId(item),
    };
  }

  private _deserialize(item: InMemoryDatabaseItem): DataOf<Model> {
    // TODO: [DS] Can we avoid this type assertion?
    return this._model.deserialize(item.id, item) as DataOf<Model>;
  }
}
