import { RouteGraph } from "../../route-graph/route-graph";
import { RouteGraphModifier } from "./route-graph-modifier";

/**
 * Modifies the route graph for a station closure (disconnects train edges from
 * a given station and creates express edges instead, only retaining the old
 * edges as bus edges).
 */
export class StationClosureRouteGraphModifier extends RouteGraphModifier {
  constructor(readonly stationId: number) {
    super();
  }

  apply(graph: RouteGraph): RouteGraph {
    // TODO: Find all the adjacent stations to this one, and create express
    // edges between them. Replace the edges that connect to this station with
    // bus edges instead.
    //
    // Example implementation:
    //
    // const oldEdges = graph
    //   .getEdgesConnectedTo(this.stationID)
    //   .filter(x => x instanceof RouteGraphTrainEdge);
    //
    // const connectedNodes = oldEdges
    //   .flatMap(x => [x.stationA, x.stationB])
    //   .filter(x => x !== this.stationID);
    //
    // const expressEdges = mapEachPair(connectedNodes, (a, b) => {
    //   return new RouteGraphTrainEdge(a, b, ...);
    // });
    //
    // const busEdges = oldEdges.map(x => x.toBusEdge());
    //
    // return graph
    //   .withoutEdge(...oldEdges)
    //   .withEdges(...expressEdges, ...busEdges);

    // TEMPORARY
    return graph;
  }
}
