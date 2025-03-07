import { z } from "zod";
import { DisplayStringOptions, EndsBase } from "./ends-base";

/** The disruption has no known end date. */
export class EndsNever extends EndsBase {
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

  getDisplayString(_options: DisplayStringOptions): string {
    return "further notice";
  }

  latestInterpretableDate(): Date | null {
    return null;
  }
}
