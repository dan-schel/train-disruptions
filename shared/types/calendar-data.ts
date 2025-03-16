export type CalendarData = {
  today: { year: number; month: number; day: number };
  cells: CalendarCellData[];
};

export type CalendarCellData = {
  year: number;
  month: number;
  day: number;
  mark: CalendarMark;
};

export type CalendarMark = "no-disruption" | "evening-only" | "all-day";
