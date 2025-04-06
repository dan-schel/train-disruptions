import { MapPoint } from "@/server/data/map-point";
import { MapSegment } from "@/server/data/map-segment";
import { z } from "zod";

export class HighlightedSegment {
  constructor(
    readonly segment: MapSegment,
    readonly highlighting: "standard",
  ) {}

  static readonly bson = z
    .object({
      segment: MapSegment.bson,
      highlighting: z.literal("standard"),
    })
    .transform((x) => new HighlightedSegment(x.segment, x.highlighting));

  toBson(): z.input<typeof HighlightedSegment.bson> {
    return {
      segment: this.segment.toBson(),
      highlighting: this.highlighting,
    };
  }
}

export class HighlightedPoint {
  constructor(
    readonly point: MapPoint,
    readonly highlighting: "standard",
  ) {}

  static readonly bson = z
    .object({
      point: MapPoint.bson,
      highlighting: z.literal("standard"),
    })
    .transform((x) => new HighlightedPoint(x.point, x.highlighting));

  toBson(): z.input<typeof HighlightedPoint.bson> {
    return {
      point: this.point.toBson(),
      highlighting: this.highlighting,
    };
  }
}

export class MapHighlighting {
  static readonly none = new MapHighlighting([], []);

  constructor(
    readonly segments: readonly HighlightedSegment[],
    readonly points: readonly HighlightedPoint[],
  ) {}

  static readonly bson = z
    .object({
      segments: z.array(HighlightedSegment.bson),
      points: z.array(HighlightedPoint.bson),
    })
    .transform((x) => new MapHighlighting(x.segments, x.points));

  toBson(): z.input<typeof MapHighlighting.bson> {
    return {
      segments: this.segments.map((s) => s.toBson()),
      points: this.points.map((p) => p.toBson()),
    };
  }
}
