import { RouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/route-graph-modifier";
import { RouteGraph } from "@/server/data/route-graph/route-graph";

/**
 * Modifies the route graph for a no city loop disruption (removes all
 * edges that runs through the city loop)
 *  */
export class NoCityLoopRouteGraphModifier extends RouteGraphModifier {
  constructor(private lines: number[]) {
    super();
  }

  apply(graph: RouteGraph): RouteGraph {
    // TODO: Figure out when to add edges (city circle services),
    // usually commuters could change to other platforms, but
    // what if the city loop is closed on every line.

    // Get edges to remove based on which loop the line runs on
    //  (line can be used to determine which tunnel, thus which edges)
    // e.g. Richmond -> Flinder Street would need to remove train edges:
    //  Flinders Street   -> Southern Cross
    //  Southern Cross    -> Flagstaff
    //  Flagstaff         -> Melbourne Central
    //  Melbourne Central -> Parliament
    //  Parliament        -> Richmond

    // const edgesToRemove = this.lines
    //   .flatMap((line) =>
    //     this._generateStationPairs(line),
    //   );

    // return graph
    //   .withoutEdge(...edgesToRemove)
    //   .withEdges(...edgesToAdd);

    // TEMPORARY
    return graph;
  }
}
