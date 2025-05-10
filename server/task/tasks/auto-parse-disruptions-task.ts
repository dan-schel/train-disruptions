import { App } from "@/server/app";
import { Task } from "@/server/task/lib/task";
import { TaskScheduler } from "@/server/task/lib/task-scheduler";
import { BusReplacementsParser } from "@/server/auto-parser/bus-replacements-parser";
import { AutoParser } from "@/server/auto-parser/auto-parser";
import { IntervalScheduler } from "@/server/task/lib/interval-scheduler";
import { DelaysParser } from "@/server/auto-parser/delays-parser";
import { ALERTS, DISRUPTIONS } from "@/server/database/models/models";
import { nonNull, unique } from "@dan-schel/js-utils";
import { Alert } from "@/server/data/alert";

/**
 * Parsers alerts stored in the database into Disruptions
 * TODO: Save the disruptions to database
 */
export class AutoParseDisruptionsTask extends Task {
  static readonly TASK_ID = "auto-parse-disruptions";
  private parser: AutoParser;

  constructor() {
    super(AutoParseDisruptionsTask.TASK_ID);
    this.parser = new AutoParser([
      new BusReplacementsParser(),
      new DelaysParser(),
    ]);
  }

  getScheduler(app: App): TaskScheduler {
    return new IntervalScheduler(app, this, IntervalScheduler.FIVE_MINUTES);
  }

  async execute(app: App): Promise<void> {
    try {
      const alerts = await app.database.of(ALERTS).find({
        where: {
          state: "new",
          ignoreFutureUpdates: false,
        },
      });
      const disruptions = await this.parser.parseAlerts(alerts, app);

      const processedAlerts = unique(
        disruptions.flatMap((x) => x.sourceAlertIds),
      )
        .map((x) => alerts.find((y) => y.id === x) ?? null)
        .filter(nonNull);

      for (const alert of processedAlerts) {
        const updatedAlert = new Alert(
          alert.id,
          alert.data,
          alert.updatedData,
          alert.appearedAt,
          app.time.now(),
          alert.updatedAt,
          alert.ignoreFutureUpdates,
          alert.deleteAt,
        );
        await app.database.of(ALERTS).update(updatedAlert);
      }

      for (const disruption of disruptions) {
        await app.database.of(DISRUPTIONS).create(disruption);
      }
    } catch (error) {
      console.warn("Failed to auto parse disruptions.");
      console.warn(error);
    }
  }
}
