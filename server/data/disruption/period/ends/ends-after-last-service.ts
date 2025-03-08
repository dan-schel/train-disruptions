import { z } from "zod";
import { DisplayStringOptions, EndsBase } from "./ends-base";
import { addHours } from "date-fns";
import { formatDate, midnightLocalTime } from "../utils";

/** Consider "last service" to mean 3am the next day. */
const lastServiceHour = 3;

/** The disruption ends after the last service on a given date. */
export class EndsAfterLastService extends EndsBase {
  constructor(
    readonly year: number,
    readonly month: number,
    readonly day: number,
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("after-last-service"),
      year: z.number(),
      month: z.number(),
      day: z.number(),
    })
    .transform((x) => new EndsAfterLastService(x.year, x.month, x.day));

  toBson(): z.input<typeof EndsAfterLastService.bson> {
    return {
      type: "after-last-service",
      year: this.year,
      month: this.month,
      day: this.day,
    };
  }

  getDisplayString(options: DisplayStringOptions): string {
    const localMidnight = midnightLocalTime(this);
    return `last service ${formatDate(localMidnight, options.now, { includeTime: false })}`;
  }

  getLatestInterpretableDate(): Date | null {
    const localMidnight = midnightLocalTime(this);
    return addHours(localMidnight, 24 + lastServiceHour);
  }
}
