export type LineRouteStationType =
  | "served"
  | "always-express"
  | "often-express";

const defaultStationType = "served" as const;

export type InformalLineRouteStation =
  | LineRouteStation
  | number
  | { id: number; type?: LineRouteStationType };

export type LinearPath =
  | readonly LineRouteStation[]
  | readonly ["the-city", ...LineRouteStation[]];

export class LineRouteStation {
  constructor(
    readonly stationId: number,
    readonly type: LineRouteStationType,
  ) {}

  get express() {
    return this.type !== "served";
  }

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

export abstract class LineRoute {
  // TODO: [DS] If this is the only thing LineRoute ever has to do, there's
  // probably no point having it at all (just put LinearPath[] in the Line), and
  // certainly no point having it abstract with four unique implementations!
  abstract asLinearPaths(): LinearPath[];
}
