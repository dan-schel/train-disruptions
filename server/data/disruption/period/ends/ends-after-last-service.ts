import { z } from "zod";
import { DisplayStringOptions, EndsBase } from "./ends-base";
import { addHours, format, isSameYear } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

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
    const date = new Date(this.year, this.month - 1, this.day);
    const formatCode = isSameYear(date, options.now)
      ? "E do MMM"
      : "E do MMM yyyy";
    const formattedDate = format(date, formatCode);
    return `last service ${formattedDate}`;
  }

  latestInterpretableDate(): Date | null {
    const date = new Date(this.year, this.month - 1, this.day);
    const nextDay3am = addHours(date, 24 + lastServiceHour);
    return fromZonedTime(nextDay3am, "Australia/Melbourne");
  }
}
