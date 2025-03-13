import { DatabaseModel } from "@/server/database/lib/general/database-model";
import { z } from "zod";

export class DeploymentLog {
  constructor(
    readonly id: string,
    readonly commitHash: string,
    readonly createdAt: Date,
  ) {}
}

export class DeploymentLogModel extends DatabaseModel<
  DeploymentLog,
  string,
  z.input<typeof DeploymentLogModel.schema>
> {
  static instance = new DeploymentLogModel();

  private static schema = z.object({
    commitHash: z.string(),
    createdAt: z.coerce.date(),
  });

  private constructor() {
    super("deployment-logs");
  }

  getId(item: DeploymentLog): string {
    return item.id;
  }

  serialize(item: DeploymentLog): { commitHash: string; createdAt: Date } {
    return {
      commitHash: item.commitHash,
      createdAt: item.createdAt,
    };
  }

  deserialize(id: string, item: unknown): DeploymentLog {
    const parsed = DeploymentLogModel.schema.parse(item);
    return new DeploymentLog(id, parsed.commitHash, parsed.createdAt);
  }
}
