import { z } from "zod";
import { Ends } from "./ends";

/** The disruption ends when the source alert ends. */
export class EndsWhenAlertEnds extends Ends {
  constructor(
    /** The alert ID to track. */
    public alertId: string,
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
