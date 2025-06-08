import { RouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/route-graph-modifier";
import { RouteGraphTrainEdge } from "@/server/data/route-graph/edge/route-graph-train-edge";
import { RouteGraph } from "@/server/data/route-graph/route-graph";
// import * as line from "@/shared/line-ids";
// import * as station from "@/shared/station-ids";

// type Junction = "JOLIMONT" | "RICHMOND" | "NORTH_MELBOURNE";

// Arrays used to create pairings for city loop edges to remove
// const JunctionEdgeMapping: Readonly<Record<Junction, number[]>> = {
//   RICHMOND: [
//     station.FLINDERS_STREET,
//     station.SOUTHERN_CROSS,
//     station.FLAGSTAFF,
//     station.MELBOURNE_CENTRAL,
//     station.PARLIAMENT,
//     station.RICHMOND,
//   ],
//   JOLIMONT: [
//     station.FLINDERS_STREET,
//     station.SOUTHERN_CROSS,
//     station.FLAGSTAFF,
//     station.MELBOURNE_CENTRAL,
//     station.PARLIAMENT,
//     station.JOLIMONT,
//   ],
//   NORTH_MELBOURNE: [
//     station.FLINDERS_STREET,
//     station.PARLIAMENT,
//     station.MELBOURNE_CENTRAL,
//     station.FLAGSTAFF,
//     station.NORTH_MELBOURNE,
//   ],
// };

// Mapping of train lines to city loop edges to remove
// TODO: Remove Cranbourne, Pakenham, and Sunbury when Metro Tunnel is operating
// const LineJunctionMapping: Readonly<Record<number, number[]>> = {
//   [line.ALAMEIN]: JunctionEdgeMapping["RICHMOND"],
//   [line.BELGRAVE]: JunctionEdgeMapping["RICHMOND"],
//   [line.GLEN_WAVERLEY]: JunctionEdgeMapping["RICHMOND"],
//   [line.LILYDALE]: JunctionEdgeMapping["RICHMOND"],
//   [line.HURSTBRIDGE]: JunctionEdgeMapping["JOLIMONT"],
//   [line.MERNDA]: JunctionEdgeMapping["JOLIMONT"],
//   [line.CRANBOURNE]: JunctionEdgeMapping["RICHMOND"],
//   [line.PAKENHAM]: JunctionEdgeMapping["RICHMOND"],
//   [line.CRAIGIEBURN]: JunctionEdgeMapping["NORTH_MELBOURNE"],
//   [line.SUNBURY]: JunctionEdgeMapping["NORTH_MELBOURNE"],
//   [line.UPFIELD]: JunctionEdgeMapping["NORTH_MELBOURNE"],
// };

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
    // const edgesToRemove = this.lines
    //   .filter((line) => LineJunctionMapping[line])
    //   .flatMap((line) =>
    //     this._generateEdgesToRemove(line, LineJunctionMapping[line]),
    //   );

    // return graph
    //   .withoutEdge(...edgesToRemove)
    //   .withEdges(...edgesToAdd);

    // TEMPORARY
    return graph;
  }

  private _generateEdgesToRemove(
    line: number,
    stations: number[],
  ): RouteGraphTrainEdge[] {
    const edges: RouteGraphTrainEdge[] = [];
    if (stations.length < 2) return edges;

    // Create station pairings to create train edges
    for (let i = 0; i < stations.length - 1; i++) {
      edges.push(
        new RouteGraphTrainEdge(stations[i], stations[i + 1], line, false),
      );
    }

    return edges;
  }
}
