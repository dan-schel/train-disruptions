import { z } from "zod";
import { DisruptionDataBase } from "@/server/data/disruption/data/disruption-data-base";
import { DisruptionWriteupAuthor } from "@/server/data/disruption/writeup/disruption-writeup-author";
import { StationClosureDisruptionWriteupAuthor } from "@/server/data/disruption/writeup/station-closure-disruption-writeup-author";
import { RouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/route-graph-modifier";
import { StationClosureRouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/station-closure-route-graph-modifier";
import { App } from "@/server/app";

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

  getImpactedLines(app: App): readonly number[] {
    return app.lines.whichStopAt(this.stationId).map((x) => x.id);
  }

  getWriteupAuthor(): DisruptionWriteupAuthor {
    return new StationClosureDisruptionWriteupAuthor(this);
  }

  getRouteGraphModifier(): RouteGraphModifier {
    return new StationClosureRouteGraphModifier(this.stationId);
  }
}
