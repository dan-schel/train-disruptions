import { z } from "zod";
import { DualPoint } from "./dual-point";
import { LineColor, lineColors } from "./utils";

export class Terminus {
  constructor(
    readonly color: LineColor,
    readonly path: readonly DualPoint[],
  ) {}

  static readonly json = z
    .object({
      color: z.enum(lineColors),
      path: DualPoint.pathJson,
    })
    .transform((x) => new Terminus(x.color, x.path));

  toJSON(): z.input<typeof Terminus.json> {
    return {
      color: this.color,
      path: this.path.map((x) => x.toString()).join(","),
    };
  }
}
