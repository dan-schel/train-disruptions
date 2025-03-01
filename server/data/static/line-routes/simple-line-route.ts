import { LineSection } from "../../line-section";
import { LineRoute } from "./line-route";
import {
  InformalLineRouteStation,
  LineRouteStation,
} from "./line-route-station";
import { StationPair } from "./station-pair";

/** A line which doesn't do anything annoying. */
export class SimpleLineRoute extends LineRoute {
  readonly stations: readonly LineRouteStation[];

  // TODO: No ability to specify which stops are set-down-only for regional
  // lines. Should we have a separate RegionalLineRoute class for those? (And
  // rename BranchingLineRoute to RegionalBranchingLineRoute, with the same
  // logic?)
  constructor(stations: readonly InformalLineRouteStation[]) {
    super();

    if (stations.length < 2) {
      throw new Error("Simple line route must have at least two stations");
    }

    this.stations = stations.map(LineRouteStation.formalize);
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
