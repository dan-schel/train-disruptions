import { LineSection } from "../../line-section";

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

export class StationPair {
  constructor(
    readonly a: number,
    readonly b: number,
  ) {
    if (a === b) {
      throw new Error(`Invalid station pair: ${a} and ${b}.`);
    }
  }

  includes(station: number) {
    return this.a === station || this.b === station;
  }
}

export abstract class LineRoute {
  _edges: StationPair[] | null = null;

  // Memoize the edges so we don't have to rebuild them every time.
  get edges(): StationPair[] {
    if (this._edges == null) {
      this._edges = this._buildEdges();
    }
    return this._edges;
  }

  protected abstract _buildEdges(): StationPair[];
  abstract getEdgesInSection(lineSection: LineSection): StationPair[];
  abstract isValidSection(lineSection: LineSection): boolean;
}
