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
    return route
      .asLinearPaths()
      .some(
        (path) =>
          this._validateBoundary(this.from, path, allowExpress) &&
          this._validateBoundary(this.to, path, allowExpress),
      );
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
