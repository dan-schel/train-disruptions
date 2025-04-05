import { z } from "zod";
import { DualPoint } from "@/components/map/renderer/dual-point";
import { LineColor, lineColors } from "@/components/map/renderer/utils";

export class Segment {
  constructor(
    readonly startNodeId: number,
    readonly endNodeId: number,

    readonly color: LineColor,
    readonly points: readonly DualPoint[],
  ) {}

  static readonly json = z
    .object({
      startNodeId: z.number(),
      endNodeId: z.number(),
      color: z.enum(lineColors),
      points: DualPoint.commaSeparatedStringJson,
    })
    .transform(
      (x) => new Segment(x.startNodeId, x.endNodeId, x.color, x.points),
    );

  toJSON(): z.input<typeof Segment.json> {
    return {
      startNodeId: this.startNodeId,
      endNodeId: this.endNodeId,
      color: this.color,
      points: this.points.map((x) => x.toString()).join(","),
    };
  }
}
