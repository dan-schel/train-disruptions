import { TaskScheduler } from "@/server/task/lib/task-scheduler";

export class OnStartupScheduler extends TaskScheduler {
  async onServerInit() {
    // TODO: In future we might have tasks that have prerequisites (i.e. another
    // task must have run first).
    await this._task.execute(this._app);
  }

  onServerReady() {}
}
