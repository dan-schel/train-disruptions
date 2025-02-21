import { z } from "zod";
import { RouteGraphEdgeBase } from "./route-graph-edge-base";

export type RouteGraphAlternativeEdgeMode = "bus" | "tram" | "walk";

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
