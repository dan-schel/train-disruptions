import { z } from "zod";
import { DisplayStringOptions, EndsBase } from "./ends-base";
import { addHours } from "date-fns";
import { dayStarts, formatDate, localToUtcTime } from "../utils/utils";
import { JustDate } from "../utils/just-date";

/** The disruption ends after the last service on a given date. */
export class EndsAfterLastService extends EndsBase {
  constructor(readonly date: JustDate) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("after-last-service"),
      date: JustDate.bson,
    })
    .transform((x) => new EndsAfterLastService(x.date));

  toBson(): z.input<typeof EndsAfterLastService.bson> {
    return {
      type: "after-last-service",
      date: this.date.toBson(),
    };
  }

  getDisplayString(options: DisplayStringOptions): string {
    const midnightInUtc = localToUtcTime(this.date.toDate());
    return `last service ${formatDate(midnightInUtc, options.now, { includeTime: false })}`;
  }

  getLatestInterpretableDate(): Date | null {
    const midnightInUtc = localToUtcTime(this.date.toDate());
    return addHours(midnightInUtc, 24 + dayStarts);
  }
}
