import { z } from "zod";
import { date } from "./utils";

export class JustDate {
  constructor(
    readonly year: number,
    readonly month: number,
    readonly day: number,
  ) {}

  static readonly bson = z
    .object({
      year: z.number(),
      month: z.number(),
      day: z.number(),
    })
    .transform((x) => new JustDate(x.year, x.month, x.day));

  toBson(): z.input<typeof JustDate.bson> {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
    };
  }

  equals(other: JustDate) {
    return (
      this.year === other.year &&
      this.month === other.month &&
      this.day === other.day
    );
  }

  toDate(): Date {
    return date(this.year, this.month, this.day);
  }
}
