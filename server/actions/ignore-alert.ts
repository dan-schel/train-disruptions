import { App } from "@/server/app";
import { ALERTS } from "@/server/database/models/models";

type Result = { error: "not-found" | "already-processed" } | { success: true };

export async function ignoreAlert(
  app: App,
  id: string,
  permanently: boolean,
): Promise<Result> {
  const alert = await app.database.of(ALERTS).get(id);
  if (alert == null) return { error: "not-found" };
  if (!alert.isInInbox) return { error: "already-processed" };

  const updatedData = alert.with({
    state: permanently ? "ignored-manually" : "ignored-permanently",
    updatedData: null,
    processedAt: app.time.now(),
    updatedAt: null,
  });
  await app.database.of(ALERTS).update(updatedData);
  return { success: true };
}
