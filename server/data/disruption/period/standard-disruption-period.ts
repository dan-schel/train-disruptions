import { z } from "zod";
import { Ends, endsBson } from "./ends/ends";
import { CalendarMark } from "./calendar-mark";
import { TimeRange } from "./time-range";
import {
  CalendarMarksOptions,
  DisplayStringOptions,
  DisruptionPeriodBase,
} from "./disruption-period-base";
import { formatDate, midnightLocalTimeAsUtc } from "./utils";
import { addDays, max, min } from "date-fns";

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
      return options.capitalize ? `Until ${endStr}` : `until ${endStr}`;
    }
  }

  getCalendarMarks(options: CalendarMarksOptions): readonly CalendarMark[] {
    const minDate = midnightLocalTimeAsUtc(
      options.fromDate.year,
      options.fromDate.month,
      options.fromDate.day,
    );
    const maxDate = addDays(minDate, options.maxDays);

    const knownStart = this.start;
    const knownEnd = this.end.getLatestInterpretableDate();

    const start = knownStart == null ? minDate : max([minDate, knownStart]);
    const end = knownEnd == null ? maxDate : min([knownEnd, maxDate]);
    return CalendarMark.create(start, end);
  }

  getActiveTimeRanges(): readonly TimeRange[] {
    const endDate = this.end.getLatestInterpretableDate();
    return [new TimeRange(this.start, endDate)];
  }
}
