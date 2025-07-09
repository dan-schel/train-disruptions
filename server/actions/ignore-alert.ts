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
  if (alert.getState() !== "new") return { error: "already-processed" };

  if (permanently) {
    await app.database.of(ALERTS).update(alert.ignored());
  } else {
    await app.database.of(ALERTS).update(alert.processed());
  }

  return { success: true };
}
