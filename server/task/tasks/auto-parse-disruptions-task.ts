import { App } from "@/server/app";
import { Task } from "@/server/task/lib/task";
import { TaskScheduler } from "@/server/task/lib/task-scheduler";
import { BusReplacementsParser } from "@/server/auto-parser/bus-replacements-parser";
import { AutoParser } from "@/server/auto-parser/auto-parser";
import { IntervalScheduler } from "@/server/task/lib/interval-scheduler";
import { DelaysParser } from "@/server/auto-parser/delays-parser";

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
      await this.parser.parseAlerts(app);
      // TODO: Save to database
    } catch (error) {
      console.warn("Failed to auto parse disruptions.");
      console.warn(error);
    }
  }
}
