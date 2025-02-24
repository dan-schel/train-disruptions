import { z } from "zod";
import { CalendarMark, DisruptionPeriodBase } from "./disruption-period-base";

/** A start date and end date. */
class TimeRange {
  constructor(
    readonly start: Date,
    readonly end: Date,
  ) {}

  static readonly bson = z
    .object({
      start: z.date(),
      end: z.date(),
    })
    .transform((x) => new TimeRange(x.start, x.end));

  toBson(): z.input<typeof TimeRange.bson> {
    return {
      start: this.start,
      end: this.end,
    };
  }
}

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

  toDisplayString(): string {
    return this.displayString;
  }

  getCalendarMarks(): readonly CalendarMark[] {
    return this.calendarMarks;
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
}
