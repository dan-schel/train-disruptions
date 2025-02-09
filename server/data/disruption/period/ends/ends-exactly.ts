import { z } from "zod";
import { EndsBase } from "./ends-base";

/** The disruption ends after an exact timestamp. */
export class EndsExactly extends EndsBase {
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
