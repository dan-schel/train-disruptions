import { App } from "@/server/app";
import { USERS } from "@/server/database/models/models";
import { User } from "@/server/database/models/user";
import { OnStartupScheduler } from "@/server/task/lib/on-startup-scheduler";
import { Task } from "@/server/task/lib/task";
import { TaskScheduler } from "@/server/task/lib/task-scheduler";
import { uuid } from "@dan-schel/js-utils";
import { hash } from "bcrypt";

/**
 * Seeds a Super Admin into the database if the credentials are provided via environment variables
 * and a Super Admin doesn't exist inside the data,
 */
export class SeedSuperAdminTask extends Task {
  static readonly TASK_ID = "seed-super-admin";

  constructor(
    private readonly username: string | null,
    private readonly password: string | null,
  ) {
    super(SeedSuperAdminTask.TASK_ID);
  }

  getScheduler(app: App): TaskScheduler {
    return new OnStartupScheduler(app, this);
  }

  async execute(app: App): Promise<void> {
    try {
      if (!this.username || !this.password) {
        return;
      }
      const existing = await app.database
        .of(USERS)
        .first({ where: { role: "super" } });
      if (!existing) {
        const hashedPW = await hash(this.password, 10);
        await app.database
          .of(USERS)
          .create(new User(uuid(), this.username, hashedPW, "super"));
      }
    } catch (error) {
      console.warn("Failed to seed super admin into the database.");
      console.warn(error);
    }
  }
}
