import { z } from "zod";
import {
  dayStarts,
  eveningStarts,
  midnightLocalTime,
  toLocalTime,
} from "./utils";
import {
  addDays,
  addHours,
  areIntervalsOverlapping,
  interval,
  isWithinInterval,
  max,
  min,
  startOfDay,
} from "date-fns";
import { TimeRange } from "./time-range";

export type CalendarMarksOptions = {
  fromDate: {
    year: number;
    month: number;
    day: number;
  };
  maxDays: number;
};

export class CalendarMark {
  constructor(
    readonly year: number,
    readonly month: number,
    readonly day: number,
    readonly eveningOnly: boolean,
  ) {}

  static readonly bson = z
    .object({
      year: z.number(),
      month: z.number(),
      day: z.number(),
      eveningOnly: z.boolean(),
    })
    .transform((x) => new CalendarMark(x.year, x.month, x.day, x.eveningOnly));

  toBson(): z.input<typeof CalendarMark.bson> {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
      eveningOnly: this.eveningOnly,
    };
  }

  evenify(): CalendarMark {
    return new CalendarMark(this.year, this.month, this.day, true);
  }

  matchesRestriction(options: CalendarMarksOptions) {
    // TODO: [DS] I think I should make CalendarMarksOptions it's own class.
    const minDate = midnightLocalTime(options.fromDate);
    const maxDate = addDays(minDate, options.maxDays);
    const myDate = midnightLocalTime(this);
    return isWithinInterval(myDate, { start: minDate, end: maxDate });
  }

  static buildList(from: Date, to: Date): CalendarMark[] {
    if (from >= to) throw new Error("Invalid date range.");

    const fromLocal = toLocalTime(from);
    const toLocal = toLocalTime(to);
    const period = interval(fromLocal, toLocal);

    const marks: CalendarMark[] = [];
    let today12am = startOfDay(fromLocal);

    while (today12am < toLocal) {
      const startOfToday = addHours(today12am, dayStarts);
      const startOfEvening = addHours(today12am, eveningStarts);
      const startOfTomorrow = addHours(today12am, dayStarts + 24);

      const today = interval(startOfToday, startOfTomorrow);
      const overlaps = areIntervalsOverlapping(period, today);

      if (overlaps) {
        const outsideEvening = interval(startOfToday, startOfEvening);
        const eveningOnly = !areIntervalsOverlapping(period, outsideEvening);

        marks.push(
          new CalendarMark(
            today12am.getFullYear(),
            today12am.getMonth() + 1,
            today12am.getDate(),
            eveningOnly,
          ),
        );
      }

      today12am = addDays(today12am, 1);
    }

    return marks;
  }

  static restrictRangeByOptions(
    range: TimeRange,
    options: CalendarMarksOptions,
  ) {
    const minDate = addHours(midnightLocalTime(options.fromDate), dayStarts);
    const maxDate = addDays(minDate, options.maxDays);

    return {
      from: range.start == null ? minDate : max([minDate, range.start]),
      to: range.end == null ? maxDate : min([maxDate, range.end]),
    };
  }
}
