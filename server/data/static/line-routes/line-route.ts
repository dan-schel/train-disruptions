import { unique } from "@dan-schel/js-utils";
import { LineSection } from "../../line-section";
import { StationPair } from "./station-pair";
import { LineRoutePath } from "./line-route-path";

export class LineRoute {
  // Memoize the edges so we don't have to rebuild them every time.
  _edges: StationPair[] | null = null;

  constructor(
    /** 2-dimensional array of possible linear journeys on this line. */
    private readonly _paths: readonly LineRoutePath[],
  ) {
    if (_paths.length < 1) {
      throw new Error("Line route must have at least one path.");
    }
  }

  get edges(): StationPair[] {
    if (this._edges == null) {
      const allEdges = this._paths
        .map((p) => StationPair.arrayToPairs(p.asLinear()))
        .flat();

      // Branching lines will have duplicate edges for the sections shared on
      // both paths.
      this._edges = unique(allEdges, (a, b) => a.equals(b));
    }
    return this._edges;
  }

  getEdgesInSection(lineSection: LineSection): StationPair[] {
    const matchingPaths = this._getMatchingPaths(lineSection);
    if (matchingPaths.length === 0) {
      throw new Error(
        `Line section ${lineSection.a} to ${lineSection.b} is not valid for this line.`,
      );
    }

    const matchingPairs = matchingPaths.flatMap((p) =>
      StationPair.arrayToPairs(p.trimToSection(lineSection)),
    );

    return unique(matchingPairs, (a, b) => a.equals(b));
  }

  isValidSection(lineSection: LineSection): boolean {
    return this._getMatchingPaths(lineSection).length !== 0;
  }

  private _getMatchingPaths(lineSection: LineSection): LineRoutePath[] {
    return (
      this._paths.filter(
        (p) =>
          p.includesBoundary(lineSection.a) &&
          p.includesBoundary(lineSection.b),
      ) ?? null
    );
  }
}
