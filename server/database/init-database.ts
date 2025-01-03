import { env } from "../env";
import { Database } from "./lib/general/database";
import { InMemoryDatabase } from "./lib/in-memory/in-memory-database";
import { MongoDatabase } from "./lib/mongo/mongo-database";

/**
 * Ideally returns a MongoDatabase, but falls back to an InMemoryDatabase if
 * env.DATABASE_URL is not set.
 */
export async function initDatabase(): Promise<Database> {
  if (env.DATABASE_URL != null) {
    return await MongoDatabase.init(env.DATABASE_URL);
  } else {
    return new InMemoryDatabase();
  }
}
