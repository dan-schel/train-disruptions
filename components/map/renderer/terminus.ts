import { z } from "zod";
import { LineColor, lineColors } from "@/components/map/renderer/utils";
import { FlexiPoint } from "@/components/map/renderer/flexi-point";
import {
  createFlexiPointString,
  flexiPointStringJson,
} from "@/components/map/renderer/json";

export class Terminus {
  constructor(
    readonly color: LineColor,
    readonly points: readonly FlexiPoint[],
  ) {}

  static readonly json = z
    .object({
      color: z.enum(lineColors),
      points: flexiPointStringJson,
    })
    .transform((x) => new Terminus(x.color, x.points));

  toJSON(): z.input<typeof Terminus.json> {
    return {
      color: this.color,
      points: createFlexiPointString(this.points),
    };
  }
}
