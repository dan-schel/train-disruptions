import { env } from "@/server/entry-point/env";
import { Database } from "@/server/database/lib/general/database";
import { InMemoryDatabase } from "@/server/database/lib/in-memory/in-memory-database";
import { MongoDatabase } from "@/server/database/lib/mongo/mongo-database";
import { config } from "@/server/entry-point/config";

/**
 * Ideally returns a MongoDatabase, but falls back to an InMemoryDatabase if
 * env.DATABASE_URL is not set.
 */
export async function initDatabase(): Promise<Database> {
  if (env.DATABASE_URL != null) {
    return await MongoDatabase.init(env.DATABASE_URL, config.DATABASE_NAME);
  } else {
    return new InMemoryDatabase();
  }
}
