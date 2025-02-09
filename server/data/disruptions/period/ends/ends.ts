import { z } from "zod";
import { EndsAfterLastService } from "./ends-after-last-service";
import { EndsApproximately } from "./ends-approximately";
import { EndsExactly } from "./ends-exactly";
import { EndsNever } from "./ends-never";
import { EndsWhenAlertEnds } from "./ends-when-alert-ends";

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
