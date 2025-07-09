import { env } from "@/server/entry-point/env";
import { Database, InMemoryDatabase, MongoDatabase } from "@dan-schel/db";
import { config } from "@/server/entry-point/config";
import { MongoClient } from "mongodb";

/**
 * Ideally returns a MongoDatabase, but falls back to an InMemoryDatabase if
 * env.DATABASE_URL is not set.
 */
export async function initDatabase(): Promise<Database> {
  if (env.DATABASE_URL != null) {
    const client = new MongoClient(env.DATABASE_URL);
    await client.connect();
    return new MongoDatabase(client, config.DATABASE_NAME);
  } else {
    return new InMemoryDatabase();
  }
}
