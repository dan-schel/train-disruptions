import { z } from "zod";
import { Ends } from "./ends";

/** The disruption ends on a roughly given time. */
export class EndsApproximately extends Ends {
  constructor(
    /** E.g. "late March" or "Spring 2025". */
    public displayText: string,
    /** The earliest reasonable date/time which it could be interpreted as. */
    public earliest: Date,
    /** The latest reasonable date/time which it could be interpreted as. */
    public latest: Date,
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
