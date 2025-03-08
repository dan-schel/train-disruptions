import { format, getHours, getMinutes, isSameYear } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

const localTimezone = "Australia/Melbourne";

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

export function midnightLocalTimeAsUtc(
  year: number,
  month: number,
  day: number,
) {
  return fromZonedTime(new Date(year, month - 1, day), localTimezone);
}

export function toLocalTime(date: Date) {
  return toZonedTime(date, localTimezone);
}
