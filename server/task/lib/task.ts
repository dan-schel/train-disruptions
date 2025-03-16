import { App } from "@/server/app";

export abstract class Task {
  constructor(readonly taskId: string) {}

  abstract getScheduler(app: App): TaskScheduler;
  abstract execute(app: App): Promise<void>;
}

export abstract class TaskScheduler {
  constructor(
    protected readonly _app: App,
    protected readonly _task: Task,
  ) {}

  abstract onServerInit(): Promise<void>;
  abstract onServerReady(): void;
}

export class OnStartupScheduler extends TaskScheduler {
  async onServerInit() {
    // TODO: In future we might have tasks that have prerequisites (i.e. another
    // task must have run first).
    await this._task.execute(this._app);
  }

  onServerReady() {}
}

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
    // TODO: Use app.time to schedule the task.
    setInterval(async () => {
      await this._task.execute(this._app);
    }, this._intervalMs);
  }
}
