import { z } from "zod";
import {
  CalendarMark,
  DisplayStringOptions,
  DisruptionPeriodBase,
} from "./disruption-period-base";
import { Ends, endsBson } from "./ends/ends";
import {
  dayStarts,
  eveningStarts,
  formatDate,
  localToUtcTime,
  utcToLocalTime,
} from "./utils/utils";
import { TimeRange } from "./utils/time-range";
import { JustDate } from "./utils/just-date";
import { addHours, isSameDay, setHours, startOfHour } from "date-fns";
import { hour24To12 } from "@dan-schel/js-utils";

/** Disruption is active every evening from the start date to the end date. */
export class EveningsOnlyDisruptionPeriod extends DisruptionPeriodBase {
  constructor(
    readonly start: Date | null,
    readonly end: Ends,

    /** E.g. `18` for 6pm to last service each day. */
    readonly startHourEachDay: number,
  ) {
    super();

    // TODO: This is fairly limiting. Maybe in future we should expand this
    // period type to cover any "repeating at a certain time of day each day"
    // period. We'd obviously need to find a name for it though, lol.
    if (
      !Number.isInteger(startHourEachDay) ||
      startHourEachDay < eveningStarts ||
      startHourEachDay >= 24
    ) {
      throw new Error(
        `Invalid start hour each day: ${startHourEachDay}. Must be an integer ` +
          `between ${eveningStarts} and 23.`,
      );
    }
  }

  static readonly bson = z
    .object({
      type: z.literal("evenings-only"),
      start: z.date().nullable(),
      end: endsBson,
      startHourEachDay: z.number(),
    })
    .transform(
      (x) =>
        new EveningsOnlyDisruptionPeriod(x.start, x.end, x.startHourEachDay),
    );

  toBson(): z.input<typeof EveningsOnlyDisruptionPeriod.bson> {
    return {
      type: "evenings-only",
      start: this.start,
      end: this.end.toBson(),
      startHourEachDay: this.startHourEachDay,
    };
  }

  getDisplayString(options: DisplayStringOptions): string {
    // TODO: This is bit awkward because the start/end dates can include times.
    // Should we change EveningsOnlyDisruptionPeriods to only take JustDates in
    // the future? Maybe if we split the concept of EveningsOnlyDisruptionPeriod
    // with the "repeating at a certain time of day each day" type, we can make
    // EveningsOnlyDisruptionPeriods more specialized (only take JustDates).

    const { hour, half } = hour24To12(this.startHourEachDay);
    const hourStr = `${hour}${half} to last service each night`;

    const endStr = this.end.getDisplayString({ now: options.now });

    if (this.start != null) {
      const startStr = formatDate(this.start, options.now);
      return `${hourStr}, starting ${startStr} until ${endStr}`;
    } else {
      return `${hourStr} until ${endStr}`;
    }
  }

  getCalendarMark(date: JustDate): CalendarMark {
    const local12am = date.toDate();
    const startOfEvening = localToUtcTime(addHours(local12am, eveningStarts));
    const startOfTomorrow = localToUtcTime(addHours(local12am, dayStarts + 24));

    const fullDisruptionPeriod = this.getFullyEncompassingTimeRange();
    const evening = new TimeRange(startOfEvening, startOfTomorrow);
    const impacted = fullDisruptionPeriod.intersects(evening);

    return impacted ? "evening-only" : "no-disruption";
  }

  intersects(range: TimeRange): boolean {
    // Reject if outside the disruption period.
    if (!this.getFullyEncompassingTimeRange().intersects(range)) return false;

    // Because the fully encompassing time range is trimmed to always start and
    // end during the evening period, and we now know this time range intersects
    // it somewhere, if it extends infinitely in either direction will ALWAYS
    // intersect.
    if (range.start == null || range.end == null) return true;

    // Reject if entirely outside the evening period.
    const localStart = utcToLocalTime(range.start);
    const localEnd = utcToLocalTime(range.end);
    if (
      isSameDay(localStart, localEnd) &&
      localStart.getHours() >= dayStarts &&
      localEnd <= setHours(startOfHour(localEnd), this.startHourEachDay)
    ) {
      return false;
    }

    // Otherwise, it intersects.
    return true;
  }

  occursAt(date: Date): boolean {
    const range = this.getFullyEncompassingTimeRange();
    if (!range.includes(date)) return false;

    const localHour = utcToLocalTime(date).getHours();
    return localHour >= this.startHourEachDay || localHour < dayStarts;
  }

  getFullyEncompassingTimeRange(): TimeRange {
    return new TimeRange(
      this._getCorrectedStartDate(),
      this._getCorrectedEndDate(),
    );
  }

  /**
   * Returns `this.start()`, unless it falls outside the evening period, in
   * which case it is moved forward to the start of the next evening period to
   * more accurately reflect the first moment ACTUALLY impacted by the
   * disruption.
   *
   * e.g. If the disruption is said to start at 10am, it gets trimmed forward to
   * `this.startHourEachDay` (let's say 8pm), since 10am-8pm is already excluded
   * since it's not during the evening!
   */
  private _getCorrectedStartDate(): Date | null {
    if (this.start == null) return null;

    const localHour = utcToLocalTime(this.start).getHours();
    if (localHour < dayStarts || localHour >= this.startHourEachDay) {
      return this.start;
    } else {
      const localTime = utcToLocalTime(this.start);
      const adjusted = setHours(startOfHour(localTime), this.startHourEachDay);
      return localToUtcTime(adjusted);
    }
  }

  /**
   * Returns `this.end.getLatestInterpretableDate()`, unless it falls outside
   * the evening period, in which case it is moved backward to the end of the
   * previous evening period to more accurately reflect the ACTUAL end time of
   * the disruption.
   *
   * e.g. If the disruption is said to end at 10am, it gets trimmed back to 3am,
   * since 3am-10am is already excluded since it's not during the evening!
   */
  private _getCorrectedEndDate(): Date | null {
    const end = this.end.getLatestInterpretableDate();
    if (end == null) return null;

    const localHour = utcToLocalTime(end).getHours();
    if (localHour < dayStarts || localHour >= this.startHourEachDay) {
      return end;
    } else {
      const localTime = utcToLocalTime(end);
      const adjusted = setHours(startOfHour(localTime), dayStarts);
      return localToUtcTime(adjusted);
    }
  }
}
