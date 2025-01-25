import { z } from "zod";
import { BakedPoint } from "./baked-point";
import { LineColor, lineColors } from "./utils";

export class BakedLine {
  constructor(
    readonly color: LineColor,
    readonly path: readonly BakedPoint[],
  ) {}

  static readonly json = z
    .object({
      color: z.enum(lineColors),
      path: BakedPoint.pathJson,
    })
    .transform((x) => new BakedLine(x.color, x.path));

  toJSON(): z.input<typeof BakedLine.json> {
    return {
      color: this.color,
      path: this.path.map((x) => x.toString()).join(","),
    };
  }
}
