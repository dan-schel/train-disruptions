import { z } from "zod";
import { DualPoint } from "@/components/map/renderer/dual-point";
import { LineColor, lineColors } from "@/components/map/renderer/utils";

export class Segment {
  constructor(
    readonly color: LineColor,
    readonly path: readonly DualPoint[],
  ) {}

  static readonly json = z
    .object({
      color: z.enum(lineColors),
      path: DualPoint.pathJson,
    })
    .transform((x) => new Segment(x.color, x.path));

  toJSON(): z.input<typeof Segment.json> {
    return {
      color: this.color,
      path: this.path.map((x) => x.toString()).join(","),
    };
  }
}
