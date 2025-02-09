import {
  LineRoute,
  LineRouteStation,
  InformalLineRouteStation,
} from "./line-route";

/** A line which splits into two branches but rejoins again. */
export class DualPathLineRoute extends LineRoute {
  readonly sharedBeforeStations: readonly LineRouteStation[];
  readonly pathAStations: readonly LineRouteStation[];
  readonly pathBStations: readonly LineRouteStation[];
  readonly sharedAfterStations: readonly LineRouteStation[];

  constructor(
    sharedBeforeStations: readonly InformalLineRouteStation[],
    pathAStations: readonly InformalLineRouteStation[],
    pathBStations: readonly InformalLineRouteStation[],
    sharedAfterStations: readonly InformalLineRouteStation[],
  ) {
    super();

    if (sharedBeforeStations.length < 1 || sharedAfterStations.length < 1) {
      throw new Error(
        "Dual path line route must have at least one station in each shared section.",
      );
    }

    this.sharedBeforeStations = sharedBeforeStations.map(
      LineRouteStation.formalize,
    );
    this.pathAStations = pathAStations.map(LineRouteStation.formalize);
    this.pathBStations = pathBStations.map(LineRouteStation.formalize);
    this.sharedAfterStations = sharedAfterStations.map(
      LineRouteStation.formalize,
    );
  }
}
