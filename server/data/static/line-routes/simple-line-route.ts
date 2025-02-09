import { LineSection } from "../../line-section";
import {
  LineRoute,
  LineRouteStation,
  InformalLineRouteStation,
  LineSectionValidationResult,
  invalid,
  contains,
} from "./line-route";

/** A line which doesn't do anything annoying. */
export class SimpleLineRoute extends LineRoute {
  readonly stations: readonly LineRouteStation[];

  constructor(stations: readonly InformalLineRouteStation[]) {
    super();

    if (stations.length < 2) {
      throw new Error("Simple line route must have at least two stations");
    }

    this.stations = stations.map(LineRouteStation.formalize);
  }

  validateLineSection(section: LineSection): LineSectionValidationResult {
    if (section.from === "the-city" || section.to === "the-city") {
      return invalid("'The city' is invalid for simple line routes.");
    }
    if (!contains(section.from, this.stations)) {
      return invalid(`Station ${section.from} is not in this line.`);
    }
    if (!contains(section.to, this.stations)) {
      return invalid(`Station ${section.to} is not in this line.`);
    }
    return { valid: true };
  }
}
