import { format, isSameYear } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { z } from "zod";

const localTimezone = "Australia/Melbourne";

/** Consider the hours of 12am-3am to belong to the previous day. */
export const dayStarts = 3;
/** Consider "evening only" to meaning the hours of 6pm-3am. */
export const eveningStarts = 18;

export function formatDate(
  date: Date,
  now: Date,
  { includeTime = true }: { includeTime?: boolean } = {},
) {
  const timeFormatCode = includeTime ? "h:mmaaa " : "";
  const yearFormatCode = isSameYear(date, now) ? "" : " yyyy";
  const localDate = toZonedTime(date, localTimezone);
  return format(localDate, `${timeFormatCode}E do MMM${yearFormatCode}`);
}

export function midnightLocalTime(date: JustDate) {
  return fromZonedTime(
    new Date(date.year, date.month - 1, date.day),
    localTimezone,
  );
}

export function toLocalTime(date: Date) {
  return toZonedTime(date, localTimezone);
}

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
}
