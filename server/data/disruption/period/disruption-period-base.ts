import { TimeRange } from "./time-range";
import { JustDate } from "./utils";

export type DisplayStringOptions = {
  now: Date;
};

export type CalendarMark = "no-disruption" | "evening-only" | "all-day";

/** Defines the period(s) of time a disruption is active. */
export abstract class DisruptionPeriodBase {
  /**
   * Returns a string that explains this period, e.g. "each evening Fri 7 Mar
   * until last service Sun 9 Mar".
   */
  abstract getDisplayString(options: DisplayStringOptions): string;

  /** How to mark the calendar for this date and this disruption. */
  abstract getCalendarMark(date: JustDate): CalendarMark;

  // It looks like these next three functions can be calculated from one
  // function that returns all time ranges this disruptions occurs in.
  // They CANNOT. The EveningsOnlyDisruptionPeriod with EndsNever will have
  // infinitely many time ranges, because it can't simply use a null end date,
  // because it DOES end, at 3am each day for an INFINITELY many number of days.
  // Furthermore, passing the full query details (which date to start and end)
  // sucked for get calendar marks, so I'm happy we're not doing that no more.

  abstract intersects(range: TimeRange): boolean;

  abstract occursAt(date: Date): boolean;

  abstract getFullyEncompassingTimeRange(): TimeRange;
}
