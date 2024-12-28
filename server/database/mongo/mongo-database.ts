import { Db, MongoClient } from "mongodb";
import { config } from "../../config";
import { DatabaseModel } from "../database-model";
import { Database, ModelResolver } from "../database";
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

  of<IdType extends string | number, DataType extends object>(
    model: DatabaseModel<IdType, DataType>,
  ): ModelResolver<IdType, DataType> {
    return new MongoModelResolver(model, this._db.collection(model.name));
  }
}
