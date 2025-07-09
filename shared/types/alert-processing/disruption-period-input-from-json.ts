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

export type EndsAfterLastServiceInputFromJson = z.input<
  typeof EndsAfterLastServiceInputJson
>;

export type EndsApproximatelyInputFromJson = z.input<
  typeof EndsApproximatelyInputJson
>;

export type EndsExactlyInputFromJson = z.input<typeof EndsExactlyInputJson>;

export type EndsInputFromJson = z.input<typeof EndsInputJson>;

export type StandardDisruptionPeriodInputFromJson = z.input<
  typeof StandardDisruptionPeriodInputJson
>;

export type EveningsOnlyDisruptionPeriodInputFromJson = z.input<
  typeof EveningsOnlyDisruptionPeriodInputJson
>;

export type DisruptionPeriodInputFromJson = z.input<
  typeof DisruptionPeriodInputJson
>;
