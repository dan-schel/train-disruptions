import { z } from "zod";
import { JustDate } from "./utils";

export class DisruptedCalendarDay {
  constructor(
    readonly date: JustDate,
    readonly eveningOnly: boolean,
  ) {}

  static readonly bson = z
    .object({
      date: JustDate.bson,
      eveningOnly: z.boolean(),
    })
    .transform((x) => new DisruptedCalendarDay(x.date, x.eveningOnly));

  toBson(): z.input<typeof DisruptedCalendarDay.bson> {
    return {
      date: this.date.toBson(),
      eveningOnly: this.eveningOnly,
    };
  }
}
