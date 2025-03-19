import { App } from "@/server/app";
import { TaskScheduler } from "@/server/task/lib/task-scheduler";

export abstract class Task {
  constructor(readonly taskId: string) {}

  abstract getScheduler(app: App): TaskScheduler;
  abstract execute(app: App): Promise<void>;
}
