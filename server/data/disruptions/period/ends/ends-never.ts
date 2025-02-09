import { z } from "zod";
import { Ends } from "./ends";

/** The disruption never ends. */
export class EndsNever extends Ends {
  static readonly bson = z
    .object({
      type: z.literal("never"),
    })
    .transform((_x) => new EndsNever());

  toBson(): z.input<typeof EndsNever.bson> {
    return {
      type: "never",
    };
  }
}
