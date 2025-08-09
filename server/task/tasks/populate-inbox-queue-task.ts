import { App } from "@/server/app";
import { AutoParsingPipeline } from "@/server/auto-parser/auto-parsing-pipeline";
import { BusReplacementsParserRule } from "@/server/auto-parser/rules/bus-replacements-parser-rule";
import { DelaysParserRule } from "@/server/auto-parser/rules/delays-parser-rule";
import { Alert } from "@/server/data/alert/alert";
import { AlertData } from "@/server/data/alert/alert-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { ALERTS, DISRUPTIONS } from "@/server/database/models/models";
import { IntervalScheduler } from "@/server/task/lib/interval-scheduler";
import { Task } from "@/server/task/lib/task";
import { TaskScheduler } from "@/server/task/lib/task-scheduler";
import { Disruption as PTVDisruption } from "@/types/disruption";
import { z } from "zod";

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
      const parser = new AutoParsingPipeline([
        new BusReplacementsParserRule(),
        new DelaysParserRule(),
      ]);
      const disruptions = await app.alertSource.fetchDisruptions();
      const alerts = await app.database.of(ALERTS).all();
      await Promise.all([
        this._addNewAlerts(app, parser, disruptions, alerts),
        this._updateAlerts(app, parser, disruptions, alerts),
        this._cleanupOldAlerts(app, disruptions, alerts),
      ]);
    } catch (error) {
      console.warn("Failed to populate unprocessed alerts.");
      console.warn(error);
    }
  }

  private async _addNewAlerts(
    app: App,
    parser: AutoParsingPipeline,
    disruptions: PTVDisruption[],
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

      // Prevent a failed parse attempt from not processing the rest of alerts
      try {
        const parsedDisruption = parser.parseAlert(alert, app);
        if (parsedDisruption) {
          await app.database.of(DISRUPTIONS).create(parsedDisruption);
          await app.database
            .of(ALERTS)
            .update(
              new Alert(
                alert.id,
                alert.data,
                alert.updatedData,
                alert.appearedAt,
                app.time.now(),
                alert.updatedAt,
                alert.ignoreFutureUpdates,
                alert.deleteAt,
              ),
            );
        }
      } catch (error) {
        console.warn(`Failed to parse alert #${alert.id}.`);
        console.warn(error);
      }
    }
  }

  private async _updateAlerts(
    app: App,
    parser: AutoParsingPipeline,
    disruptions: PTVDisruption[],
    alerts: Alert[],
  ) {
    for (const disruption of disruptions) {
      const id = disruption.disruption_id.toString();
      const alert = alerts.find((x) => x.id === id);
      const { success, data: mostRecentUpdate } = z.coerce
        .date()
        .safeParse(disruption.last_updated);

      if (alert && success && !alert.ignoreFutureUpdates) {
        const canToBeUpdated =
          (alert.getState() === "new" && alert.appearedAt < mostRecentUpdate) ||
          (alert.getState() === "processed" &&
            (alert.processedAt ?? app.time.now()) < mostRecentUpdate) ||
          (alert.getState() === "updated" &&
            (alert.updatedAt ?? app.time.now()) < mostRecentUpdate);

        if (canToBeUpdated) {
          const existingDisruption = await app.database.of(DISRUPTIONS).first({
            where: {
              sourceAlertIds: alert.id,
            },
          });

          let newDisruption: Disruption | null = null;
          try {
            newDisruption = parser.parseAlert(
              new Alert(
                alert.id,
                this._createAlertData(disruption),
                null,
                alert.appearedAt,
                null,
                null,
                alert.ignoreFutureUpdates,
                null,
              ),
              app,
              existingDisruption?.id,
            );
          } catch (error) {
            console.warn(`Failed to parse alert #${alert.id}.`);
            console.warn(error);
          }

          await app.database
            .of(ALERTS)
            .update(
              new Alert(
                alert.id,
                this._createAlertData(disruption),
                alert.updatedData,
                app.time.now(),
                newDisruption
                  ? app.time.now()
                  : existingDisruption?.curation === "automatic"
                    ? null
                    : alert.processedAt,
                alert.updatedAt,
                alert.ignoreFutureUpdates,
                alert.deleteAt,
              ),
            );

          if (existingDisruption?.curation === "automatic") {
            if (newDisruption) {
              await app.database.of(DISRUPTIONS).update(newDisruption);
            } else {
              // If a disruptions cannot be parsed with the new alert data,
              //  we should assume that the existing entry might no longer be valid
              // We're better off removing it than to display incorrect information
              await app.database.of(DISRUPTIONS).delete(existingDisruption.id);
            }
          } else if (!existingDisruption && newDisruption) {
            await app.database.of(DISRUPTIONS).create(newDisruption);
          }
        }
      }
    }
  }

  private async _cleanupOldAlerts(
    app: App,
    disruptions: PTVDisruption[],
    alerts: Alert[],
  ) {
    for (const alert of alerts) {
      if (!disruptions.some((d) => d.disruption_id.toString() === alert.id)) {
        await app.database.of(ALERTS).delete(alert.id);
        const _disruptions = await app.database.of(DISRUPTIONS).find({
          where: {
            sourceAlertIds: alert.id,
            curation: "automatic",
          },
        });
        for (const { id } of _disruptions) {
          await app.database.of(DISRUPTIONS).delete(id);
        }
      }
    }
  }

  private _createAlertData(disruption: PTVDisruption) {
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
