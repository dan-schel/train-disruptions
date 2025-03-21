import { Repository } from "@/server/database/lib/general/database";
import {
  DatabaseModel,
  DataOf,
  IdOf,
} from "@/server/database/lib/general/database-model";
import {
  FindQuery,
  FirstQuery,
  CountQuery,
} from "@/server/database/lib/general/query-types";
import {
  InMemoryDatabaseCollection,
  InMemoryDatabaseItem,
} from "@/server/database/lib/in-memory/in-memory-database-collection";
import { InMemorySortClauseInterpreter } from "@/server/database/lib/in-memory/in-memory-sort-clause-interpreter";
import { InMemoryWhereClauseInterpreter } from "@/server/database/lib/in-memory/in-memory-where-clause-interpreter";

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
    const sort = new InMemorySortClauseInterpreter(query.sort);

    let items = this._collection.find((item) => filter.matches(item));
    if (sort.requiresSorting()) {
      items.sort(sort.getSortFunction());
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

  async count(query?: CountQuery<Model>): Promise<number> {
    const filter = new InMemoryWhereClauseInterpreter(query?.where);
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
    return this._model.deserialize(item.id, item) as DataOf<Model>;
  }
}
