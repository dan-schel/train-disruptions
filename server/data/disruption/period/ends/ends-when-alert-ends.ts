import { z } from "zod";
import { DisplayStringOptions, EndsBase } from "./ends-base";
import { format, isSameYear } from "date-fns";

/** The disruption ends when the source alert ends. */
export class EndsWhenAlertEnds extends EndsBase {
  constructor(
    /** The alert ID to track. */
    readonly alertId: string,
    /** The time the alert ends (last known, to be updated regularly). */
    readonly alertEndDate: Date,
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("when-alert-ends"),
      alertId: z.string(),
      alertEndDate: z.date(),
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
    const formatCode = isSameYear(this.alertEndDate, options.now)
      ? "h:mmaaa E do MMM"
      : "h:mmaaa E do MMM yyyy";
    return format(this.alertEndDate, formatCode);
  }

  latestInterpretableDate(): Date | null {
    return this.alertEndDate;
  }
}
