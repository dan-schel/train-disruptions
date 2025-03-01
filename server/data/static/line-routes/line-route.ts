import { unique } from "@dan-schel/js-utils";
import { LineSection, LineSectionBoundary } from "../../line-section";
import { StationPair } from "./station-pair";

export class LineRoutePath {
  constructor(
    readonly cityStations: readonly number[],
    readonly regularStations: readonly number[],
  ) {
    if (cityStations.length === 0) {
      if (regularStations.length < 2) {
        throw new Error(
          'Line route path without "city" stations must have at least two regular stations.',
        );
      }
    } else {
      if (regularStations.length < 1) {
        throw new Error(
          'Line route path with "city" stations must also have at least one regular station.',
        );
      }
    }
  }

  asLinear(): number[] {
    return [...this.cityStations, ...this.regularStations];
  }

  includesBoundary(boundary: LineSectionBoundary): boolean {
    if (boundary === "the-city") {
      return this.cityStations.length > 0;
    } else {
      // If this line uses "the-city", you cannot use the city stations as a
      // boundary individually, therefore we only need to check the regular
      // stations.
      return this.regularStations.includes(boundary);
    }
  }

  trimToSection(lineSection: LineSection): number[] {
    const linear: readonly LineSectionBoundary[] =
      this.cityStations.length > 0
        ? ["the-city", ...this.regularStations]
        : this.regularStations;

    const indexA = linear.indexOf(lineSection.a);
    const indexB = linear.indexOf(lineSection.b);

    if (indexA === -1 || indexB === -1 || indexA === indexB) {
      throw new Error(
        `Line section ${lineSection.a} to ${lineSection.b} is not valid for this path.`,
      );
    }

    const trimmed =
      indexA < indexB
        ? linear.slice(indexB, indexA + 1)
        : linear.slice(indexA, indexB + 1);

    return trimmed.flatMap((x) => {
      if (x === "the-city") {
        return indexA < indexB
          ? this.cityStations
          : [...this.cityStations].reverse();
      } else {
        return x;
      }
    });
  }
}

export class LineRoute {
  _edges: StationPair[] | null = null;

  constructor(
    /** 2-dimensional array of possible linear journeys on this line. */
    private readonly _paths: readonly LineRoutePath[],
  ) {
    if (_paths.length < 1) {
      throw new Error("Line route must have at least one path.");
    }
  }

  // Memoize the edges so we don't have to rebuild them every time.
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
    const matchingPath = this._pathMatchingSection(lineSection);
    if (matchingPath == null) {
      throw new Error(
        `Line section ${lineSection.a} to ${lineSection.b} is not valid for this line.`,
      );
    }

    // Shouldn't be any need to unique. A single path shouldn't have any
    // duplicate edges.
    return StationPair.arrayToPairs(matchingPath.trimToSection(lineSection));
  }

  isValidSection(lineSection: LineSection): boolean {
    return this._pathMatchingSection(lineSection) != null;
  }

  private _pathMatchingSection(lineSection: LineSection): LineRoutePath | null {
    return (
      this._paths.find(
        (p) =>
          p.includesBoundary(lineSection.a) &&
          p.includesBoundary(lineSection.b),
      ) ?? null
    );
  }
}
