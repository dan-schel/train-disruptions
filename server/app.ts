import { StationCollection } from "@/server/data/station/station-collection";
import { Database } from "@/server/database/lib/general/database";
import { AlertSource } from "@/server/alert-source/alert-source";
import { migrations } from "@/server/database/migrations/migrations";
import { DiscordClient } from "@/server/discord";
import { LineCollection } from "@/server/data/line/line-collection";
import { TimeProvider } from "@/server/time-provider";
import { LogHistoricalAlertsTask } from "@/server/task/tasks/log-historical-alerts-task";
import { SendStartupMessageTask } from "@/server/task/tasks/send-startup-message-task";
import { TaskScheduler } from "@/server/task/lib/task";
import { areUnique } from "@dan-schel/js-utils";

export class App {
  private readonly _taskSchedulers: TaskScheduler[];

  constructor(
    readonly lines: LineCollection,
    readonly stations: StationCollection,
    readonly database: Database,
    readonly alertSource: AlertSource,
    readonly discordClient: DiscordClient | null,
    readonly time: TimeProvider,
    readonly commitHash: string | null,
  ) {
    const tasks = [new SendStartupMessageTask(), new LogHistoricalAlertsTask()];

    if (!areUnique(tasks.map((x) => x.taskId))) {
      throw new Error("Two tasks cannot share the same ID.");
    }

    this._taskSchedulers = tasks.map((x) => x.getScheduler(this));
  }

  async init() {
    // Has to run before anything else that might use the database.
    await this.database.runMigrations(migrations);

    // Run all startup tasks.
    await Promise.all(this._taskSchedulers.map((t) => t.onServerInit()));
  }

  onServerReady(port: number) {
    // eslint-disable-next-line no-console
    console.log(`🟢 Server listening on http://localhost:${port}`);

    // Schedule all periodic tasks.
    this._taskSchedulers.forEach((t) => t.onServerReady());
  }
}
