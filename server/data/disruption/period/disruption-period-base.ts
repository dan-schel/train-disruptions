import { z } from "zod";
import { TimeRange } from "./time-range";

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
   * Returns true if the disruption is relevant at any point within the given
   * time range.
   */
  abstract intersects(start: Date, end: Date): boolean;

  /** Returns true if the disruption is relevant at this time. */
  abstract occursAt(date: Date): boolean;

  /**
   * Returns the earliest possible date and latest possible date this disruption
   * is relevant for, if known. The disruption is NOT necessarily active during
   * the entire time range.
   */
  abstract getFullyEncompassingTimeRange(): TimeRange;
}
