import { App } from "@/server/app";
import { lines } from "@/server/data/static/lines";
import { stations } from "@/server/data/static/stations";
import { InMemoryDatabase } from "@/server/database/lib/in-memory/in-memory-database";
import { FakeDisruptionSource } from "@/server/disruption-source/fake-disruption-source";
import { FixedTimeProvider } from "@/server/time-provider";

export function createTestApp() {
  const db = new InMemoryDatabase();
  const disruptionSource = new FakeDisruptionSource();
  const time = new FixedTimeProvider(new Date("2025-01-01T00:00:00Z"));

  const app = new App(lines, stations, db, disruptionSource, null, time, null);

  return { app, db, disruptionSource, time };
}
