import {
  LineRoute,
  LineRouteStation,
  InformalLineRouteStation,
  LineSectionValidationResult,
  contains,
  invalid,
} from "./line-route";
import * as station from "../../../../shared/station-ids";
import { stations as allStations } from "../stations";
import { LineSection } from "../../line-section";

export type LoopPortal = "richmond" | "jolimont" | "north-melbourne";

/** A line which uses the City Loop. */
export class LoopLineRoute extends LineRoute {
  static readonly portalStations: Partial<Record<number, LoopPortal>> = {
    [station.RICHMOND]: "richmond",
    [station.JOLIMONT]: "jolimont",
    [station.NORTH_MELBOURNE]: "north-melbourne",
  };

  readonly stations: readonly LineRouteStation[];
  readonly portal: LoopPortal;

  constructor(stations: readonly InformalLineRouteStation[]) {
    super();

    if (stations.length < 1) {
      throw new Error("Loop line route must have at least one station");
    }

    this.stations = stations.map(LineRouteStation.formalize);

    const firstStation = this.stations[0].stationId;
    const portal = LoopLineRoute.portalStations[firstStation];
    if (portal == null) {
      const name = allStations.require(firstStation).name;
      throw new Error(`Invalid loop portal station: ${name} (${firstStation})`);
    }
    this.portal = portal;
  }

  validateLineSection(
    section: LineSection,
    options?: { ignoreExpressStops?: boolean },
  ): LineSectionValidationResult {
    if (
      section.from !== "the-city" &&
      !contains(section.from, this.stations, options)
    ) {
      return invalid(`Station ${section.from} is not in this line.`);
    }
    if (
      section.to !== "the-city" &&
      !contains(section.to, this.stations, options)
    ) {
      return invalid(`Station ${section.to} is not in this line.`);
    }
    return { valid: true };
  }
}
