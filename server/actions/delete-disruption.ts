import { App } from "@/server/app";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionRepository } from "@/server/database-repository/disruption-repository";
import { DISRUPTIONS } from "@/server/database/models/models";

type Result = { error: "not-found" } | { success: true };

export async function deleteDisruption(
  app: App,
  id: Disruption["id"],
): Promise<Result> {
  const disruption = await DisruptionRepository.getRepository(
    app,
  ).getDisruption({ id, valid: "either" });

  if (disruption === null) return { error: "not-found" };

  await app.database.of(DISRUPTIONS).delete(id);

  return { success: true };
}
