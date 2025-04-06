import { z } from "zod";
import { LineColor, lineColors } from "@/components/map/renderer/utils";
import { FlexiLength } from "@/components/map/renderer/flexi-length";
import {
  createFlexiLengthString,
  createFlexiPointString,
  flexiLengthStringJson,
  flexiPointStringJson,
} from "@/components/map/renderer/json";
import { FlexiPoint } from "@/components/map/renderer/flexi-point";

export class Segment {
  constructor(
    readonly startNodeId: number,
    readonly endNodeId: number,
    readonly color: LineColor,
    readonly points: readonly FlexiPoint[],
    readonly distances: readonly FlexiLength[],
  ) {
    if (startNodeId >= endNodeId) {
      throw new Error("Segment created with startNodeId >= endNodeId.");
    }
    if (distances.length !== points.length) {
      throw new Error("Distances and points must have the same length.");
    }
  }

  static readonly json = z
    .object({
      startNodeId: z.number(),
      endNodeId: z.number(),
      color: z.enum(lineColors),
      points: flexiPointStringJson,
      distances: flexiLengthStringJson,
    })
    .transform(
      (x) =>
        new Segment(x.startNodeId, x.endNodeId, x.color, x.points, x.distances),
    );

  toJSON(): z.input<typeof Segment.json> {
    return {
      startNodeId: this.startNodeId,
      endNodeId: this.endNodeId,
      color: this.color,
      points: createFlexiPointString(this.points),
      distances: createFlexiLengthString(this.distances),
    };
  }
}
