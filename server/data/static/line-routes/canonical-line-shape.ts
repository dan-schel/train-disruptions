import { unique } from "@dan-schel/js-utils";
import { LineSectionBoundary } from "../../line-section";
import { StationPair } from "./station-pair";
import { Edge, Tree } from "./tree";

export type CanonicalLineShapeEdgeData = { routeGraphPairs: StationPair[] };

/** An edge in the CanonicalLineShape tree. Each edge stores the route graph pairs that exist to serve */
export class CanonicalLineShapeEdge extends Edge<
  LineSectionBoundary,
  CanonicalLineShapeEdgeData
> {
  constructor(
    from: LineSectionBoundary,
    to: LineSectionBoundary,
    routeGraphPairs: StationPair[],
  ) {
    super(from, to, { routeGraphPairs });

    if (routeGraphPairs.length === 0) {
      throw new Error(
        "CanonicalLineShapeEdge created without any routeGraphPairs.",
      );
    }
  }
}

/**
 * A tree which helps evaluate expressions like "Pakenham to Dandenong" to the
 * actual implicated Route Graph Edges. (See docs/line-routes.md for more info.)
 */
export class CanonicalLineShape {
  private readonly _tree: Tree<LineSectionBoundary, CanonicalLineShapeEdgeData>;

  constructor(
    readonly root: LineSectionBoundary,
    readonly edges: readonly CanonicalLineShapeEdge[],
  ) {
    this._tree = new Tree(root, edges, (a, b) => a === b);
    this._tree.throwUnlessValid();
  }

  validBoundary(boundary: LineSectionBoundary): boolean {
    return this._tree.hasNode(boundary);
  }

  getRouteGraphPairsBetween(
    a: LineSectionBoundary,
    b: LineSectionBoundary,
  ): StationPair[] {
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
