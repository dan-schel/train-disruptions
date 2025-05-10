import { ALERTS } from "@/server/database/models/models";
import { PopulateInboxQueueTask } from "@/server/task/tasks/populate-inbox-queue-task";
import {
  alert1,
  alert2,
  ptvDisruption1,
  ptvDisruption2,
} from "@/tests/server/task/tasks/populate-inbox-queue-task/sample-alerts";
import { createTestApp } from "@/tests/server/utils";
import { describe, expect, it } from "vitest";

describe("PopulateInboxQueueTask", () => {
  describe("#execute", () => {
    it("does nothing when no change to alerts have occurred", async () => {
      const { app, db, alertSource } = createTestApp();
      const task = new PopulateInboxQueueTask();
      alertSource.setAlerts([ptvDisruption1]);
      await db.of(ALERTS).create(alert1);

      await task.execute(app);

      const alerts = await db.of(ALERTS).all();
      expect(alerts).toStrictEqual([alert1]);
    });

    it("adds unseen alerts to the database", async () => {
      const { app, db, alertSource } = createTestApp();
      const task = new PopulateInboxQueueTask();
      alertSource.setAlerts([ptvDisruption1, ptvDisruption2]);
      await db.of(ALERTS).create(alert1);

      await task.execute(app);

      const alerts = await db.of(ALERTS).all();
      expect(alerts).toStrictEqual([alert1, alert2]);
    });

    it("cleans up old alerts once they disappear from the source", async () => {
      const { app, db, alertSource } = createTestApp();
      const task = new PopulateInboxQueueTask();
      alertSource.setAlerts([ptvDisruption1]);
      await db.of(ALERTS).create(alert1);
      await db.of(ALERTS).create(alert2);

      await task.execute(app);

      const alerts = await db.of(ALERTS).all();
      expect(alerts).toStrictEqual([alert1]);
    });
  });
});
