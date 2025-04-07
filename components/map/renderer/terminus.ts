import { z } from "zod";
import { LineColor, lineColors } from "@/components/map/renderer/utils";
import { FlexiPoint } from "@/components/map/renderer/dimensions/flexi-point";
import {
  createFlexiPointString,
  flexiPointStringJson,
} from "@/components/map/renderer/dimensions/json";

export class Terminus {
  constructor(
    readonly nodeId: number,
    readonly color: LineColor,
    readonly points: readonly FlexiPoint[],
  ) {}

  static readonly json = z
    .object({
      nodeId: z.number(),
      color: z.enum(lineColors),
      points: flexiPointStringJson,
    })
    .transform((x) => new Terminus(x.nodeId, x.color, x.points));

  toJSON(): z.input<typeof Terminus.json> {
    return {
      nodeId: this.nodeId,
      color: this.color,
      points: createFlexiPointString(this.points),
    };
  }
}
