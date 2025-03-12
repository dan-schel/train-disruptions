import { z } from "zod";
import { EveningsOnlyDisruptionPeriod } from "@/server/data/disruption/period/evenings-only-disruption-period";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import { CustomDisruptionPeriod } from "@/server/data/disruption/period/custom-disruption-period";

/**
 * Defines the period(s) of time a disruption is active.
 *
 * (All implementations of DisruptionPeriodBase.)
 */
export type DisruptionPeriod =
  | StandardDisruptionPeriod
  | EveningsOnlyDisruptionPeriod
  | CustomDisruptionPeriod;

export const disruptionPeriodBson = z.union([
  StandardDisruptionPeriod.bson,
  EveningsOnlyDisruptionPeriod.bson,
  CustomDisruptionPeriod.bson,
]);
