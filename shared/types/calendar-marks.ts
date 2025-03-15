export type CalendarMark = "no-disruption" | "evening-only" | "all-day";

export type RenderedCalendarMark = {
  year: number;
  month: number;
  day: number;
  mark: CalendarMark;
};
