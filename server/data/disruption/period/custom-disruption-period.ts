import { z } from "zod";
import {
  DisplayStringOptions,
  DisruptionPeriodBase,
} from "./disruption-period-base";
import { TimeRange } from "./time-range";
import { CalendarMark, CalendarMarksOptions } from "./calendar-mark";

/**
 * Allows complete customisation of active time ranges, calendar marks, and the
 * display string used.
 */
export class CustomDisruptionPeriod extends DisruptionPeriodBase {
  constructor(
    readonly timeRanges: readonly TimeRange[],
    readonly displayString: string,
    readonly calendarMarks: CalendarMark[],
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("custom"),
      timeRanges: TimeRange.bson.array(),
      displayString: z.string(),
      calendarMarks: CalendarMark.bson.array(),
    })
    .transform(
      (x) =>
        new CustomDisruptionPeriod(
          x.timeRanges,
          x.displayString,
          x.calendarMarks,
        ),
    );

  toBson(): z.input<typeof CustomDisruptionPeriod.bson> {
    return {
      type: "custom",
      timeRanges: this.timeRanges.map((x) => x.toBson()),
      displayString: this.displayString,
      calendarMarks: this.calendarMarks,
    };
  }

  getDisplayString(_options: DisplayStringOptions): string {
    return this.displayString;
  }

  getCalendarMarks(options: CalendarMarksOptions): readonly CalendarMark[] {
    return this.calendarMarks.filter((x) => x.matchesRestriction(options));
  }

  getActiveTimeRanges(): readonly TimeRange[] {
    return this.timeRanges;
  }
}
