import { env } from "../env";
import { Database } from "./database";
import { InMemoryDatabase } from "./in-memory/in-memory-database";
import { MongoDatabase } from "./mongo/mongo-database";

export async function initDatabase(): Promise<Database> {
  if (env.DATABASE_URL != null) {
    return await MongoDatabase.init(env.DATABASE_URL);
  } else {
    // TODO: Log a warning that MongoDB is not setup.
    return new InMemoryDatabase();
  }
}
