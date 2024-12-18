import { config } from "../config";
import { env } from "../env";
import { FakeDatabaseConnection, MongoDBConnection } from "./db-connection";
import { FakeDisruptionSource, VtarDisruptionSource } from "./disruption-source";

export async function runDemos() {
  try {
    const db = await setupDb();
    await db.saveDisruption("Hello world!");
  } catch (error) {
    console.warn("🔴 Failed to set up database connection.");
    console.warn(error);
  }

  try {
    const disruptionSource = setupDisruptionSource();
    await disruptionSource.fetchDisruptions();
  } catch (error) {
    console.warn("🔴 Failed to fetch disruptions.");
    console.warn(error);
  }
}

async function setupDb() {
  if (env.DATABASE_URL != null) {
    return await MongoDBConnection.init(env.DATABASE_URL);
  } else {
    return new FakeDatabaseConnection();
  }
}

function setupDisruptionSource() {
  if (env.RELAY_KEY != null) {
    return new VtarDisruptionSource(config.VTAR_ENDPOINT_URL, env.RELAY_KEY);
  } else {
    return new FakeDisruptionSource();
  }
}
