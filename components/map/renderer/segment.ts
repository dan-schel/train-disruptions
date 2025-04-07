import { z } from "zod";
import { LineColor, lineColors } from "@/components/map/renderer/utils";
import { FlexiLength } from "@/components/map/renderer/dimensions/flexi-length";
import {
  createFlexiLengthString,
  createFlexiPointString,
  flexiLengthStringJson,
  flexiPointStringJson,
} from "@/components/map/renderer/dimensions/json";
import { FlexiPoint } from "@/components/map/renderer/dimensions/flexi-point";
import { Point } from "@/components/map/renderer/dimensions/point";

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

  pointsForRange(
    amplification: number,
    start: number,
    end: number,
  ): readonly FlexiPoint[] {
    const distances = this.distances.map((x) => x.amplify(amplification));
    const startDistance = start * distances[distances.length - 1];
    const endDistance = end * distances[distances.length - 1];
    const points = this.points.filter(
      // TODO: [DS] Might be susceptible to floating point errors. Would it have
      // any impact though?
      (_, i) => distances[i] > startDistance && distances[i] < endDistance,
    );

    return [
      this.pointAt(amplification, start),
      ...points,
      this.pointAt(amplification, end),
    ];
  }

  pointAt(amplification: number, percentage: number): FlexiPoint {
    // TODO: [DS] This function sucks. Maybe implementing it with loops would be
    // nicer. I.e. set the start and end points and iterate through to first
    // advance the start point as much as possible, and then repeat for the end
    // point.
    //
    // Copilot keeps trying to mention binary search. Would it work?

    const distances = this.distances.map((x) => x.amplify(amplification));
    const distance = percentage * distances[distances.length - 1];
    const before = distances.findLastIndex((x) => x <= distance);
    const after = distances.findIndex((x) => x >= distance);

    if (before !== -1 && after !== -1) {
      if (before === after) {
        return this.points[before];
      }

      const beforeDistance = distances[before];
      const afterDistance = distances[after];
      const localPercentage =
        (distance - beforeDistance) / (afterDistance - beforeDistance);
      const beforePoint = this.points[before];
      const afterPoint = this.points[after];
      return new FlexiPoint(
        new Point(
          beforePoint.min.x +
            localPercentage * (afterPoint.min.x - beforePoint.min.x),
          beforePoint.min.y +
            localPercentage * (afterPoint.min.y - beforePoint.min.y),
        ),
        new Point(
          beforePoint.max.x +
            localPercentage * (afterPoint.max.x - beforePoint.max.x),
          beforePoint.max.y +
            localPercentage * (afterPoint.max.y - beforePoint.max.y),
        ),
      );
    } else if (before !== -1) {
      return this.points[before];
    } else if (after !== -1) {
      return this.points[after];
    } else {
      throw new Error("Issue trying to find point at certain percentage.");
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
