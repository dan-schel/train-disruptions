import { z } from "zod";
import { toLocalTime } from "./utils";
import { addDays, getDate, getMonth, getYear, startOfDay } from "date-fns";

export class CalendarMark {
  // Only mark on the calendar as "evenings only" if the disruption exclusively
  // occurs between 6pm - 4am.
  static readonly eveningStartHour = 18;
  static readonly eveningEndHour = 28;

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
    const fromLocal = toLocalTime(from);
    const toLocal = toLocalTime(to);

    const marks: CalendarMark[] = [];
    let day = startOfDay(fromLocal); // TODO: need to test this.
    for (let i = 0; day <= toLocal; i++) {
      // TODO: This is definitely wrong.
      const eveningOnly =
        day.getHours() >= CalendarMark.eveningStartHour &&
        day.getHours() < CalendarMark.eveningEndHour;

      marks.push(
        new CalendarMark(
          getYear(day),
          getMonth(day),
          getDate(day),
          eveningOnly,
        ),
      );

      day = addDays(day, 1);
    }
    return marks;
  }
}
