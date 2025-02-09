import { MapSection } from "./map-section";
import { Line } from "./static/line";
import { LinearPath, LineRoute } from "./static/line-routes/line-route";

export type LineSectionBoundary = number | "the-city";

export class LineSection {
  constructor(
    readonly from: LineSectionBoundary,
    readonly to: LineSectionBoundary,
  ) {
    if (from === to) {
      throw new Error("Line section must have different from/to boundaries.");
    }
  }

  validate(route: LineRoute, allowExpress: boolean) {
    // Check there is one linear path that contains both `from` and `to`.
    return this._findRelevantLinearPath(route, allowExpress) !== undefined;
  }

  toMapSection(line: Line): MapSection[] {
    const path = this._findRelevantLinearPath(line.route, true);
    if (!path) {
      return [];
    }

    if (path[0] === "the-city") {
      // Some method to translate 'the-city' into the relevant station ids.
    }
  }

  private _findRelevantLinearPath(route: LineRoute, allowExpress: boolean) {
    return route.asLinearPaths().find((path) => {
      return (
        this._validateBoundary(this.from, path, allowExpress) &&
        this._validateBoundary(this.to, path, allowExpress)
      );
    });
  }

  private _validateBoundary(
    boundary: LineSectionBoundary,
    path: LinearPath,
    allowExpress: boolean,
  ) {
    if (boundary === "the-city") {
      return path.some((station) => station === "the-city");
    } else {
      return path.some(
        (station) =>
          typeof station === "object" &&
          station.stationId === boundary &&
          (allowExpress || !station.express),
      );
    }
  }
}
