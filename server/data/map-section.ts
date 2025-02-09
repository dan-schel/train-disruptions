export class MapSection {
  constructor(
    /**
     * The path between two stations to highlight. The map does not have
     * pathfinding logic, so it must list every adjacent stop without skipping
     * any.
     */
    readonly stationIds: number[],

    /**
     * Used by the map component to choose which colored line this applies to.
     */
    readonly lineId: number,
  ) {}
}
