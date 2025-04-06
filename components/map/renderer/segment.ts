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
    if (startNodeId === endNodeId) {
      throw new Error(
        "Segment created with identical startNodeId and endNodeId.",
      );
    }
    if (distances.length !== points.length) {
      throw new Error("Distances and points must have the same length.");
    }
  }

  reverse(): Segment {
    const maxDistance = this.distances[this.distances.length - 1];
    const reversedDistances = this.distances
      .map((x) => maxDistance.minus(x))
      .reverse();

    return new Segment(
      this.endNodeId,
      this.startNodeId,
      this.color,
      [...this.points].reverse(),
      reversedDistances,
    );
  }

  normalize(): Segment {
    if (this.startNodeId < this.endNodeId) {
      return this;
    } else {
      return this.reverse();
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
