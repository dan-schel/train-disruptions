import { itsOk } from "@dan-schel/js-utils";
import { LineSection } from "../../line-section";
import { LineRoute } from "./line-route";
import {
  InformalLineRouteStation,
  LineRouteStation,
} from "./line-route-station";
import { StationPair } from "./station-pair";

/** A line which splits into two branches. */
export class BranchingLineRoute extends LineRoute {
  readonly sharedStations: readonly LineRouteStation[];
  readonly branchAStations: readonly LineRouteStation[];
  readonly branchBStations: readonly LineRouteStation[];

  constructor(
    sharedStations: readonly InformalLineRouteStation[],
    branchAStations: readonly InformalLineRouteStation[],
    branchBStations: readonly InformalLineRouteStation[],
  ) {
    super();

    if (
      sharedStations.length < 1 ||
      branchAStations.length < 1 ||
      branchBStations.length < 1
    ) {
      throw new Error(
        "Branching line route must have at least one station in each section.",
      );
    }

    this.sharedStations = sharedStations.map(LineRouteStation.formalize);
    this.branchAStations = branchAStations.map(LineRouteStation.formalize);
    this.branchBStations = branchBStations.map(LineRouteStation.formalize);
  }

  protected _buildEdges(): StationPair[] {
    const path1 = [...this.sharedStations, ...this.branchAStations].map(
      (x) => x.stationId,
    );

    const path2 = [
      itsOk(this.sharedStations.at(-1)),
      ...this.branchBStations,
    ].map((x) => x.stationId);

    return [
      ...StationPair.arrayToPairs(path1),
      ...StationPair.arrayToPairs(path2),
    ];
  }

  getEdgesInSection(lineSection: LineSection): StationPair[] {
    throw new Error("Method not implemented.");
  }

  isValidSection(lineSection: LineSection): boolean {
    throw new Error("Method not implemented.");
  }
}
