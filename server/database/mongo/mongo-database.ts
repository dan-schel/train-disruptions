import { Db, MongoClient } from "mongodb";
import { config } from "../../config";
import { DatabaseModel, SerializedObject } from "../general/database-model";
import { Database, ModelResolver } from "../general/database";
import { MongoModelResolver } from "./mongo-model-resolver";

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

  of<
    IdType extends string | number,
    DataType extends object,
    SerializedData extends SerializedObject,
  >(
    model: DatabaseModel<IdType, DataType, SerializedData>,
  ): ModelResolver<IdType, DataType, SerializedData> {
    return new MongoModelResolver(model, this._db.collection(model.name));
  }
}
