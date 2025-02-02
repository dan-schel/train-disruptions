import { z } from "zod";
import { DisruptionData } from "../disruption";

/**
 * A single station is closed. (Trains may be continuing to run express through
 * the station.)
 */
export class StationClosureDisruptionData extends DisruptionData<"station-closure"> {
  constructor(
    readonly stationId: number,
    readonly startsAt: Date,
    readonly endsAt: Date,
  ) {
    super("station-closure");
  }

  static readonly bson = z
    .object({
      type: z.literal("station-closure"),
      stationId: z.number(),
      startsAt: z.date(),
      endsAt: z.date(),
    })
    .transform(
      (x) =>
        new StationClosureDisruptionData(x.stationId, x.startsAt, x.endsAt),
    );

  toBson(): z.input<typeof StationClosureDisruptionData.bson> {
    return {
      type: "station-closure",
      stationId: this.stationId,
      startsAt: this.startsAt,
      endsAt: this.endsAt,
    };
  }
}
