import { LineSection } from "../../line-section";
import { StationPair } from "./station-pair";
import { CanonicalLineShape } from "./canonical-line-shape";

/**
 * Knows deeply about the stations this line serves, and in which manner. It's
 * primary responsibility is to provide a list of station pairs which form the
 * basis of the route graph edges this line offers. (See docs/line-routes.md for
 * more info.)
 */
export class LineRoute {
  private readonly _allRouteGraphPairs: readonly StationPair[];

  constructor(private readonly _canonicalLineShape: CanonicalLineShape) {
    // This works, but feels a little weird.
    //
    // The CanonicalLineShape is designed to determine which route graph edges
    // should be REMOVED when a certain line section is disrupted. But
    // acknowledging that all edges can be removed, there should never be an
    // edge on the route graph that isn't mentioned in the CanonicalLineShape.
    // So, instead of specifying them separately, we can just get them from the
    // CanonicalLineShape.
    //
    // We can't really re-define edges in the CanonicalLineShape to say "this
    // part of the graph PROVIDES these edges", because for regional lines, some
    // canonical edges remove route graph edges that occur beyond them (since
    // they'd have to travel through). For example, the Gippsland line has a
    // canonical edge from Flinders Street to Richmond, which if disrupted,
    // removes the route graph edges from Pakenham to Flinders Street AND
    // Pakenham to Southern Cross! It really does mean the edges it REMOVES.
    //
    // It also means this class is only a wrapper for the CanonicalLineShape,
    // because it doesn't need to track route graph edges separately. Could it
    // ever make sense for a line to have a route graph edge that isn't captured
    // by the CanonicalLineShape? We don't at the moment.
    this._allRouteGraphPairs = _canonicalLineShape.getAllRouteGraphPairs();
  }

  getAllRouteGraphPairs(): readonly StationPair[] {
    return this._allRouteGraphPairs;
  }

  getRouteGraphPairsInSection(lineSection: LineSection): StationPair[] {
    return this._canonicalLineShape.getRouteGraphPairsBetween(
      lineSection.a,
      lineSection.b,
    );
  }

  // TODO: Function to get all valid line boundaries? Admin dashboard will need
  // to know to populate dropdowns.

  isValidSection(lineSection: LineSection): boolean {
    return (
      this._canonicalLineShape.validBoundary(lineSection.a) &&
      this._canonicalLineShape.validBoundary(lineSection.b)
    );
  }
}
