import { z } from "zod";
import {
  DisruptionDataBase,
  LineStatusIndicatorPriority,
} from "./disruption-data-base";
import { RouteGraphImplications } from "../../route-graph/route-graph-implications";
import { DisruptionWriteupAuthor } from "../writeup/disruption-writeup-author";
import { StationClosureDisruptionWriteupAuthor } from "../writeup/station-closure-disruption-writeup-author";

/**
 * A single station is closed. (Trains may be continuing to run express through
 * the station.)
 */
export class StationClosureDisruptionData extends DisruptionDataBase {
  constructor(readonly stationId: number) {
    super();
  }

  getWriteupAuthor(): DisruptionWriteupAuthor {
    return new StationClosureDisruptionWriteupAuthor(this);
  }

  getRouteGraphImplications(): RouteGraphImplications {
    // TEMPORARY: A station closure will affect routing. We should remove all
    // edges that connect to this station, and add edges that bypass it.
    return RouteGraphImplications.none;

    // TODO: Just defining which edges to add/remove doesn't work great if two
    // station closures occur right next to each other.
    //
    // Imagine we normally have: A---B---C---D
    // If B is closed, we'll get: remove A-B, remove B-C, add A-C.
    // If C is closed, we'll get: remove B-C, remove C-D, add B-D.
    // And if we tried to apply both of those, we'd try to remove B-C twice, and
    // end up with edges from A-C and B-D even though they're both supposed to
    // be closed!
    //
    // We might need to allow RouteGraphImplications to take a list of nodes to
    // remove too. Well, no node can be removed (we'd still want to add bus
    // edges to it, and query it for route finding), but we want something
    // that's essentially an instruction to remove all regular edges from a
    // certain node.
  }

  getLineStatusIndicatorPriority(): LineStatusIndicatorPriority {
    return "very-low";
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
