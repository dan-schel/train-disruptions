import { LineSection } from "../../line-section";
import { StationPair } from "./station-pair";
import { CanonicalLineShape } from "./canonical-line-shape";
import { unique } from "@dan-schel/js-utils";

export class LineRoute {
  private readonly _allRouteGraphPairs: readonly StationPair[];

  constructor(private readonly _canonicalLineShape: CanonicalLineShape) {
    // This assumes there's no such thing as a route graph pair that cannot be
    // removed by some section of the canonical line shape.
    //
    // If it does become the case one day that there's a group of route graph
    // pairs that exist entirely separate from the canonical line shape, we can
    // change this constructor to provide them separately.
    this._allRouteGraphPairs = unique(
      _canonicalLineShape.edges.flatMap((e) => e.data.routeGraphPairs),
      (a, b) => a.equals(b),
    );
  }

  getAllPairs(): readonly StationPair[] {
    return this._allRouteGraphPairs;
  }

  getPairsInSection(lineSection: LineSection): StationPair[] {
    return this._canonicalLineShape.getRouteGraphPairsBetween(
      lineSection.a,
      lineSection.b,
    );
  }

  isValidSection(lineSection: LineSection): boolean {
    return (
      this._canonicalLineShape.validBoundary(lineSection.a) &&
      this._canonicalLineShape.validBoundary(lineSection.b)
    );
  }
}
