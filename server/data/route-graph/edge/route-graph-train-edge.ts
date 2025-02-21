import { z } from "zod";
import { RouteGraphEdgeBase } from "./route-graph-edge-base";

export class RouteGraphTrainEdge extends RouteGraphEdgeBase {
  constructor(
    public readonly stationA: number,
    public readonly stationB: number,
    public readonly line: number,
  ) {
    super(stationA, stationB);
  }

  static readonly bson = z
    .object({
      type: z.literal("train"),
      stationA: z.number(),
      stationB: z.number(),
      line: z.number(),
    })
    .transform((x) => new RouteGraphTrainEdge(x.stationA, x.stationB, x.line));

  toBson(): z.input<typeof RouteGraphTrainEdge.bson> {
    return {
      type: "train",
      stationA: this.stationA,
      stationB: this.stationB,
      line: this.line,
    };
  }
}
