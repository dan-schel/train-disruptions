import * as station from "./station-ids";
import { stations as allStations } from "./stations";

export abstract class LineRoute {}

export class SimpleLineRoute extends LineRoute {
  constructor(readonly stations: readonly number[]) {
    super();
  }
}

export type LoopPortal = "richmond" | "jolimont" | "north-melbourne";

export class LoopLineRoute extends LineRoute {
  static readonly portalStations: Partial<Record<number, LoopPortal>> = {
    [station.RICHMOND]: "richmond",
    [station.JOLIMONT]: "jolimont",
    [station.NORTH_MELBOURNE]: "north-melbourne",
  };

  readonly portal: LoopPortal;

  constructor(readonly stations: readonly number[]) {
    super();

    const firstStation = this.stations[0];
    const portal = LoopLineRoute.portalStations[firstStation];
    if (portal == null) {
      const name = allStations.require(firstStation).name;
      throw new Error(`Invalid loop portal station: ${name} (${firstStation})`);
    }
    this.portal = portal;
  }
}

export class BranchingLineRoute extends LineRoute {
  constructor(
    readonly shared: readonly number[],
    readonly branchA: readonly number[],
    readonly branchB: readonly number[],
  ) {
    super();
  }
}

export class ExpressLineRoute extends LineRoute {
  constructor(
    readonly beforeExpressStations: readonly number[],
    readonly localOnlyStations: readonly number[],
    readonly afterExpressStations: readonly number[],
  ) {
    super();
  }
}
