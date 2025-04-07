import { LineSection } from "@/server/data/line-section";
import { StationPair } from "@/server/data/line/line-routes/station-pair";
import {
  LineShape,
  LineShapeNode,
} from "@/server/data/line/line-routes/line-shape";
import { unique } from "@dan-schel/js-utils";
import { MapSegment } from "@/server/data/map-segment";

/**
 * Knows deeply about the stations this line serves, and in which manner. It's
 * primary responsibility is to provide a list of station pairs which form the
 * basis of the route graph edges this line offers. (See docs/line-routes.md for
 * more info.)
 */
export class LineRoute {
  constructor(
    private readonly _allRouteGraphPairs: readonly StationPair[],
    private readonly _shape: LineShape,
  ) {}

  getAllRouteGraphPairs(): readonly StationPair[] {
    return this._allRouteGraphPairs;
  }

  getRouteGraphPairsInSection(lineSection: LineSection): StationPair[] {
    return this._shape.getRouteGraphPairsBetween(lineSection.a, lineSection.b);
  }

  getMapSegmentsInSection(lineSection: LineSection): MapSegment[] {
    return this._shape.getMapSegmentsBetween(lineSection.a, lineSection.b);
  }

  getAllServedStations(): readonly number[] {
    return unique(this._allRouteGraphPairs.flatMap((x) => [x.a, x.b]));
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
