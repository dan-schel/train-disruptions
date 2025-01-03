import { uuid } from "@dan-schel/js-utils";
import { config } from "../config";
import { initDatabase } from "../database/init-database";
import { InMemoryDatabase } from "../database/lib/in-memory/in-memory-database";
import { Crayon } from "../database/models/crayons";
import { CRAYONS } from "../database/models/models";
import { env } from "../env";
import {
  FakeDisruptionSource,
  VtarDisruptionSource,
} from "./disruption-source";

export async function runDemos() {
  try {
    const disruptionSource = setupDisruptionSource();
    await disruptionSource.fetchDisruptions();
  } catch (error) {
    console.warn("🔴 Failed to fetch disruptions.");
    console.warn(error);
  }

  try {
    const db = await initDatabase();
    await db.of(CRAYONS).create(new Crayon(uuid(), "red", 100, []));
    if (db instanceof InMemoryDatabase) {
      console.warn("🟡 Database connection not set up yet.");
    } else {
      // eslint-disable-next-line no-console
      console.log("🟢 Successfully connected to the database.");
    }
  } catch (error) {
    console.warn("🔴 Failed to connect to the database.");
    console.warn(error);
  }
}

function setupDisruptionSource() {
  if (env.RELAY_KEY != null) {
    return new VtarDisruptionSource(config.VTAR_ENDPOINT_URL, env.RELAY_KEY);
  } else {
    return new FakeDisruptionSource();
  }
}
