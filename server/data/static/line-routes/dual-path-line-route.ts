import { LineSection } from "../../line-section";
import {
  LineRoute,
  LineRouteStation,
  InformalLineRouteStation,
  contains,
  invalid,
  LineSectionValidationResult,
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

  validateLineSection(
    section: LineSection,
    options?: { ignoreExpressStops?: boolean },
  ): LineSectionValidationResult {
    if (section.from === "the-city" || section.to === "the-city") {
      return invalid("'The city' is invalid for simple line routes.");
    }

    const pathAStations = this.sharedBeforeStations.concat(
      this.pathAStations,
      this.sharedAfterStations,
    );
    const pathBStations = this.sharedBeforeStations.concat(
      this.pathBStations,
      this.sharedAfterStations,
    );

    const fromOnPathA = contains(section.from, pathAStations, options);
    const fromOnPathB = contains(section.from, pathBStations, options);
    const toOnPathA = contains(section.to, pathAStations, options);
    const toOnPathB = contains(section.to, pathBStations, options);

    if (!fromOnPathA && !fromOnPathB) {
      return invalid(`Station ${section.from} is not in this line.`);
    }
    if (!toOnPathA && !toOnPathB) {
      return invalid(`Station ${section.to} is not in this line.`);
    }

    const bothOnPathA = fromOnPathA && toOnPathA;
    const bothOnPathB = fromOnPathB && toOnPathB;
    if (!bothOnPathA && !bothOnPathB) {
      return invalid(
        `Station ${section.from} and ${section.to} are not on the same path.`,
      );
    }

    return { valid: true };
  }
}
