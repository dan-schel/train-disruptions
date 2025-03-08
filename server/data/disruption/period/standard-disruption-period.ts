import { z } from "zod";
import { Ends, endsBson } from "./ends/ends";
import { CalendarMark, CalendarMarksOptions } from "./disrupted-calendar-day";
import { TimeRange } from "./time-range";
import {
  DisplayStringOptions,
  DisruptionPeriodBase,
} from "./disruption-period-base";
import { formatDate } from "./utils";

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

  getCalendarMarks(options: CalendarMarksOptions): readonly CalendarMark[] {
    const { from, to } = CalendarMark.restrictRangeByOptions(
      this._asTimeRange(),
      options,
    );
    return CalendarMark.buildList(from, to);
  }

  getActiveTimeRanges(): readonly TimeRange[] {
    return [this._asTimeRange()];
  }

  private _asTimeRange(): TimeRange {
    const endDate = this.end.getLatestInterpretableDate();
    return new TimeRange(this.start, endDate);
  }
}
