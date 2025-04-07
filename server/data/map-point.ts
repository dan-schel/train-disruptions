import { z } from "zod";

export class MapPoint {
  constructor(
    // TODO: I think you actually need four map nodes to identify some stations,
    // e.g. Essendon. It falls between North Melbourne and Broadmeadows, but
    // across two different lines (the yellow Craigieburn line and the purple
    // Seymour line). So it think we'd need the algorithm to find the Essendon
    // spot for the yellow AND purple line, and use the midpoint of the two.
    //
    // (Fun!)
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

  static readonly bson = z
    .object({
      mapNodeA: z.number(),
      mapNodeB: z.number(),
      percentage: z.number(),
    })
    .transform((x) => new MapPoint(x.mapNodeA, x.mapNodeB, x.percentage));

  toBson(): z.input<typeof MapPoint.bson> {
    return {
      mapNodeA: this.mapNodeA,
      mapNodeB: this.mapNodeB,
      percentage: this.percentage,
    };
  }

  reverse(): MapPoint {
    return new MapPoint(this.mapNodeB, this.mapNodeA, 1 - this.percentage);
  }

  normalize(): MapPoint {
    if (this.mapNodeA < this.mapNodeB) {
      return this;
    } else {
      return this.reverse();
    }
  }
}
