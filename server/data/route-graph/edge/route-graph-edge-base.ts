/** A path between two stations achievable... somehow. */
export class RouteGraphEdgeBase {
  constructor(
    readonly stationA: number,
    readonly stationB: number,
  ) {}
}
