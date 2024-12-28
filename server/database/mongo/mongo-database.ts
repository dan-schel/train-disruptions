import { Db, MongoClient, ObjectId } from "mongodb";
import { config } from "../../config";
import { DatabaseModel } from "../database-model";
import { Database } from "../database";
import { CountQuery, FindQuery } from "../query-types";
import { buildFilter } from "./build-filter";
import { buildSort } from "./build-sort";

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
    const result = await this._db
      .collection(model.name)
      .findOne({ _id: new ObjectId(id) });

    if (result == null) {
      return null;
    }

    return model.deserialize(result);
  }

  async first<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    query: FindQuery,
  ): Promise<DataType | null> {
    const result = await this._db
      .collection(model.name)
      .findOne(buildFilter(query.where));

    if (result == null) {
      return null;
    }

    return model.deserialize(result);
  }

  async find<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    query: FindQuery,
  ): Promise<DataType[]> {
    const result = await this._db
      .collection(model.name)
      .find(buildFilter(query.where), {
        sort: buildSort(query.sort),
        limit: query.limit,
      })
      .toArray();

    return result.map((item) => model.deserialize(item));
  }

  async count(
    model: DatabaseModel<string | number, object>,
    query: CountQuery,
  ): Promise<number> {
    return await this._db
      .collection(model.name)
      .countDocuments(buildFilter(query.where));
  }

  async create<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    item: DataType,
  ): Promise<void> {
    await this._db
      .collection(model.name)
      .insertOne(this._serialize(model, item));
  }

  async update<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    item: DataType,
  ): Promise<void> {
    await this._db
      .collection(model.name)
      .updateOne(
        { _id: new ObjectId(model.getId(item)) },
        this._serialize(model, item),
      );
  }

  async delete<IdType extends string | number>(
    model: DatabaseModel<IdType, object>,
    id: IdType,
  ): Promise<void> {
    await this._db.collection(model.name).deleteOne({ _id: new ObjectId(id) });
  }

  private _serialize<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    item: DataType,
  ) {
    return {
      ...model.serialize(item),
      _id: new ObjectId(model.getId(item)),
    };
  }
}
