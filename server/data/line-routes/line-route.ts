export type InformalLineRouteStation =
  | LineRouteStation
  | number
  | { id: number; type?: "served" | "always-express" | "often-express" };

export class LineRouteStation {
  private static _defaultType = "served" as const;

  constructor(
    readonly stationId: number,
    readonly type: "served" | "always-express" | "often-express",
  ) {}

  static formalize(station: InformalLineRouteStation): LineRouteStation {
    if (station instanceof LineRouteStation) {
      return station;
    }
    if (typeof station === "number") {
      return new LineRouteStation(station, LineRouteStation._defaultType);
    }
    return new LineRouteStation(
      station.id,
      station.type ?? LineRouteStation._defaultType,
    );
  }
}

export abstract class LineRoute {}
