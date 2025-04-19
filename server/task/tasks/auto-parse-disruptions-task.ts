import { App } from "@/server/app";
import { OnStartupScheduler } from "@/server/task/lib/on-startup-scheduler";
import { Task } from "@/server/task/lib/task";
import { TaskScheduler } from "@/server/task/lib/task-scheduler";
import { BusReplacementsParser } from "@/server/auto-parser/bus-replacements-parser";
import { DisruptionParser } from "@/server/auto-parser/auto-parser";

/**
 * Seeds a Super Admin into the database if the credentials are provided via environment variables
 * and a Super Admin doesn't exist inside the database
 */
export class AutoParseDisruptionsTask extends Task {
  static readonly TASK_ID = "auto-parse-disruptions";
  readonly parsers: DisruptionParser[];

  constructor() {
    super(AutoParseDisruptionsTask.TASK_ID);
    this.parsers = [new BusReplacementsParser()];
  }

  getScheduler(app: App): TaskScheduler {
    return new OnStartupScheduler(app, this);
  }

  async execute(app: App): Promise<void> {
    try {
      for (const parser of this.parsers) {
        await parser.parseAlerts(app);
        // TODO: Save to database
      }
    } catch (error) {
      console.warn("Failed to auto parse disruptions.");
      console.warn(error);
    }
  }
}
