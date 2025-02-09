import { z } from "zod";
import { Ends } from "./ends";

/** The disruption ends after an exact timestamp. */
export class EndsExactly extends Ends {
  constructor(public date: Date) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("exactly"),
      date: z.date(),
    })
    .transform((x) => new EndsExactly(x.date));

  toBson(): z.input<typeof EndsExactly.bson> {
    return {
      type: "exactly",
      date: this.date,
    };
  }
}
