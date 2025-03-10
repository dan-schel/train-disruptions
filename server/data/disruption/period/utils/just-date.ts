import { addDays, differenceInDays } from "date-fns";
import { z } from "zod";

export class JustDate {
  constructor(
    readonly year: number,
    readonly month: number,
    readonly day: number,
  ) {}

  static readonly bson = z
    .object({
      year: z.number(),
      month: z.number(),
      day: z.number(),
    })
    .transform((x) => new JustDate(x.year, x.month, x.day));

  toBson(): z.input<typeof JustDate.bson> {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
    };
  }

  equals(other: JustDate) {
    return (
      this.year === other.year &&
      this.month === other.month &&
      this.day === other.day
    );
  }

  add(days: number): JustDate {
    return JustDate.extractFromDate(addDays(this.toDate(), days));
  }

  /**
   * Return the number of days from the given date to this date. Will be
   * negative if the given date occurs after this one. (i.e. it calculates
   * `this - other`).
   */
  diff(other: JustDate): number {
    return differenceInDays(this.toDate(), other.toDate());
  }

  toDate(): Date {
    return new Date(this.year, this.month - 1, this.day);
  }

  static extractFromDate(date: Date): JustDate {
    return new JustDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );
  }
}
