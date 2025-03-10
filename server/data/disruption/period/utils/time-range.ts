import { z } from "zod";

/** A start date and end date. */
export class TimeRange {
  constructor(
    readonly start: Date | null,
    readonly end: Date | null,
  ) {}

  static readonly bson = z
    .object({
      start: z.date().nullable(),
      end: z.date().nullable(),
    })
    .transform((x) => new TimeRange(x.start, x.end));

  toBson(): z.input<typeof TimeRange.bson> {
    return {
      start: this.start,
      end: this.end,
    };
  }

  includes(date: Date): boolean {
    if (this.start !== null && date < this.start) return false;
    if (this.end !== null && date >= this.end) return false;
    return true;
  }

  intersects(other: TimeRange): boolean {
    if (this.start !== null && other.end !== null && this.start >= other.end)
      return false;
    if (this.end !== null && other.start !== null && this.end <= other.start)
      return false;
    return true;
  }

  static encompass(ranges: readonly TimeRange[]): TimeRange {
    if (ranges.length === 0) throw new Error("Must have at least one range.");

    const start = ranges.reduce<Date | null>((acc, x) => {
      if (acc == null || x.start === null) return null;
      if (x.start < acc) return x.start;
      return acc;
    }, ranges[0].start);

    const end = ranges.reduce<Date | null>((acc, x) => {
      if (acc == null || x.end === null) return null;
      if (x.end > acc) return x.end;
      return acc;
    }, ranges[0].end);

    return new TimeRange(start, end);
  }
}
