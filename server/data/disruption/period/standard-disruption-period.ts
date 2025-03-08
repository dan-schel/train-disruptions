import { z } from "zod";
import { Ends, endsBson } from "./ends/ends";
import { TimeRange } from "./utils/time-range";
import {
  CalendarMark,
  DisplayStringOptions,
  DisruptionPeriodBase,
} from "./disruption-period-base";
import { formatDate } from "./utils/utils";
import { JustDate } from "./utils/just-date";

/** Disruption is active continuously from the start date to the end date. */
export class StandardDisruptionPeriod extends DisruptionPeriodBase {
  constructor(
    readonly start: Date | null,
    readonly end: Ends,
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
    return this.getFullyEncompassingTimeRange().intersects(range);
  }

  occursAt(date: Date): boolean {
    return this.getFullyEncompassingTimeRange().includes(date);
  }

  getFullyEncompassingTimeRange(): TimeRange {
    return new TimeRange(this.start, this.end.getLatestInterpretableDate());
  }
}
