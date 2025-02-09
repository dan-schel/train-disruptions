import { z } from "zod";
import { DisruptionPeriod } from "./disruption-period";
import { EndsAfterLastService } from "./ends/ends-after-last-service";
import { EndsApproximately } from "./ends/ends-approximately";
import { EndsExactly } from "./ends/ends-exactly";
import { EndsNever } from "./ends/ends-never";
import { EndsWhenAlertEnds } from "./ends/ends-when-alert-ends";

/** Disruption is active continuously from the start date to the end date. */
export class StandardDisruptionPeriod extends DisruptionPeriod {
  constructor(
    public start: Date | null,
    public end:
      | EndsAfterLastService
      | EndsApproximately
      | EndsExactly
      | EndsNever
      | EndsWhenAlertEnds,
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("standard"),
      start: z.date().nullable(),
      end: z.union([
        EndsAfterLastService.bson,
        EndsApproximately.bson,
        EndsExactly.bson,
        EndsNever.bson,
        EndsWhenAlertEnds.bson,
      ]),
    })
    .transform((x) => new StandardDisruptionPeriod(x.start, x.end));

  toBson(): z.input<typeof StandardDisruptionPeriod.bson> {
    return {
      type: "standard",
      start: this.start,
      end: this.end.toBson(),
    };
  }
}
