import { z } from "zod";
import {
  DisplayStringOptions,
  DisruptionPeriodBase,
} from "./disruption-period-base";
import { Ends, endsBson } from "./ends/ends";
import { CalendarMark, CalendarMarksOptions } from "./disrupted-calendar-day";
import { TimeRange } from "./time-range";
import { eveningStarts, formatDate, toLocalTime } from "./utils";

/** Disruption is active every evening from the start date to the end date. */
export class EveningsOnlyDisruptionPeriod extends DisruptionPeriodBase {
  constructor(
    readonly start: Date | null,
    readonly end: Ends,

    /** E.g. `18` for 6pm to last service each day. */
    readonly startHourEachDay: number,
  ) {
    super();

    // TODO: This is kinda dumb. Should we expand this period to cover any
    // "repeating at a certain time of day each day" disruption? What would we
    // call that lol?
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

  getCalendarMarks(options: CalendarMarksOptions): readonly CalendarMark[] {
    const endDate = this.end.getLatestInterpretableDate();
    const { from, to } = CalendarMark.restrictRangeByOptions(
      new TimeRange(this.start, endDate),
      options,
    );
    return CalendarMark.buildList(from, to).map((x) => x.eveningify());
  }

  getActiveTimeRanges(): readonly TimeRange[] {
    const startDate = toLocalTime(this.start);
    const endDate = toLocalTime(this.end.getLatestInterpretableDate());

    const result: TimeRange[] = [];
    let day = midnightLocalTime();

    return result;
  }
}
