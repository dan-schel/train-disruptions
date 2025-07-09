import { DisruptionDataInputJson } from "@/shared/schemas/alert-processing/disruption-data-input";
import { DisruptionPeriodInputJson } from "@/shared/schemas/alert-processing/disruption-period-input";
import z from "zod";

export const AlertProcessingInputJson = z
  .object({
    data: DisruptionDataInputJson,
    period: DisruptionPeriodInputJson,
  })
  .array();
export type AlertProcessingInput = z.input<typeof AlertProcessingInputJson>;
