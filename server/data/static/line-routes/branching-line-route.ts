import { LineSection } from "../../line-section";
import {
  LineRoute,
  LineRouteStation,
  InformalLineRouteStation,
  contains,
  invalid,
  LineSectionValidationResult,
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

  validateLineSection(
    section: LineSection,
    options?: { ignoreExpressStops?: boolean },
  ): LineSectionValidationResult {
    if (section.from === "the-city" || section.to === "the-city") {
      return invalid("'The city' is invalid for simple line routes.");
    }

    const branchAStations = this.sharedStations.concat(this.branchAstations);
    const branchBStations = this.sharedStations.concat(this.branchBstations);

    const fromOnBranchA = contains(section.from, branchAStations, options);
    const fromOnBranchB = contains(section.from, branchBStations, options);
    const toOnBranchA = contains(section.to, branchAStations, options);
    const toOnBranchB = contains(section.to, branchBStations, options);

    if (!fromOnBranchA && !fromOnBranchB) {
      return invalid(`Station ${section.from} is not in this line.`);
    }
    if (!toOnBranchA && !toOnBranchB) {
      return invalid(`Station ${section.to} is not in this line.`);
    }

    const bothOnBranchA = fromOnBranchA && toOnBranchA;
    const bothOnBranchB = fromOnBranchB && toOnBranchB;
    if (!bothOnBranchA && !bothOnBranchB) {
      return invalid(
        `Station ${section.from} and ${section.to} are not on the same branch.`,
      );
    }

    return { valid: true };
  }
}
