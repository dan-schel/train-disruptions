import { Collection, Db, MongoClient } from "mongodb";
import { config } from "../../config";
import { DatabaseModel } from "../database-model";
import { Database } from "../database";
import { CountQuery, FindQuery, FirstQuery } from "../query-types";
import { buildFilter } from "./build-filter";
import { buildSort } from "./build-sort";

export type ModelDocument = { _id: string | number } & object;

export class MongoDatabase extends Database {
  private readonly _db: Db;

  private constructor(_client: MongoClient) {
    super();
    this._db = _client.db(config.DATABASE_NAME);
  }

  static async init(connectionString: string): Promise<MongoDatabase> {
    const client = new MongoClient(connectionString);
    await client.connect();
    return new MongoDatabase(client);
  }

  async get<IdType extends string | number, DataType extends object>(
    model: DatabaseModel<IdType, DataType>,
    id: IdType,
  ): Promise<DataType | null> {
    const result = await this._getCollection(model).findOne({
      _id: id,
    });

    if (result == null) {
      return null;
    }

    // TODO: Avoid the "as".
    return model.deserialize(result._id as IdType, result);
  }

  async first<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    query: FirstQuery,
  ): Promise<DataType | null> {
    const result = await this._getCollection(model).findOne(
      buildFilter(query.where),
    );

    if (result == null) {
      return null;
    }

    return model.deserialize(result._id, result);
  }

  async find<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    query: FindQuery,
  ): Promise<DataType[]> {
    const result = await this._getCollection(model)
      .find(buildFilter(query.where), {
        sort: buildSort(query.sort),
        limit: query.limit,
      })
      .toArray();

    return result.map((item) => model.deserialize(item._id, item));
  }

  async count(
    model: DatabaseModel<string | number, object>,
    query: CountQuery,
  ): Promise<number> {
    return await this._getCollection(model).countDocuments(
      buildFilter(query.where),
    );
  }

  async create<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    item: DataType,
  ): Promise<void> {
    await this._getCollection(model).insertOne(this._serialize(model, item));
  }

  async update<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    item: DataType,
  ): Promise<void> {
    await this._getCollection(model).updateOne(
      { _id: model.getId(item) },
      this._serialize(model, item),
    );
  }

  async delete<IdType extends string | number>(
    model: DatabaseModel<IdType, object>,
    id: IdType,
  ): Promise<void> {
    await this._getCollection(model).deleteOne({ _id: id });
  }

  private _getCollection(
    model: DatabaseModel<string | number, object>,
  ): Collection<ModelDocument> {
    return this._db.collection<ModelDocument>(model.name);
  }

  private _serialize<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    item: DataType,
  ): ModelDocument {
    return {
      ...model.serialize(item),
      _id: model.getId(item),
    };
  }
}
