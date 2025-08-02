import { DisruptionDataInputJson } from "@/shared/schemas/common/disruption-data-input";
import { DisruptionPeriodInputJson } from "@/shared/schemas/common/disruption-period-input";
import z from "zod";

export const AlertProcessingInputJson = z
  .object({
    data: DisruptionDataInputJson,
    period: DisruptionPeriodInputJson,
  })
  .array();
export type AlertProcessingInput = z.infer<typeof AlertProcessingInputJson>;
