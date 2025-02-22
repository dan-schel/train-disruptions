/** A path between two stations achievable... somehow. */
export class RouteGraphEdgeBase {
  constructor(
    public readonly stationA: number,
    public readonly stationB: number,
  ) {}
}
