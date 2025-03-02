import { LineSection } from "../../line-section";
import { StationPair } from "./station-pair";
import { CanonicalLineShape } from "./canonical-line-shape";
import { unique } from "@dan-schel/js-utils";

export class LineRoute {
  private readonly allRouteGraphPairs: readonly StationPair[];

  constructor(private readonly canonicalLineShape: CanonicalLineShape) {
    // This assumes there's no such thing as a route graph pair that cannot be
    // removed by some section of the canonical line shape.
    //
    // If it does become the case one day that there's a group of route graph
    // pairs that exist entirely separate from the canonical line shape, we can
    // change this constructor to provide them separately.
    this.allRouteGraphPairs = unique(
      canonicalLineShape.edges.flatMap((e) => e.data.routeGraphPairs),
      (a, b) => a.equals(b),
    );
  }

  getAllPairs(): readonly StationPair[] {
    return this.allRouteGraphPairs;
  }

  getPairsInSection(lineSection: LineSection): StationPair[] {
    return this.canonicalLineShape.getRouteGraphPairsBetween(
      lineSection.a,
      lineSection.b,
    );
  }

  isValidSection(lineSection: LineSection): boolean {
    return (
      this.canonicalLineShape.validBoundary(lineSection.a) &&
      this.canonicalLineShape.validBoundary(lineSection.b)
    );
  }
}
