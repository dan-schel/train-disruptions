import { z } from "zod";
import {
  DisplayStringOptions,
  EndsBase,
} from "@/server/data/disruption/period/ends/ends-base";
import { formatDate } from "@/server/data/disruption/period/utils/utils";

/** The disruption ends when the source alert ends. */
export class EndsWhenAlertEnds extends EndsBase {
  constructor(
    /** The alert ID to track. */
    readonly alertId: string,
    /** The time the alert ends (last known, to be updated regularly). */
    readonly alertEndDate: Date | null,
    // TODO: Need a scheduled job to update this regularly.
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("when-alert-ends"),
      alertId: z.string(),
      alertEndDate: z.date().nullable(),
    })
    .transform((x) => new EndsWhenAlertEnds(x.alertId, x.alertEndDate));

  toBson(): z.input<typeof EndsWhenAlertEnds.bson> {
    return {
      type: "when-alert-ends",
      alertId: this.alertId,
      alertEndDate: this.alertEndDate,
    };
  }

  getDisplayString(options: DisplayStringOptions): string {
    if (this.alertEndDate == null) return "further notice";
    return formatDate(this.alertEndDate, options.now);
  }

  getLatestInterpretableDate(): Date | null {
    return this.alertEndDate;
  }
}
