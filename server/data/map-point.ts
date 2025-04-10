import { z } from "zod";

export class MapPoint {
  constructor(
    readonly segmentANodeA: number,
    readonly segmentANodeB: number,
    readonly segmentBNodeA: number,
    readonly segmentBNodeB: number,
    readonly percentage: number,
  ) {
    if (percentage < 0) {
      throw new Error("Percentage cannot be less than 0.");
    }
    if (percentage > 1) {
      throw new Error("Percentage cannot be greater than 1.");
    }
  }

  static readonly bson = z
    .object({
      segmentANodeA: z.number(),
      segmentANodeB: z.number(),
      segmentBNodeA: z.number(),
      segmentBNodeB: z.number(),
      percentage: z.number(),
    })
    .transform(
      (x) =>
        new MapPoint(
          x.segmentANodeA,
          x.segmentANodeB,
          x.segmentBNodeA,
          x.segmentBNodeB,
          x.percentage,
        ),
    );

  toBson(): z.input<typeof MapPoint.bson> {
    return {
      segmentANodeA: this.segmentANodeA,
      segmentANodeB: this.segmentANodeB,
      segmentBNodeA: this.segmentBNodeA,
      segmentBNodeB: this.segmentBNodeB,
      percentage: this.percentage,
    };
  }
}

export class MapCorridor {
  constructor(
    readonly segmentANodeA: number,
    readonly segmentANodeB: number,
    readonly segmentBNodeA: number,
    readonly segmentBNodeB: number,
  ) {}

  pointAt(percentage: number): MapPoint {
    return new MapPoint(
      this.segmentANodeA,
      this.segmentANodeB,
      this.segmentBNodeA,
      this.segmentBNodeB,
      percentage,
    );
  }
}
