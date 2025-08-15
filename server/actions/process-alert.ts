import { createData, createPeriod } from "@/server/actions/utils";
import { App } from "@/server/app";
import { Alert } from "@/server/data/alert/alert";
import { Disruption } from "@/server/data/disruption/disruption";
import { ALERTS, DISRUPTIONS } from "@/server/database/models/models";
import { AlertProcessingInput } from "@/shared/schemas/alert-processing/alert-processing-input";
import { uuid } from "@dan-schel/js-utils";

type Result = { error: "not-found" | "already-processed" } | { success: true };
type ProcessingContext = { alert: Alert };

export async function processAlert(
  app: App,
  id: string,
  input: AlertProcessingInput,
): Promise<Result> {
  const alert = await app.database.of(ALERTS).get(id);
  if (alert == null) return { error: "not-found" };
  if (alert.isInInbox) return { error: "already-processed" };

  const ctx: ProcessingContext = { alert };

  // TODO: This whole action should be inside a DB transaction so we don't
  // create one disruption, fail to create a second, and then allow the user to
  // reprocess the alert with the first disruption still in the DB. The failure
  // should cause the first disruption created to be rolled-back (removed).

  for (const { data: dataInput, period: periodInput } of input) {
    const data = createData(dataInput);
    const period = createPeriod(ctx, periodInput);
    const disruption = new Disruption(uuid(), data, period, "manual", alert.id);

    await app.database.of(DISRUPTIONS).create(disruption);
  }

  await app.database.of(ALERTS).update(
    alert.with({
      state: "processed-manually",
      updatedData: null,
      updatedAt: null,
      processedAt: app.time.now(),
    }),
  );

  return { success: true };
}
