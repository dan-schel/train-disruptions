import { LineSection } from "@/server/data/line-section";
import { StationPair } from "@/server/data/line/line-routes/station-pair";
import {
  LineShape,
  LineShapeNode,
} from "@/server/data/line/line-routes/line-shape";

/**
 * Knows deeply about the stations this line serves, and in which manner. It's
 * primary responsibility is to provide a list of station pairs which form the
 * basis of the route graph edges this line offers. (See docs/line-routes.md for
 * more info.)
 */
export class LineRoute {
  private readonly _allRouteGraphPairs: readonly StationPair[];

  constructor(private readonly _shape: LineShape) {
    // This works, but feels a little weird.
    //
    // The line shape is designed to determine which route graph edges should be
    // REMOVED when a certain line section is disrupted. But acknowledging that
    // all edges can be removed, there should never be an edge on the route
    // graph that isn't mentioned in the line shape. So, instead of specifying
    // them separately, we can just get them from the line shape.
    //
    // However, we can't really re-define edges in the line shape to say "this
    // edge in the line shape PROVIDES these route graph edges", because for
    // regional lines, some line shape edges remove route graph edges that occur
    // beyond them (since they'd have to travel through). For example, the
    // Gippsland line has an edge from Flinders Street to Richmond, which if
    // disrupted, removes the route graph edges from Pakenham to Flinders Street
    // AND Pakenham to Southern Cross! It really does mean the edges it REMOVES.
    //
    // It also means this class is only a wrapper for the line shape, because it
    // doesn't need to track route graph edges separately. Could it ever make
    // sense for a line to have a route graph edge that isn't captured by the
    // line shape? We don't have any examples at the moment!
    this._allRouteGraphPairs = _shape.getAllRouteGraphPairs();
  }

  getAllRouteGraphPairs(): readonly StationPair[] {
    return this._allRouteGraphPairs;
  }

  getRouteGraphPairsInSection(lineSection: LineSection): StationPair[] {
    return this._shape.getRouteGraphPairsBetween(lineSection.a, lineSection.b);
  }

  getAllLineShapeNodes(): readonly LineShapeNode[] {
    return this._shape.getAllNodes();
  }

  // TODO: Function to get all line shape nodes? Admin dashboard will need to
  // know to populate dropdowns.

  isValidSection(lineSection: LineSection): boolean {
    return (
      this._shape.isValidNode(lineSection.a) &&
      this._shape.isValidNode(lineSection.b)
    );
  }
}
