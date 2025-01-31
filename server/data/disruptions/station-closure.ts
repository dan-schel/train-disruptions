import { z } from "zod";
import { DisruptionData } from "../disruption";

/**
 * A single station is closed. (Trains may be continuing to run express through
 * the station.)
 */
export class StationClosureDisruptionData extends DisruptionData<"station-closed"> {
  constructor(
    readonly stationId: number,
    readonly startsAt: Date,
    readonly endsAt: Date,
  ) {
    super("station-closed");
  }

  static readonly bson = z
    .object({
      type: z.literal("station-closed"),
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
      type: "station-closed",
      stationId: this.stationId,
      startsAt: this.startsAt,
      endsAt: this.endsAt,
    };
  }
}
