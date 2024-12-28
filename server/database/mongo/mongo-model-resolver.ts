import { Collection, WithId } from "mongodb";
import { ModelResolver } from "../database";
import { DatabaseModel } from "../database-model";
import { FindQuery, FirstQuery, CountQuery } from "../query-types";
import { buildFilter } from "./build-filter";
import { buildSort } from "./build-sort";

export type ModelDocument = {
  _id: string | number;
} & object;

export class MongoModelResolver<
  IdType extends string | number,
  DataType extends object,
> extends ModelResolver<IdType, DataType> {
  constructor(
    model: DatabaseModel<IdType, DataType>,
    private readonly _collection: Collection<ModelDocument>,
  ) {
    super(model);
  }

  async get(id: IdType): Promise<DataType | null> {
    const result = await this._collection.findOne({ _id: id });
    if (result == null) {
      return null;
    }
    return this._deserialize(result);
  }

  async find(query: FindQuery): Promise<DataType[]> {
    const result = await this._collection
      .find(buildFilter(query.where), {
        sort: buildSort(query.sort),
        limit: query.limit,
      })
      .toArray();

    return result.map((item) => this._deserialize(item));
  }

  async first(query: FirstQuery): Promise<DataType | null> {
    const result = await this._collection.findOne(buildFilter(query.where));
    if (result == null) {
      return null;
    }
    return this._deserialize(result);
  }

  async count(query: CountQuery): Promise<number> {
    return await this._collection.countDocuments(buildFilter(query.where));
  }

  async create(item: DataType): Promise<void> {
    await this._collection.insertOne(this._serialize(item));
  }

  async update(item: DataType): Promise<void> {
    await this._collection.updateOne(
      { _id: this._model.getId(item) },
      this._serialize(item),
    );
  }

  async delete(id: IdType): Promise<void> {
    await this._collection.deleteOne({ _id: id });
  }

  private _serialize(item: DataType): ModelDocument {
    return {
      ...this._model.serialize(item),
      _id: this._model.getId(item),
    };
  }

  private _deserialize(item: WithId<ModelDocument>): DataType {
    // This type assertion sucks, but I tried making ModelDocument a generic
    // type which took the IdType and used it for _id, and it something within
    // the mongodb libary didn't like it.
    return this._model.deserialize(item._id as IdType, item);
  }
}
