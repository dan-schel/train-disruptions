import { z } from "zod";
import { CalendarMark, DisruptionPeriodBase } from "./disruption-period-base";
import { Ends, endsBson } from "./ends/ends";

/** Disruption is active continuously from the start date to the end date. */
export class StandardDisruptionPeriod extends DisruptionPeriodBase {
  constructor(
    readonly start: Date | null,
    readonly end: Ends,
  ) {
    super();
  }

  toDisplayString(): string {
    // TODO: Implement this.
    return `Sat 22 Feb to early May`;
  }

  getCalendarMarks(): readonly CalendarMark[] {
    // TODO: Implement this.
    return [];
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
