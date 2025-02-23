import { z } from "zod";

export class CalendarMark {
  constructor(
    readonly date: Date,
    readonly eveningsOnly: boolean,
  ) {}

  static readonly bson = z
    .object({
      date: z.date(),
      eveningsOnly: z.boolean(),
    })
    .transform((x) => new CalendarMark(x.date, x.eveningsOnly));

  toBson(): z.input<typeof CalendarMark.bson> {
    return {
      date: this.date,
      eveningsOnly: this.eveningsOnly,
    };
  }
}

/** Defines the period(s) of time a disruption is active. */
export abstract class DisruptionPeriodBase {
  abstract toDisplayString(): string;
  abstract getCalendarMarks(): readonly CalendarMark[];
}
