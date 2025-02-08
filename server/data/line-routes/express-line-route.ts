import {
  LineRoute,
  LineRouteStation,
  InformalLineRouteStation,
} from "./line-route";

export class ExpressLineRoute extends LineRoute {
  readonly beforeExpressStations: readonly LineRouteStation[];
  readonly localOnlyStations: readonly LineRouteStation[];
  readonly afterExpressStations: readonly LineRouteStation[];

  constructor(
    beforeExpressStations: readonly InformalLineRouteStation[],
    localOnlyStations: readonly InformalLineRouteStation[],
    afterExpressStations: readonly InformalLineRouteStation[],
  ) {
    super();

    if (
      beforeExpressStations.length < 1 ||
      localOnlyStations.length < 1 ||
      afterExpressStations.length < 1
    ) {
      throw new Error(
        "Express line route must have at least one station in each section.",
      );
    }

    this.beforeExpressStations = beforeExpressStations.map(
      LineRouteStation.formalize,
    );
    this.localOnlyStations = localOnlyStations.map(LineRouteStation.formalize);
    this.afterExpressStations = afterExpressStations.map(
      LineRouteStation.formalize,
    );
  }
}
