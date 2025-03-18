import { App } from "@/server/app";
import { Task } from "@/server/task/lib/task";

export abstract class TaskScheduler {
  constructor(
    protected readonly _app: App,
    protected readonly _task: Task,
  ) {}

  abstract onServerInit(): Promise<void>;
  abstract onServerReady(): void;
}
