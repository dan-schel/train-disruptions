import { z } from "zod";
import { EndsBase } from "./ends-base";

/** The disruption ends sometime between two implied dates, e.g. "late March". */
export class EndsApproximately extends EndsBase {
  constructor(
    /** E.g. "late March" or "Spring 2025". */
    readonly displayText: string,
    /** The earliest reasonable date/time which it could be interpreted as. */
    readonly earliest: Date,
    /** The latest reasonable date/time which it could be interpreted as. */
    readonly latest: Date,
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("approximately"),
      displayText: z.string(),
      earliest: z.date(),
      latest: z.date(),
    })
    .transform(
      (x) => new EndsApproximately(x.displayText, x.earliest, x.latest),
    );

  toBson(): z.input<typeof EndsApproximately.bson> {
    return {
      type: "approximately",
      displayText: this.displayText,
      earliest: this.earliest,
      latest: this.latest,
    };
  }
}
