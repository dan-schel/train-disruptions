import { Db, MongoClient } from "mongodb";
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

  private constructor(client: MongoClient, databaseName: string) {
    super();
    this._db = client.db(databaseName);
  }

  static async init(
    connectionString: string,
    databaseName: string,
  ): Promise<MongoDatabase> {
    const client = new MongoClient(connectionString);
    await client.connect();
    return new MongoDatabase(client, databaseName);
  }

  of<Model extends DatabaseModel>(model: Model): Repository<Model> {
    return new MongoRepository(model, this._db.collection(model.name));
  }

  protected getMigrationHandler(): MigrationHandler {
    return new MongoMigrationHandler(this._db);
  }
}
