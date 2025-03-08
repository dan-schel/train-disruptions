import { TimeRange } from "./time-range";
import { CalendarMark } from "./calendar-mark";

/** Defines the period(s) of time a disruption is active. */
export abstract class DisruptionPeriodBase {
  /**
   * Returns a string that explains this period, e.g. "each evening Fri 7 Mar
   * until last service Sun 9 Mar".
   */
  abstract toDisplayString(): string;

  /** How/when to mark the calendar for this disruption. */
  abstract getCalendarMarks(): readonly CalendarMark[];

  /**
   * Returns all the time ranges when the disruption should be displayed as
   * active. We do NOT infer calendar marks and/or the display string from this
   * value to allow it to be as granular as needed without impacting the
   * presentation elsewhere.
   */
  abstract getActiveTimeRanges(): readonly TimeRange[];

  intersects(start: Date, end: Date): boolean {}

  occursAt(date: Date): boolean {}

  getFullyEncompassingTimeRange(): TimeRange {}
}
