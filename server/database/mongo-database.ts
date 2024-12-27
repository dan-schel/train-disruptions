import { Db, Filter, MongoClient, ObjectId, Sort, Document } from "mongodb";
import { CountQuery, Database, FindQuery, SortInstructions } from "./database";
import { config } from "../config";
import { DatabaseModel } from "./database-model";

export class MongoDatabase extends Database {
  private readonly _db: Db;

  private constructor(private _client: MongoClient) {
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

  async find<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    query: FindQuery,
  ): Promise<DataType[]> {
    const result = await this._db
      .collection(model.name)
      .find(this._toMongoFilter(query.where), {
        sort: this._toMongoSort(query.sort),
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
      .countDocuments(this._toMongoFilter(query.where));
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
    // TODO: [DS] We override how the model is serialized because MongoDB uses
    // _id for ids. Is there a better way?
    return {
      ...model.serialize(item),
      _id: new ObjectId(model.getId(item)),
    };
  }

  private _toMongoFilter(where: object | undefined): Filter<Document> {
    // TODO: [DS] This is not very strict, but maybe that's ok.
    return where ?? {};
  }
  private _toMongoSort(sort: SortInstructions | undefined): Sort | undefined {
    // TODO: [DS] Implement this!
  }
}
