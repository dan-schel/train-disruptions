export type LineSectionBoundary = number | "the-city";

/**
 * Represents a series of stations on a particular line, e.g. "East Pakenham to
 * Westall on the Pakenham line". CANNOT represent a commute, as a commute can
 * span multiple lines. Can be converted to a collection of RouteGraphEdges, for
 * use in disruptions.
 */
export class LineSection {
  constructor(
    readonly line: number,
    readonly a: LineSectionBoundary,
    readonly b: LineSectionBoundary,
  ) {
    if (a === b) {
      throw new Error("Line section boundaries must be different.");
    }
  }
}
