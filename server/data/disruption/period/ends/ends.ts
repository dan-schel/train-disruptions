import { z } from "zod";
import { EndsAfterLastService } from "@/server/data/disruption/period/ends/ends-after-last-service";
import { EndsApproximately } from "@/server/data/disruption/period/ends/ends-approximately";
import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { EndsNever } from "@/server/data/disruption/period/ends/ends-never";
import { EndsWhenAlertEnds } from "@/server/data/disruption/period/ends/ends-when-alert-ends";

/**
 * Defines how/when the disruption ends.
 *
 * (All implementations of EndsBase.)
 */
export type Ends =
  | EndsAfterLastService
  | EndsApproximately
  | EndsExactly
  | EndsNever
  | EndsWhenAlertEnds;

export const endsBson = z.union([
  EndsAfterLastService.bson,
  EndsApproximately.bson,
  EndsExactly.bson,
  EndsNever.bson,
  EndsWhenAlertEnds.bson,
]);
