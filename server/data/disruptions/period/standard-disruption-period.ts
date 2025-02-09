import { z } from "zod";
import { DisruptionPeriod } from "./disruption-period";
import { Ends, endsBson } from "./ends/ends";

/** Disruption is active continuously from the start date to the end date. */
export class StandardDisruptionPeriod extends DisruptionPeriod {
  constructor(
    public start: Date | null,
    public end: Ends,
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("standard"),
      start: z.date().nullable(),
      end: endsBson,
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
