import { LineSection } from "@/server/data/line-section";
import { RouteGraph } from "@/server/data/route-graph/route-graph";
import { RouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/route-graph-modifier";

/**
 * Modifies the route graph for a no trains running disruption (removes all
 * train edges in the given sections).
 */
export class NoTrainsRunningRouteGraphModifier extends RouteGraphModifier {
  constructor(readonly sections: LineSection[]) {
    super();
  }

  apply(graph: RouteGraph): RouteGraph {
    // TEMPORARY
    return graph;
  }
}
