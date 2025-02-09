import {
  LineRoute,
  LineRouteStation,
  InformalLineRouteStation,
  LinearPath,
} from "./line-route";

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

  asLinearPaths(): LinearPath[] {
    return [
      [...this.sharedStations, ...this.branchAstations],
      [...this.sharedStations, ...this.branchBstations],
    ];
  }
}
