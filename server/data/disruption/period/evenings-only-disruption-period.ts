import { z } from "zod";
import { CalendarMark, DisruptionPeriodBase } from "./disruption-period-base";
import { Ends, endsBson } from "./ends/ends";

/** Disruption is active every evening from the start date to the end date. */
export class EveningsOnlyDisruptionPeriod extends DisruptionPeriodBase {
  constructor(
    readonly start: Date | null,
    readonly end: Ends,

    /** E.g. `18` for 6pm to last service each day. */
    readonly startHourEachDay: number,
  ) {
    super();
  }

  toDisplayString(): string {
    // TODO: Implement this.
    return `6pm to last service every evening, Sat 22 Feb to Sun 23 Feb`;
  }

  getCalendarMarks(): readonly CalendarMark[] {
    // TODO: Implement this.
    return [];
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
