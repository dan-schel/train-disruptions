import { App } from "@/server/app";
import { Alert, AlertData } from "@/server/data/alert";
import { ALERTS } from "@/server/database/models/models";
import { IntervalScheduler } from "@/server/task/lib/interval-scheduler";
import { Task } from "@/server/task/lib/task";
import { TaskScheduler } from "@/server/task/lib/task-scheduler";

/**
 * Fetches fresh alerts from the alert source, and writes all unseen alerts to
 * the database, to later be processed and turned into a disruption
 */
export class PopulateInboxQueueTask extends Task {
  static readonly TASK_ID = "populate-inbox-queue";

  constructor() {
    super(PopulateInboxQueueTask.TASK_ID);
  }

  getScheduler(app: App): TaskScheduler {
    return new IntervalScheduler(app, this, IntervalScheduler.FIVE_MINUTES);
  }

  async execute(app: App): Promise<void> {
    try {
      const disruptions = await app.alertSource.fetchDisruptions();

      for (const disruption of disruptions) {
        const existing = await app.database
          .of(ALERTS)
          .get(disruption.disruption_id.toString());

        if (existing != null) return;

        const alerts = new Alert(
          disruption.disruption_id.toString(),
          new AlertData(
            disruption.title,
            disruption.description,
            disruption.url,
            new Date(disruption.from_date),
            disruption.to_date ? new Date(disruption.to_date) : null,
            disruption.routes.map((route) => route.route_id),
            disruption.stops.map((stop) => stop.stop_id),
          ),
          null,
          app.time.now(),
          null,
          null,
          false,
          null,
        );
        await app.database.of(ALERTS).create(alerts);
      }
    } catch (error) {
      console.warn("Failed to populate unprocessed alerts.");
      console.warn(error);
    }
  }
}
