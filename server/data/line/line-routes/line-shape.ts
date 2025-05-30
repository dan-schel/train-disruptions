import { unique } from "@dan-schel/js-utils";
import { StationPair } from "@/server/data/line/line-routes/station-pair";
import { Edge, Tree } from "@/server/data/line/line-routes/tree";
import { MapSegment } from "@/server/data/map-segment";

export type LineShapeNode = number | "the-city";

export type LineShapeEdgeData = {
  routeGraphPairs: StationPair[];
  mapSegments: MapSegment[];
};

/**
 * An edge in the LineShape tree. Each edge stores the route graph pairs that
 * would be affected by a disruption to this LineShapeEdge.
 */
export class LineShapeEdge extends Edge<LineShapeNode, LineShapeEdgeData> {
  constructor(
    from: LineShapeNode,
    to: LineShapeNode,
    routeGraphPairs: StationPair[],
    mapSegments: MapSegment[],
  ) {
    super(from, to, {
      routeGraphPairs,
      mapSegments: mapSegments.map((x) => x.normalize()),
    });

    if (routeGraphPairs.length === 0) {
      throw new Error("LineShapeEdge created without any routeGraphPairs.");
    }
  }
}

/**
 * A tree which helps evaluate expressions like "Pakenham to Dandenong" to the
 * actual implicated Route Graph Edges. (See docs/line-routes.md for more info.)
 */
export class LineShape {
  private readonly _tree: Tree<LineShapeNode, LineShapeEdgeData>;

  constructor(
    readonly root: LineShapeNode,
    readonly edges: readonly LineShapeEdge[],
  ) {
    this._tree = new Tree(root, edges, (a, b) => a === b);
    this._tree.throwUnlessValid();
  }

  isValidNode(node: LineShapeNode): boolean {
    return this._tree.hasNode(node);
  }

  getAllNodes(): LineShapeNode[] {
    return this._tree.getAllNodes();
  }

  getRouteGraphPairsBetween(a: LineShapeNode, b: LineShapeNode): StationPair[] {
    const pairs = this._tree
      .getPathBetween(a, b)
      .flatMap((e) => e.data.routeGraphPairs);

    return unique(pairs, (a, b) => a.equals(b));
  }

  getMapSegmentsBetween(a: LineShapeNode, b: LineShapeNode): MapSegment[] {
    const segments = this._tree
      .getPathBetween(a, b)
      .flatMap((e) => e.data.mapSegments);

    return MapSegment.condense(segments);
  }

  getAllRouteGraphPairs(): StationPair[] {
    return unique(
      this.edges.flatMap((e) => e.data.routeGraphPairs),
      (a, b) => a.equals(b),
    );
  }
}
