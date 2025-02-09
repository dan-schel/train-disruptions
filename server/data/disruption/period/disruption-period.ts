import { z } from "zod";
import { EveningsOnlyDisruptionPeriod } from "./evenings-only-disruption-period";
import { StandardDisruptionPeriod } from "./standard-disruption-period";

/**
 * Defines the period(s) of time a disruption is active.
 *
 * (All implementations of DisruptionPeriodBase.)
 */
export type DisruptionPeriod =
  | StandardDisruptionPeriod
  | EveningsOnlyDisruptionPeriod;

export const disruptionPeriodBson = z.union([
  StandardDisruptionPeriod.bson,
  EveningsOnlyDisruptionPeriod.bson,
]);
