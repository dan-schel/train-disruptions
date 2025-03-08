import { z } from "zod";
import {
  CalendarMark,
  DisplayStringOptions,
  DisruptionPeriodBase,
} from "./disruption-period-base";
import { Ends, endsBson } from "./ends/ends";
import { eveningStarts, formatDate } from "./utils/utils";
import { TimeRange } from "./utils/time-range";
import { JustDate } from "./utils/just-date";

/** Disruption is active every evening from the start date to the end date. */
export class EveningsOnlyDisruptionPeriod extends DisruptionPeriodBase {
  constructor(
    readonly start: Date | null,
    readonly end: Ends,

    /** E.g. `18` for 6pm to last service each day. */
    readonly startHourEachDay: number,
  ) {
    super();

    // TODO: This is kinda dumb. Should we expand this period to cover any
    // "repeating at a certain time of day each day" disruption? What would we
    // call that lol?
    if (startHourEachDay < eveningStarts) {
      throw new Error(
        `Cannot create evenings only period with start hour of ` +
          `${startHourEachDay}, as we consider evening to start at ` +
          `${eveningStarts}.`,
      );
    }
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

  getDisplayString(options: DisplayStringOptions): string {
    const endStr = this.end.getDisplayString({ now: options.now });

    if (this.start != null) {
      const startStr = formatDate(this.start, options.now);
      return `${startStr} until ${endStr}`;
    } else {
      return `until ${endStr}`;
    }
  }

  getCalendarMark(date: JustDate): CalendarMark {
    throw new Error("Method not implemented.");
  }

  intersects(range: TimeRange): boolean {
    throw new Error("Method not implemented.");
  }

  occursAt(date: Date): boolean {
    throw new Error("Method not implemented.");
  }

  getFullyEncompassingTimeRange(): TimeRange {
    throw new Error("Method not implemented.");
  }
}
