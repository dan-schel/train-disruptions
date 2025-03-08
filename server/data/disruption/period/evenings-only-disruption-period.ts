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
import { addHours } from "date-fns";

/** Disruption is active every evening from the start date to the end date. */
export class EveningsOnlyDisruptionPeriod extends DisruptionPeriodBase {
  constructor(
    readonly start: Date | null,
    readonly end: Ends,

    /** E.g. `18` for 6pm to last service each day. */
    readonly startHourEachDay: number,
  ) {
    super();

    // TODO: This is kinda dumb. Maybe in future we should expand this period
    // type to cover any "repeating at a certain time of day each day" period.
    // We'd obviously need to find a name for it though, lol.
    if (startHourEachDay < eveningStarts) {
      throw new Error(
        `Cannot create evenings only period with start hour of ` +
          `${startHourEachDay}, as we consider evening to start at ` +
          `${eveningStarts}.`,
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
    const endStr = this.end.getDisplayString({ now: options.now });

    if (this.start != null) {
      const startStr = formatDate(this.start, options.now);
      return `${startStr} until ${endStr}`;
    } else {
      return `until ${endStr}`;
    }
  }

  getCalendarMark(date: JustDate): CalendarMark {
    // TODO: If this.startHourEachDay is 21, and _rawTimeRange() goes until 8pm
    // for whatever reason, this probably doesn't work. We probably need to
    // switch to use getFullyEncompassingTimeRange() instead of _rawTimeRange()
    // to fix. (Be sure to write a test for this case!)
    //
    // It might possibly also work to use this.startHourEachDay instead of the
    // eveningStarts const? Not sure why I think that though, but it doesn't
    // make intuitive sense. Probably too confusing even if it does work!

    const local12am = date.toDate();
    const startOfEvening = localToUtcTime(addHours(local12am, eveningStarts));
    const startOfTomorrow = localToUtcTime(addHours(local12am, dayStarts + 24));

    const rawDisruptionPeriod = this._rawTimeRange();
    const evening = new TimeRange(startOfEvening, startOfTomorrow);
    const impacted = rawDisruptionPeriod.intersects(evening);

    return impacted ? "evening-only" : "no-disruption";
  }

  intersects(range: TimeRange): boolean {
    throw new Error("Method not implemented.");
  }

  occursAt(date: Date): boolean {
    const range = this._rawTimeRange();
    if (!range.includes(date)) return false;

    const localHour = utcToLocalTime(date).getHours();
    return localHour >= this.startHourEachDay || localHour < dayStarts;
  }

  getFullyEncompassingTimeRange(): TimeRange {
    // TODO: Start with _rawTimeRange(), and trim off anything on the left/right
    // outside the evening hours.
    throw new Error("Method not implemented.");
  }

  private _rawTimeRange(): TimeRange {
    return new TimeRange(this.start, this.end.getLatestInterpretableDate());
  }
}
