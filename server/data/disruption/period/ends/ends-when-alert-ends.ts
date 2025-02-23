import { z } from "zod";
import { EndsBase } from "./ends-base";

/** The disruption ends when the source alert ends. */
export class EndsWhenAlertEnds extends EndsBase {
  constructor(
    /** The alert ID to track. */
    readonly alertId: string,
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("when-alert-ends"),
      alertId: z.string(),
    })
    .transform((x) => new EndsWhenAlertEnds(x.alertId));

  toBson(): z.input<typeof EndsWhenAlertEnds.bson> {
    return {
      type: "when-alert-ends",
      alertId: this.alertId,
    };
  }
}
