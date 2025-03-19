import { DisruptionPeriod } from "@/server/data/disruption/period/disruption-period";
import { JustDate } from "@/server/data/disruption/period/utils/just-date";
import { utcToLocalTime } from "@/server/data/disruption/period/utils/utils";
import { CalendarMark, CalendarData } from "@/shared/types/calendar-data";
import { range } from "@dan-schel/js-utils";
import { startOfDay, addDays } from "date-fns";

/** How many days to render into the future on the <Calendar> component. */
export const daysToRenderOnCalendar = 28;

export function createCalendarData(
  periods: DisruptionPeriod[],
  now: Date,
): CalendarData {
  const today = startOfDay(utcToLocalTime(now));

  const cells = range(0, daysToRenderOnCalendar).map((i) => {
    const date = JustDate.extractFromDate(addDays(today, i));
    const marks = periods.map((x) => x.getCalendarMark(date));
    return {
      year: date.year,
      month: date.month,
      day: date.day,
      mark: getWorstMark(marks),
    };
  });

  return {
    today: JustDate.extractFromDate(today).toBson(),
    cells,
  };
}

function getWorstMark(marks: CalendarMark[]): CalendarMark {
  if (marks.some((x) => x === "all-day")) return "all-day";
  if (marks.some((x) => x === "evening-only")) return "evening-only";
  return "no-disruption";
}
