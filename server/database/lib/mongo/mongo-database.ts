import { Db, MongoClient } from "mongodb";
import { config } from "../../../config";
import { DatabaseModel } from "../general/database-model";
import { Database, Repository } from "../general/database";
import { MongoRepository } from "./mongo-repository";

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

  of<Model extends DatabaseModel>(model: Model): Repository<Model> {
    return new MongoRepository(model, this._db.collection(model.name));
  }
}
