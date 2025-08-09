import { App } from "@/server/app";
import { HistoricalAlert } from "@/server/data/alert/historical-alert";
import { HISTORICAL_ALERTS } from "@/server/database/models/models";
import { IntervalScheduler } from "@/server/task/lib/interval-scheduler";
import { Task } from "@/server/task/lib/task";
import { TaskScheduler } from "@/server/task/lib/task-scheduler";

/**
 * Fetches fresh alerts from the alert source, and writes all unseen alerts to
 * the database.
 */
export class LogHistoricalAlertsTask extends Task {
  static readonly TASK_ID = "log-historical-alerts";

  constructor() {
    super(LogHistoricalAlertsTask.TASK_ID);
  }

  getScheduler(app: App): TaskScheduler {
    return new IntervalScheduler(app, this, IntervalScheduler.FIVE_MINUTES);
  }

  async execute(app: App): Promise<void> {
    try {
      const disruptions = await app.alertSource.fetchDisruptions();

      for (const disruption of disruptions) {
        const existing = await app.database
          .of(HISTORICAL_ALERTS)
          .get(disruption.disruption_id);

        if (existing != null) return;

        const record = new HistoricalAlert(
          disruption.disruption_id,
          disruption.title,
          disruption.description,
        );

        await app.database.of(HISTORICAL_ALERTS).create(record);
      }
    } catch (error) {
      console.warn("Failed to log historical alerts.");
      console.warn(error);
    }
  }
}
