import { getDay } from "date-fns";
import { CalendarMark } from "@/shared/types/calendar-marks";

export const dateBoxStyles: Record<CalendarMark, string> = {
  "no-disruption": "bg-calendar-cell text-calendar-on-cell",
  "evening-only":
    "bg-calendar-cell text-calendar-on-cell " +
    "border-3 border-calendar-accent",
  "all-day": "bg-calendar-accent text-calendar-on-accent",
};

export function getColumn(date: { year: number; month: number; day: number }) {
  return ((getDay(new Date(date.year, date.month - 1, date.day)) + 6) % 7) + 1;
}
