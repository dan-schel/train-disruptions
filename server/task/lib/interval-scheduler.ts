import { App } from "@/server/app";
import { Task } from "@/server/task/lib/task";
import { TaskScheduler } from "@/server/task/lib/task-scheduler";

export class IntervalScheduler extends TaskScheduler {
  static readonly FIVE_MINUTES = 5 * 60 * 1000;

  constructor(
    app: App,
    task: Task,
    private readonly _intervalMs: number,
  ) {
    super(app, task);
  }

  async onServerInit() {
    await this._task.execute(this._app);
  }

  onServerReady() {
    // TODO: One day a more sophisticated scheduler might adjust the interval
    // based on whether the task succeeded or failed.
    this._app.time.setInterval(async () => {
      await this._task.execute(this._app);
    }, this._intervalMs);
  }
}
