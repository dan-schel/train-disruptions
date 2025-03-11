import { z } from "zod";
import {
  DisplayStringOptions,
  EndsBase,
} from "@/server/data/disruption/period/ends/ends-base";
import { formatDate } from "@/server/data/disruption/period/utils/utils";

/** The disruption ends after an exact timestamp. */
export class EndsExactly extends EndsBase {
  constructor(readonly date: Date) {
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

  getDisplayString(options: DisplayStringOptions): string {
    return formatDate(this.date, options.now);
  }

  getLatestInterpretableDate(): Date | null {
    return this.date;
  }
}
