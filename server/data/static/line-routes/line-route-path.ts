import { LineSection, LineSectionBoundary } from "../../line-section";

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
        ? linear.slice(indexA, indexB + 1)
        : linear.slice(indexB, indexA + 1).reverse();

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
