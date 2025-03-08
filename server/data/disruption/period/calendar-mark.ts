import { z } from "zod";

export class CalendarMark {
  constructor(
    readonly year: number,
    readonly month: number,
    readonly day: number,
    readonly eveningsOnly: boolean,
  ) {}

  static readonly bson = z
    .object({
      year: z.number(),
      month: z.number(),
      day: z.number(),
      eveningsOnly: z.boolean(),
    })
    .transform((x) => new CalendarMark(x.year, x.month, x.day, x.eveningsOnly));

  toBson(): z.input<typeof CalendarMark.bson> {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
      eveningsOnly: this.eveningsOnly,
    };
  }
}
