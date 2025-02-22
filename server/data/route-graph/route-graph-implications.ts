import { z } from "zod";
import { RouteGraphEdge, routeGraphEdgeBson } from "./edge/route-graph-edge";
import { RouteGraphTrainEdge } from "./edge/route-graph-train-edge";

/** Changes to be applied to the route graph. */
export class RouteGraphImplications {
  constructor(
    public readonly edgesToRemove: readonly RouteGraphTrainEdge[],
    public readonly edgesToAdd: readonly RouteGraphEdge[],
  ) {}

  // TODO: Some mechanism to have this applied to a RouteGraph.
  // apply(graph: RouteGraph): RouteGraph {}

  static readonly none = new RouteGraphImplications([], []);

  static readonly bson = z
    .object({
      edgesToRemove: RouteGraphTrainEdge.bson.array(),
      edgesToAdd: routeGraphEdgeBson.array(),
    })
    .transform(
      (x) => new RouteGraphImplications(x.edgesToRemove, x.edgesToAdd),
    );

  toBson(): z.input<typeof RouteGraphImplications.bson> {
    return {
      edgesToRemove: this.edgesToRemove.map((edge) => edge.toBson()),
      edgesToAdd: this.edgesToAdd.map((edge) => edge.toBson()),
    };
  }
}
