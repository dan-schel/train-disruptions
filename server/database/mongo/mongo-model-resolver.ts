import { Collection, WithId } from "mongodb";
import { ModelResolver } from "../general/database";
import { DatabaseModel, DataOf, IdOf } from "../general/database-model";
import { FindQuery, FirstQuery, CountQuery } from "../general/query-types";
import { buildFilter } from "./build-filter";
import { buildSort } from "./build-sort";

export type ModelDocument = {
  _id: string | number;
} & object;

export class MongoModelResolver<
  Model extends DatabaseModel,
> extends ModelResolver<Model> {
  constructor(
    model: Model,
    private readonly _collection: Collection<ModelDocument>,
  ) {
    super(model);
  }

  async get(id: IdOf<Model>): Promise<DataOf<Model> | null> {
    const result = await this._collection.findOne({ _id: id });
    if (result == null) {
      return null;
    }
    return this._deserialize(result);
  }

  async find(query: FindQuery<Model>): Promise<DataOf<Model>[]> {
    const result = await this._collection
      .find(buildFilter(query.where), {
        sort: buildSort(query.sort),
        limit: query.limit,
      })
      .toArray();

    return result.map((item) => this._deserialize(item));
  }

  async first(query: FirstQuery<Model>): Promise<DataOf<Model> | null> {
    const result = await this._collection.findOne(buildFilter(query.where));
    if (result == null) {
      return null;
    }
    return this._deserialize(result);
  }

  async count(query: CountQuery<Model>): Promise<number> {
    return await this._collection.countDocuments(buildFilter(query.where));
  }

  async create(item: DataOf<Model>): Promise<void> {
    await this._collection.insertOne(this._serialize(item));
  }

  async update(item: DataOf<Model>): Promise<void> {
    await this._collection.updateOne(
      { _id: this._model.getId(item) },
      this._serialize(item),
    );
  }

  async delete(id: IdOf<Model>): Promise<void> {
    await this._collection.deleteOne({ _id: id });
  }

  private _serialize(item: DataOf<Model>): ModelDocument {
    return {
      ...this._model.serialize(item),
      _id: this._model.getId(item),
    };
  }

  private _deserialize(item: WithId<ModelDocument>): DataOf<Model> {
    // TODO: [DS] Can we avoid this type assertion?
    return this._model.deserialize(item._id, item) as DataOf<Model>;
  }
}
