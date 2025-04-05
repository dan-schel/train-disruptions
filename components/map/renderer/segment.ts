import { z } from "zod";
import { DualPoint } from "@/components/map/renderer/dual-point";
import { LineColor, lineColors } from "@/components/map/renderer/utils";

export class Segment {
  constructor(
    // TODO: [DS] Only nullable while the old geometry builder is in use.
    readonly startNodeId: number | null,
    readonly endNodeId: number | null,

    readonly color: LineColor,
    readonly points: readonly DualPoint[],
  ) {}

  static readonly json = z
    .object({
      startNodeId: z.number().nullable(),
      endNodeId: z.number().nullable(),
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
