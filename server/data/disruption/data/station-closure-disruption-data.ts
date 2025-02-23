import { z } from "zod";
import { DisruptionDataBase } from "./disruption-data-base";
import { DisruptionWriteupAuthor } from "../writeup/disruption-writeup-author";
import { StationClosureDisruptionWriteupAuthor } from "../writeup/station-closure-disruption-writeup-author";
import { RouteGraphModifier } from "../route-graph-modifier/route-graph-modifier";
import { StationClosureRouteGraphModifier } from "../route-graph-modifier/station-closure-route-graph-modifier";

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

  getImpactedLines(): readonly number[] {
    // TODO: lines.whichStopAt(this._data.stationId);
    return [];
  }

  getWriteupAuthor(): DisruptionWriteupAuthor {
    return new StationClosureDisruptionWriteupAuthor(this);
  }

  getRouteGraphModifier(): RouteGraphModifier {
    return new StationClosureRouteGraphModifier(this.stationId);
  }
}
