import { DisruptionPeriod } from "@/server/data/disruption/period/disruption-period";
import { JustDate } from "@/server/data/disruption/period/utils/just-date";
import { utcToLocalTime } from "@/server/data/disruption/period/utils/utils";
import {
  CalendarMark,
  RenderedCalendarMark,
} from "@/shared/types/calendar-marks";
import { startOfDay, addDays } from "date-fns";

/** How many days to render in the future on the <Calendar> component. */
export const daysToRenderOnCalendar = 28;

export function renderCalendarMarks(
  periods: DisruptionPeriod[],
  now: Date,
): RenderedCalendarMark[] {
  const result: RenderedCalendarMark[] = [];
  const today = startOfDay(utcToLocalTime(now));

  for (let i = 0; i < daysToRenderOnCalendar; i++) {
    const date = JustDate.extractFromDate(addDays(today, i));
    const marks = periods.map((x) => x.getCalendarMark(date));
    result.push({
      year: date.year,
      month: date.month,
      day: date.day,
      mark: getWorstMark(marks),
    });
  }

  return result;
}

function getWorstMark(marks: CalendarMark[]): CalendarMark {
  if (marks.some((x) => x === "all-day")) return "all-day";
  if (marks.some((x) => x === "evening-only")) return "evening-only";
  return "no-disruption";
}
