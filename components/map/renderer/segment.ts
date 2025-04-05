import { z } from "zod";
import { DualPoint } from "@/components/map/renderer/dual-point";
import { LineColor, lineColors } from "@/components/map/renderer/utils";

export class Segment {
  constructor(
    readonly color: LineColor,
    readonly points: readonly DualPoint[],
  ) {}

  static readonly json = z
    .object({
      color: z.enum(lineColors),
      points: DualPoint.commaSeparatedStringJson,
    })
    .transform((x) => new Segment(x.color, x.points));

  toJSON(): z.input<typeof Segment.json> {
    return {
      color: this.color,
      points: this.points.map((x) => x.toString()).join(","),
    };
  }
}
