export class MapPoint {
  constructor(
    readonly mapNodeA: number,
    readonly mapNodeB: number,
    readonly percentage: number,
  ) {
    // Map nodes CAN be the same, e.g. if the map point is something like South
    // Yarra, which happens to have a dedicated map node.

    if (percentage < 0) {
      throw new Error("Percentage cannot be less than 0.");
    }
    if (percentage > 1) {
      throw new Error("Percentage cannot be greater than 1.");
    }
  }
}
