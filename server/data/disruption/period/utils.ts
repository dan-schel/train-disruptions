import { format, isSameYear } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

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

export function midnightLocalTime({
  year,
  month,
  day,
}: {
  year: number;
  month: number;
  day: number;
}) {
  return fromZonedTime(new Date(year, month - 1, day), localTimezone);
}

export function toLocalTime(date: Date) {
  return toZonedTime(date, localTimezone);
}
