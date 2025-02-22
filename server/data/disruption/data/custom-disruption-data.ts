import { z } from "zod";
import { DisruptionDataBase } from "./disruption-data-base";
import { DisruptionWriteup } from "../writeup/disruption-writeup";
import { RouteGraphImplications } from "../../route-graph/route-graph-implications";
import { DisruptionWriteupAuthor } from "../writeup/disruption-writeup-author";
import { CustomDisruptionWriteupAuthor } from "../writeup/custom-disruption-writeup-author";

/**
 * Used in edge cases where the normal disruption types we have don't cut it.
 * Allows each use case of the disruption data (e.g. the display string, routing
 * graph modifications, etc.) to be provided manually.
 */
export class CustomDisruptionData extends DisruptionDataBase {
  constructor(
    readonly writeup: DisruptionWriteup,
    readonly routeGraphImplications: RouteGraphImplications,
  ) {
    super();
  }

  getWriteupAuthor(): DisruptionWriteupAuthor {
    return new CustomDisruptionWriteupAuthor(this);
  }

  getRouteGraphImplications(): RouteGraphImplications {
    return this.routeGraphImplications;
  }

  static readonly bson = z
    .object({
      type: z.literal("custom"),
      writeup: DisruptionWriteup.bson,
      routeGraphImplications: RouteGraphImplications.bson,
    })
    .transform(
      (x) => new CustomDisruptionData(x.writeup, x.routeGraphImplications),
    );

  toBson(): z.input<typeof CustomDisruptionData.bson> {
    return {
      type: "custom",
      writeup: this.writeup.toBson(),
      routeGraphImplications: this.routeGraphImplications.toBson(),
    };
  }
}
