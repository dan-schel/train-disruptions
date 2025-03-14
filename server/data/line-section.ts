import { LineShapeNode } from "@/server/data/line/line-routes/line-shape";

/**
 * Represents a series of stations on a particular line, e.g. "East Pakenham to
 * Westall on the Pakenham line". CANNOT represent a commute, as a commute can
 * span multiple lines. Can be converted to a collection of RouteGraphEdges, for
 * use in disruptions.
 */
export class LineSection {
  constructor(
    readonly line: number,
    readonly a: LineShapeNode,
    readonly b: LineShapeNode,
  ) {
    if (a === b) {
      throw new Error("Line section must exist between two different nodes.");
    }
  }
}
