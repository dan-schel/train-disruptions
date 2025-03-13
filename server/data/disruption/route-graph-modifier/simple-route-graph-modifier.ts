import { RouteGraphEdge } from "@/server/data/route-graph/edge/route-graph-edge";
import { RouteGraphTrainEdge } from "@/server/data/route-graph/edge/route-graph-train-edge";
import { RouteGraph } from "@/server/data/route-graph/route-graph";
import { RouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/route-graph-modifier";

/** Accepts a list of edges to remove and a list of edges to add. */
export class SimpleRouteGraphModifier extends RouteGraphModifier {
  constructor(
    readonly edgesToRemove: readonly RouteGraphTrainEdge[],
    readonly edgesToAdd: readonly RouteGraphEdge[],
  ) {
    super();
  }

  apply(graph: RouteGraph): RouteGraph {
    // TODO: Remove and add edges as required.
    //
    // Example implementation:
    //
    // return graph
    //   .withoutEdge(...edgesToRemove)
    //   .withEdges(...edgesToAdd);
    //
    // NOTE: We might need some logic in here to be resilient in case the edge
    // it attempts to remove doesn't exist anymore (e.g. which could happen if
    // this modification is applied after another one, or references a route or
    // station that no longer exists).

    // TEMPORARY
    return graph;
  }
}
