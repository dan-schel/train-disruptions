import { FakeAlertSource } from "@/server/alert-source/fake-alert-source";
import { App } from "@/server/app";
import { InMemoryDatabase } from "@/server/database/lib/in-memory/in-memory-database";
import { startWebServer } from "@/server/entry-point";
import { lines } from "@/server/entry-point/data/lines";
import { stations } from "@/server/entry-point/data/stations";
import { FakeTimeProvider } from "@/server/time-provider/fake-time-provider";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function createTestApp() {
  const db = new InMemoryDatabase();
  const alertSource = new FakeAlertSource();
  const time = new FakeTimeProvider(new Date("2025-01-01T00:00:00Z"));

  const app = new App(
    lines,
    stations,
    db,
    alertSource,
    null,
    time,
    null,
    null,
    null,
  );

  return { app, db, alertSource, time };
}

export async function createTestServer() {
  const { app } = createTestApp();
  const fileName = fileURLToPath(import.meta.url);
  const root = dirname(fileName);

  const server = await startWebServer(app, root);

  return { server, app };
}
