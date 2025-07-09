import { z } from "zod";
import {
  EndsAfterLastServiceInputJson,
  EndsApproximatelyInputJson,
  EndsExactlyInputJson,
  EndsInputJson,
  StandardDisruptionPeriodInputJson,
  EveningsOnlyDisruptionPeriodInputJson,
  DisruptionPeriodInputJson,
} from "@/shared/schemas/alert-processing/disruption-period-input";

export type EndsAfterLastServiceInput = z.input<
  typeof EndsAfterLastServiceInputJson
>;

export type EndsApproximatelyInput = z.input<typeof EndsApproximatelyInputJson>;

export type EndsExactlyInput = z.input<typeof EndsExactlyInputJson>;

export type EndsInput = z.input<typeof EndsInputJson>;

export type StandardDisruptionPeriodInput = z.input<
  typeof StandardDisruptionPeriodInputJson
>;

export type EveningsOnlyDisruptionPeriodInput = z.input<
  typeof EveningsOnlyDisruptionPeriodInputJson
>;

export type DisruptionPeriodInput = z.input<typeof DisruptionPeriodInputJson>;
