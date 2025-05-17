import { RouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/route-graph-modifier";
import { RouteGraphTrainEdge } from "@/server/data/route-graph/edge/route-graph-train-edge";
import { RouteGraph } from "@/server/data/route-graph/route-graph";
// import * as line from "@/shared/line-ids";
// import * as station from "@/shared/station-ids";

// type LoopLine = "BURNLEY" | "CLIFTON_HILL" | "DANDENONG" | "NORTHERN";

// const LineLoopMapping: Readonly<Record<number, LoopLine>> = {
//   [line.ALAMEIN]: "BURNLEY",
//   [line.BELGRAVE]: "BURNLEY",
//   [line.GLEN_WAVERLEY]: "BURNLEY",
//   [line.LILYDALE]: "BURNLEY",
//   [line.HURSTBRIDGE]: "CLIFTON_HILL",
//   [line.MERNDA]: "CLIFTON_HILL",
//   [line.CRANBOURNE]: "DANDENONG",
//   [line.PAKENHAM]: "DANDENONG",
//   [line.CRAIGIEBURN]: "NORTHERN",
//   [line.SUNBURY]: "NORTHERN",
//   [line.UPFIELD]: "NORTHERN",
// };
// const LoopEdgeMapping: Readonly<Record<LoopLine, number[]>> = {
//   BURNLEY: [
//     station.FLINDERS_STREET,
//     station.SOUTHERN_CROSS,
//     station.FLAGSTAFF,
//     station.MELBOURNE_CENTRAL,
//     station.PARLIAMENT,
//     station.RICHMOND,
//   ],
//   CLIFTON_HILL: [
//     station.FLINDERS_STREET,
//     station.SOUTHERN_CROSS,
//     station.FLAGSTAFF,
//     station.MELBOURNE_CENTRAL,
//     station.PARLIAMENT,
//     station.JOLIMONT,
//   ],
//   DANDENONG: [
//     station.FLINDERS_STREET,
//     station.SOUTHERN_CROSS,
//     station.FLAGSTAFF,
//     station.MELBOURNE_CENTRAL,
//     station.PARLIAMENT,
//     station.RICHMOND,
//   ],
//   NORTHERN: [
//     station.FLINDERS_STREET,
//     station.PARLIAMENT,
//     station.MELBOURNE_CENTRAL,
//     station.FLAGSTAFF,
//     station.NORTH_MELBOURNE,
//   ],
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
    //   .filter((line) => LineLoopMapping[line])
    //   .flatMap((line) =>
    //     this._generateEdgesToRemove(
    //       line,
    //       LoopEdgeMapping[LineLoopMapping[line]],
    //     ),
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
