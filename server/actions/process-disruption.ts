import { createData, createPeriod } from "@/server/actions/utils";
import { App } from "@/server/app";
import { Disruption } from "@/server/data/disruption/disruption";
import { AlertRepository } from "@/server/database-repository/alert-repository";
import { DisruptionRepository } from "@/server/database-repository/disruption-repository";
import { DISRUPTIONS } from "@/server/database/models/models";
import { DisruptionProcessingInput } from "@/shared/schemas/disruption-processing/disruption-processing-input";

type Result =
  | { error: "not-found" | "no-alert-to-end-with" }
  | { success: true };

export async function processDisruption(
  app: App,
  id: string,
  input: DisruptionProcessingInput,
): Promise<Result> {
  const disruption = await DisruptionRepository.getRepository(
    app,
  ).getDisruption({ id, valid: "either" });
  if (disruption === null) return { error: "not-found" };

  const alerts = await AlertRepository.getRepository(app).listAlerts({
    ids: disruption.sourceAlertIds,
  });
  if (input.period.end.type === "ends-when-alert-ends" && alerts.length === 0)
    return { error: "no-alert-to-end-with" };

  const data = createData(input.data);
  const period = createPeriod({ alert: alerts[0] }, input.period);

  const _disruption = new Disruption(
    disruption.id,
    data,
    disruption.sourceAlertIds,
    period,
    "manual",
  );
  await app.database.of(DISRUPTIONS).update(_disruption);

  return { success: true };
}
