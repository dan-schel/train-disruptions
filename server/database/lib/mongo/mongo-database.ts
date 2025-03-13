import { Db, MongoClient } from "mongodb";
import { config } from "@/server/config";
import { DatabaseModel } from "@/server/database/lib/general/database-model";
import {
  Database,
  MigrationHandler,
  Repository,
} from "@/server/database/lib/general/database";
import { MongoRepository } from "@/server/database/lib/mongo/mongo-repository";
import { MongoMigrationHandler } from "@/server/database/lib/mongo/mongo-migration-handler";

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

  protected getMigrationHandler(): MigrationHandler {
    return new MongoMigrationHandler(this._db);
  }
}
