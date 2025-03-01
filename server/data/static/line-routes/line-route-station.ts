export type LineRouteStationType =
  | "served"
  | "always-express"
  | "often-express";

const defaultStationType = "served" as const;

export type InformalLineRouteStation =
  | LineRouteStation
  | number
  | { id: number; type?: LineRouteStationType };

export class LineRouteStation {
  constructor(
    readonly stationId: number,
    readonly type: LineRouteStationType,
  ) {}

  static formalize(station: InformalLineRouteStation): LineRouteStation {
    if (station instanceof LineRouteStation) {
      return station;
    }
    if (typeof station === "number") {
      return new LineRouteStation(station, defaultStationType);
    }
    return new LineRouteStation(station.id, station.type ?? defaultStationType);
  }
}
