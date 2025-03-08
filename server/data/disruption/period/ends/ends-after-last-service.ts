import { z } from "zod";
import { DisplayStringOptions, EndsBase } from "./ends-base";
import { addHours } from "date-fns";
import { dayStarts, formatDate, JustDate, midnightLocalTime } from "../utils";

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
    const localMidnight = midnightLocalTime(this.date);
    return `last service ${formatDate(localMidnight, options.now, { includeTime: false })}`;
  }

  getLatestInterpretableDate(): Date | null {
    const localMidnight = midnightLocalTime(this.date);
    return addHours(localMidnight, 24 + dayStarts);
  }
}
