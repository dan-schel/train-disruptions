import { DisruptionDataInputJson } from "@/shared/schemas/common/disruption-data-input";
import { DisruptionPeriodInputJson } from "@/shared/schemas/common/disruption-period-input";
import z from "zod";

export const DisruptionProcessingInputJson = z.object({
  data: DisruptionDataInputJson,
  period: DisruptionPeriodInputJson,
});
export type DisruptionProcessingInput = z.infer<
  typeof DisruptionProcessingInputJson
>;
