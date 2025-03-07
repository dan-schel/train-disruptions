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
}
