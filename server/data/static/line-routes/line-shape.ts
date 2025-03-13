import { unique } from "@dan-schel/js-utils";
import { StationPair } from "@/server/data/static/line-routes/station-pair";
import { Edge, Tree } from "@/server/data/static/line-routes/tree";

export type LineShapeNode = number | "the-city";

export type LineShapeEdgeData = { routeGraphPairs: StationPair[] };

/**
 * An edge in the LineShape tree. Each edge stores the route graph pairs that
 * would be affected by a disruption to this LineShapeEdge.
 */
export class LineShapeEdge extends Edge<LineShapeNode, LineShapeEdgeData> {
  constructor(
    from: LineShapeNode,
    to: LineShapeNode,
    routeGraphPairs: StationPair[],
  ) {
    super(from, to, { routeGraphPairs });

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

  getRouteGraphPairsBetween(a: LineShapeNode, b: LineShapeNode): StationPair[] {
    const pairs = this._tree
      .getPathBetween(a, b)
      .flatMap((e) => e.data.routeGraphPairs);

    return unique(pairs, (a, b) => a.equals(b));
  }

  getAllRouteGraphPairs(): StationPair[] {
    return unique(
      this.edges.flatMap((e) => e.data.routeGraphPairs),
      (a, b) => a.equals(b),
    );
  }
}
