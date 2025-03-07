import { z } from "zod";
import { DisplayStringOptions, EndsBase } from "./ends-base";
import { format, isSameYear } from "date-fns";

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
    const formatCode = isSameYear(this.date, options.now)
      ? "h:mmaaa E do MMM"
      : "h:mmaaa E do MMM yyyy";
    return format(this.date, formatCode);
  }

  latestInterpretableDate(): Date | null {
    return this.date;
  }
}
