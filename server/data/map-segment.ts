export class MapSegment {
  constructor(
    readonly mapNodeA: number,
    readonly mapNodeB: number,
    readonly startPercentage: number,
    readonly endPercentage: number,
  ) {
    if (mapNodeA === mapNodeB) {
      throw new Error("Map nodes cannot be the same.");
    }

    if (startPercentage < 0) {
      throw new Error("Start percentage cannot be less than 0.");
    }
    if (endPercentage > 1) {
      throw new Error("End percentage cannot be greater than 1.");
    }
    if (startPercentage >= endPercentage) {
      throw new Error("Start percentage must be less than end percentage.");
    }
  }

  static condense(segments: MapSegment[]): MapSegment[] {
    // As much as possible, convert neighbouring segments into a single segment.
    // e.g. Pakenham -> Cardinia Road + Cardinia Road -> Officer becomes
    // Pakenham -> Officer.
  }
}
