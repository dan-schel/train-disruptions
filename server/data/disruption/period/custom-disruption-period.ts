import { z } from "zod";
import {
  CalendarMark,
  DisplayStringOptions,
  DisruptionPeriodBase,
} from "@/server/data/disruption/period/disruption-period-base";
import { TimeRange } from "@/server/data/disruption/period/utils/time-range";
import { DisruptedCalendarDay } from "@/server/data/disruption/period/utils/disrupted-calendar-day";
import { JustDate } from "@/server/data/disruption/period/utils/just-date";

/**
 * Allows complete customisation of active time ranges, calendar marks, and the
 * display string used.
 */
export class CustomDisruptionPeriod extends DisruptionPeriodBase {
  constructor(
    readonly timeRanges: readonly TimeRange[],
    readonly displayString: string,
    readonly calendarMarks: DisruptedCalendarDay[],
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("custom"),
      timeRanges: TimeRange.bson.array(),
      displayString: z.string(),
      calendarMarks: DisruptedCalendarDay.bson.array(),
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
      calendarMarks: this.calendarMarks.map((x) => x.toBson()),
    };
  }

  getDisplayString(_options: DisplayStringOptions): string {
    return this.displayString;
  }

  getCalendarMark(date: JustDate): CalendarMark {
    const match = this.calendarMarks.find((x) => x.date.equals(date));
    if (match == null) return "no-disruption";
    return match.eveningOnly ? "evening-only" : "all-day";
  }

  intersects(range: TimeRange): boolean {
    return this.timeRanges.some((x) => x.intersects(range));
  }

  occursAt(date: Date): boolean {
    return this.timeRanges.some((x) => x.includes(date));
  }

  getFullyEncompassingTimeRange(): TimeRange {
    return TimeRange.encompass(this.timeRanges);
  }
}
