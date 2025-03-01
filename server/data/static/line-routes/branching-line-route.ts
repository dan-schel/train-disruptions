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
  readonly branchAstations: readonly LineRouteStation[];
  readonly branchBstations: readonly LineRouteStation[];

  constructor(
    sharedStations: readonly InformalLineRouteStation[],
    branchAstations: readonly InformalLineRouteStation[],
    branchBstations: readonly InformalLineRouteStation[],
  ) {
    super();

    if (
      sharedStations.length < 1 ||
      branchAstations.length < 1 ||
      branchBstations.length < 1
    ) {
      throw new Error(
        "Branching line route must have at least one station in each section.",
      );
    }

    this.sharedStations = sharedStations.map(LineRouteStation.formalize);
    this.branchAstations = branchAstations.map(LineRouteStation.formalize);
    this.branchBstations = branchBstations.map(LineRouteStation.formalize);
  }

  protected _buildEdges(): StationPair[] {
    throw new Error("Method not implemented.");
  }

  getEdgesInSection(lineSection: LineSection): StationPair[] {
    throw new Error("Method not implemented.");
  }

  isValidSection(lineSection: LineSection): boolean {
    throw new Error("Method not implemented.");
  }
}
