export type CalendarMark = "no-disruption" | "evening-only" | "all-day";

export type CalendarCellData = {
  year: number;
  month: number;
  day: number;
  mark: CalendarMark;
};

export type CalendarData = {
  today: { year: number; month: number; day: number };
  cells: CalendarCellData[];
};
