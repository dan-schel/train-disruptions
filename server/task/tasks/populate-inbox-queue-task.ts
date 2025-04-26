import { App } from "@/server/app";
import { Alert, AlertData } from "@/server/data/alert";
import { ALERTS } from "@/server/database/models/models";
import { IntervalScheduler } from "@/server/task/lib/interval-scheduler";
import { Task } from "@/server/task/lib/task";
import { TaskScheduler } from "@/server/task/lib/task-scheduler";
import { Disruption } from "@/types/disruption";

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
      const alerts = await app.database.of(ALERTS).all();
      this._addNewAlerts(app, disruptions, alerts);
      this._cleanupOldAlerts(app, disruptions, alerts);
    } catch (error) {
      console.warn("Failed to process incoming alerts.");
      console.warn(error);
    }
  }

  private async _addNewAlerts(
    app: App,
    disruptions: Disruption[],
    alerts: Alert[],
  ) {
    for (const disruption of disruptions) {
      const id = disruption.disruption_id.toString();
      if (alerts.some((x) => x.id === id)) continue;

      const alert = new Alert(
        id,
        this._createAlertData(disruption),
        null,
        app.time.now(),
        null,
        null,
        false,
        null,
      );

      await app.database.of(ALERTS).create(alert);
    }
  }

  private async _cleanupOldAlerts(
    app: App,
    disruptions: Disruption[],
    alerts: Alert[],
  ) {
    for (const alert of alerts) {
      if (!disruptions.some((d) => d.disruption_id.toString() === alert.id)) {
        await app.database.of(ALERTS).delete(alert.id);
      }
    }
  }

  private _createAlertData(disruption: Disruption) {
    return new AlertData(
      disruption.title,
      disruption.description,
      disruption.url,
      new Date(disruption.from_date),
      disruption.to_date ? new Date(disruption.to_date) : null,
      disruption.routes.map((route) => route.route_id),
      disruption.stops.map((stop) => stop.stop_id),
    );
  }
}
