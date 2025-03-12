import { LineSection } from "../../line-section";
import { RouteGraph } from "../../route-graph/route-graph";
import { RouteGraphModifier } from "./route-graph-modifier";

/**
 * Modifies the route graph for a bus replacements disruption (replaces all
 * train edges in the given sections with bus edges).
 */
export class BusReplacementsRouteGraphModifier extends RouteGraphModifier {
  constructor(readonly sections: LineSection[]) {
    super();
  }

  apply(graph: RouteGraph): RouteGraph {
    // TEMPORARY
    return graph;
  }
}
