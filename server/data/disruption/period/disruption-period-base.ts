import { JustDate } from "@/server/data/disruption/period/utils/just-date";
import { TimeRange } from "@/server/data/disruption/period/utils/time-range";
import { CalendarMark } from "@/shared/types/calendar-data";

export type DisplayStringOptions = {
  now: Date;
};

/** Defines the period(s) of time a disruption is active. */
export abstract class DisruptionPeriodBase {
  /**
   * Returns a string that explains this period, e.g. "each evening Fri 7 Mar
   * until last service Sun 9 Mar".
   */
  abstract getDisplayString(options: DisplayStringOptions): string;

  /** How to mark the calendar for this date and this disruption. */
  abstract getCalendarMark(date: JustDate): CalendarMark;

  /** True if the disruption occurs at any point within this time range. */
  abstract intersects(range: TimeRange): boolean;

  /** True if the disruptions occurs at this specific point in time. */
  abstract occursAt(date: Date): boolean;

  /** The earliest and latest time impacted by the disruption, if defined. */
  abstract getFullyEncompassingTimeRange(): TimeRange;
}
