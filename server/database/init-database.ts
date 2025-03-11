import { env } from "@/server/env";
import { Database } from "@/server/database/lib/general/database";
import { InMemoryDatabase } from "@/server/database/lib/in-memory/in-memory-database";
import { MongoDatabase } from "@/server/database/lib/mongo/mongo-database";

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
