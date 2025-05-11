import { Alert } from "@/server/data/alert";
import { ALERTS, DISRUPTIONS } from "@/server/database/models/models";
import { AutoParseDisruptionsTask } from "@/server/task/tasks/auto-parse-disruptions-task";
import { SampleAlerts } from "@/tests/server/parser/sample-alerts";
import { createTestApp } from "@/tests/server/utils";
import { describe, expect, it } from "vitest";

describe("AutoParseDisruptionsTask", () => {
  const { BusReplacements, Delays, Ignored } = SampleAlerts;
  describe("#execute", () => {
    it("processes new alerts", async () => {
      const { app, db, time } = createTestApp();
      const task = new AutoParseDisruptionsTask();

      for (const alert of Object.values(BusReplacements)) {
        await db.of(ALERTS).create(alert);
      }
      for (const alert of Object.values(Delays)) {
        await db.of(ALERTS).create(alert);
      }
      for (const alert of Object.values(Ignored)) {
        await db.of(ALERTS).create(alert);
      }

      await task.execute(app);

      const disruptions = await db.of(DISRUPTIONS).all();
      expect(disruptions).toHaveLength(
        Object.values(BusReplacements).length + Object.values(Delays).length,
      );

      const expectedAlerts = Object.values(BusReplacements)
        .map((x) => convertToProcessedAlert(x, time.now()))
        .concat(
          Object.values(Delays).map((x) =>
            convertToProcessedAlert(x, time.now()),
          ),
        )
        .concat(Object.values(Ignored));

      const alerts = await db.of(ALERTS).all();
      expect(alerts).toStrictEqual(expectedAlerts);
    });

    it("ignores processed alerts", async () => {
      const { app, db, time } = createTestApp();
      const task = new AutoParseDisruptionsTask();

      for (const alert of Object.values(BusReplacements)) {
        await db.of(ALERTS).create(convertToProcessedAlert(alert, time.now()));
      }
      for (const alert of Object.values(Delays)) {
        await db.of(ALERTS).create(alert);
      }
      for (const alert of Object.values(Ignored)) {
        await db.of(ALERTS).create(alert);
      }

      await task.execute(app);

      const disruptions = await db.of(DISRUPTIONS).all();
      expect(disruptions).toHaveLength(Object.values(Delays).length);

      const expectedAlerts = Object.values(BusReplacements)
        .map((x) => convertToProcessedAlert(x, time.now()))
        .concat(
          Object.values(Delays).map((x) =>
            convertToProcessedAlert(x, time.now()),
          ),
        )
        .concat(Object.values(Ignored));
      const alerts = await db.of(ALERTS).all();
      expect(alerts).toStrictEqual(expectedAlerts);
    });
  });
});

function convertToProcessedAlert(alert: Alert, now: Date) {
  return new Alert(
    alert.id,
    alert.data,
    alert.updatedData,
    alert.appearedAt,
    now,
    alert.updatedAt,
    alert.ignoreFutureUpdates,
    alert.deleteAt,
  );
}
