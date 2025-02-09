import { z } from "zod";
import { DisruptionDataBase } from "./disruption-data-base";

/**
 * A single station is closed. (Trains may be continuing to run express through
 * the station.)
 */
export class StationClosureDisruptionData extends DisruptionDataBase {
  constructor(readonly stationId: number) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("station-closure"),
      stationId: z.number(),
    })
    .transform((x) => new StationClosureDisruptionData(x.stationId));

  toBson(): z.input<typeof StationClosureDisruptionData.bson> {
    return {
      type: "station-closure",
      stationId: this.stationId,
    };
  }
}
