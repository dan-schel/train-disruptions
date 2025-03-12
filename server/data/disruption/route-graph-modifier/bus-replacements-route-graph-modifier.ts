import { LineSection } from "../../line-section";
import { RouteGraph } from "../../route-graph/route-graph";
import { RouteGraphModifier } from "./route-graph-modifier";

/**
 *
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
