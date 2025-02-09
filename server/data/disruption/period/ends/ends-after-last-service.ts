import { z } from "zod";
import { EndsBase } from "./ends-base";

/** The disruption ends after the last service on a given date. */
export class EndsAfterLastService extends EndsBase {
  constructor(
    /** The timetable date, e.g. Sun 9 Feb is translated to 3am, Mon 10 Feb. */
    public date: Date,
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("after-last-service"),
      date: z.date(),
    })
    .transform((x) => new EndsAfterLastService(x.date));

  toBson(): z.input<typeof EndsAfterLastService.bson> {
    return {
      type: "after-last-service",
      date: this.date,
    };
  }
}
