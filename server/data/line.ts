import * as station from "./station-ids";

export class Line {
  readonly id: number;
  readonly name: string;
  readonly ptvIds: readonly number[];
  readonly route: LineRoute;

  constructor({
    id,
    name,
    ptvIds,
    route,
  }: {
    id: number;
    name: string;
    ptvIds: readonly number[];
    route: LineRoute;
  }) {
    this.id = id;
    this.name = name;
    this.ptvIds = ptvIds;
    this.route = route;
  }
}

export abstract class LineRoute {}

export class SimpleLineRoute extends LineRoute {
  constructor(readonly stations: readonly number[]) {
    super();
  }
}

export class LoopLineRoute extends LineRoute {
  constructor(readonly stations: readonly number[]) {
    super();

    const portalStation = stations[0];
    if (
      ![station.RICHMOND, station.JOLIMONT, station.NORTH_MELBOURNE].includes(
        portalStation,
      )
    ) {
      throw new Error(`Invalid portal station: ${portalStation}`);
    }
  }

  getPortal() {
    return this.stations[0];
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

export class WerribeeLineRoute extends LineRoute {
  // Shrug
  constructor(
    readonly cityToNewport: readonly number[],
    readonly altonaLoop: readonly number[],
    readonly lavertonToWerribee: readonly number[],
  ) {
    super();
  }
}
