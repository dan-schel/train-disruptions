import {
  LineRoute,
  LineRouteStation,
  InformalLineRouteStation,
  LinearPath,
} from "./line-route";

/** A line which doesn't do anything annoying. */
export class SimpleLineRoute extends LineRoute {
  readonly stations: readonly LineRouteStation[];

  constructor(stations: readonly InformalLineRouteStation[]) {
    super();

    if (stations.length < 2) {
      throw new Error("Simple line route must have at least two stations");
    }

    this.stations = stations.map(LineRouteStation.formalize);
  }

  asLinearPaths(): LinearPath[] {
    return [this.stations];
  }
}
