import { ALERTS, DISRUPTIONS } from "@/server/database/models/models";
import { PopulateInboxQueueTask } from "@/server/task/tasks/populate-inbox-queue-task";
import {
  alert1,
  alert2,
  alert3,
  alert4,
  alert5,
  alert6,
  alert7,
  alert8,
  alert9,
  alert10,
  ptvDisruption1,
  ptvDisruption2,
  ptvDisruption3,
  ptvDisruption4,
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

    describe("#_updateAlerts", () => {
      it("updates an existing alert", async () => {
        const { app, db, alertSource } = createTestApp();
        const task = new PopulateInboxQueueTask();
        alertSource.setAlerts([ptvDisruption4]);
        await db.of(ALERTS).create(alert4);

        await task.execute(app);

        const alerts = await db.of(ALERTS).all();
        expect(alerts).toStrictEqual([alert8]);
      });

      it("skips an ignored alert", async () => {
        const { app, db, alertSource } = createTestApp();
        const task = new PopulateInboxQueueTask();
        alertSource.setAlerts([ptvDisruption4]);
        await db.of(ALERTS).create(alert5);

        await task.execute(app);

        const alerts = await db.of(ALERTS).all();
        expect(alerts).toStrictEqual([alert5]);
      });

      it("updates a processed alert", async () => {
        const { app, db, alertSource } = createTestApp();
        const task = new PopulateInboxQueueTask();
        alertSource.setAlerts([ptvDisruption4]);
        await db.of(ALERTS).create(alert6);

        await task.execute(app);

        const alerts = await db.of(ALERTS).all();
        expect(alerts).toStrictEqual([alert8]);
      });

      it("updates an updated alert", async () => {
        const { app, db, alertSource } = createTestApp();
        const task = new PopulateInboxQueueTask();
        alertSource.setAlerts([ptvDisruption4]);
        await db.of(ALERTS).create(alert7);

        await task.execute(app);

        const alerts = await db.of(ALERTS).all();
        expect(alerts).toStrictEqual([alert9]);
      });

      it("doesn't update if alert is up-to-date", async () => {
        const { app, db, alertSource } = createTestApp();
        const task = new PopulateInboxQueueTask();
        alertSource.setAlerts([ptvDisruption4]);
        await db.of(ALERTS).create(alert10);

        await task.execute(app);

        const alerts = await db.of(ALERTS).all();
        expect(alerts).toStrictEqual([alert10]);
      });
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

    it("creates disruptions from applicable alerts", async () => {
      const { app, db, alertSource } = createTestApp();
      const task = new PopulateInboxQueueTask();
      alertSource.setAlerts([ptvDisruption2, ptvDisruption3]);

      let disruptions = await db.of(DISRUPTIONS).all();
      expect(disruptions).toHaveLength(0);

      await task.execute(app);

      const alerts = await db.of(ALERTS).all();
      expect(alerts).toStrictEqual([alert2, alert3]);

      disruptions = await db.of(DISRUPTIONS).all();
      expect(disruptions).toHaveLength(1);
    });
  });
});
