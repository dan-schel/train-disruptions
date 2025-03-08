import { z } from "zod";
import { toLocalTime } from "./utils";
import {
  addDays,
  addHours,
  areIntervalsOverlapping,
  interval,
  startOfDay,
} from "date-fns";

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

  static create(from: Date, to: Date): CalendarMark[] {
    if (from >= to) throw new Error("Invalid date range.");

    const fromLocal = toLocalTime(from);
    const toLocal = toLocalTime(to);
    const period = interval(fromLocal, toLocal);

    const marks: CalendarMark[] = [];
    let today12am = startOfDay(fromLocal);

    while (today12am < toLocal) {
      const today3am = addHours(today12am, 3);
      const today6pm = addHours(today12am, 18);
      const tomorrow3am = addHours(today12am, 27);

      const day = interval(today3am, tomorrow3am);
      const overlaps = areIntervalsOverlapping(period, day);

      if (overlaps) {
        const outsideEvening = interval(today3am, today6pm);
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
}
