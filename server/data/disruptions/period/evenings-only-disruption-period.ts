import { z } from "zod";
import { DisruptionPeriod } from "./disruption-period";
import { Ends, endsBson } from "./ends/ends";

/** Disruption is active every evening from the start date to the end date. */
export class EveningsOnlyDisruptionPeriod extends DisruptionPeriod {
  constructor(
    public start: Date | null,
    public end: Ends,

    /** E.g. `18` for 6pm to last service each day. */
    public startHourEachDay: number,
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("evenings-only"),
      start: z.date().nullable(),
      end: endsBson,
      startHourEachDay: z.number(),
    })
    .transform(
      (x) =>
        new EveningsOnlyDisruptionPeriod(x.start, x.end, x.startHourEachDay),
    );

  toBson(): z.input<typeof EveningsOnlyDisruptionPeriod.bson> {
    return {
      type: "evenings-only",
      start: this.start,
      end: this.end.toBson(),
      startHourEachDay: this.startHourEachDay,
    };
  }
}
