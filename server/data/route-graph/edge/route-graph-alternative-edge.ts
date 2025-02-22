import { z } from "zod";
import { RouteGraphEdgeBase } from "./route-graph-edge-base";

export type RouteGraphAlternativeEdgeMode = "bus" | "tram" | "walk";

/**
 * A path between two stations not achievable by train, but achievable by other
 * recommended means, such as bus, tram, or walking. Allows the route finding
 * algorithm to provide specific advice, i.e. "Take the train to Burnley,
 * replacement buses to Caulfield, then the train to Noble Park".
 */
export class RouteGraphAlternativeEdge extends RouteGraphEdgeBase {
  constructor(
    public readonly stationA: number,
    public readonly stationB: number,
    public readonly mode: RouteGraphAlternativeEdgeMode,
  ) {
    super(stationA, stationB);
  }

  static readonly bson = z
    .object({
      type: z.literal("alternative"),
      stationA: z.number(),
      stationB: z.number(),
      mode: z.enum(["bus", "tram", "walk"]),
    })
    .transform(
      (x) => new RouteGraphAlternativeEdge(x.stationA, x.stationB, x.mode),
    );

  toBson(): z.input<typeof RouteGraphAlternativeEdge.bson> {
    return {
      type: "alternative",
      stationA: this.stationA,
      stationB: this.stationB,
      mode: this.mode,
    };
  }
}
