import { FakeAlertSource } from "@/server/alert-source/fake-alert-source";
import { App } from "@/server/app";
import { InMemoryDatabase } from "@/server/database/lib/in-memory/in-memory-database";
import { lines } from "@/server/entry-point/data/lines";
import { stations } from "@/server/entry-point/data/stations";
import { FakeTimeProvider } from "@/server/time-provider/fake-time-provider";

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
    null,
    time,
    null,
    null,
    null,
  );

  return { app, db, alertSource, time };
}
