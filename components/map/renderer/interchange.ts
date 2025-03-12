import { z } from "zod";
import { DualPoint } from "@/components/map/renderer/dual-point";

export class Interchange {
  constructor(
    readonly thickLines: readonly (readonly DualPoint[])[],
    readonly thinLine: readonly DualPoint[] | null,
  ) {
    const noThickLines = thickLines.length === 0;
    const thickLinesInvalid = thickLines.some((l) => l.length < 2);
    const thinLineInvalid = thinLine != null && thinLine.length < 2;
    if (noThickLines || thickLinesInvalid || thinLineInvalid) {
      throw new Error("Invalid interchange geometry.");
    }
  }

  static readonly json = z
    .object({
      thick: DualPoint.pathJson.array(),
      thin: DualPoint.pathJson.optional(),
    })
    .transform((x) => new Interchange(x.thick, x.thin ?? null));

  toJSON(): z.input<typeof Interchange.json> {
    return {
      thick: this.thickLines.map((l) => DualPoint.pathToJson(l)),
      thin:
        this.thinLine != null ? DualPoint.pathToJson(this.thinLine) : undefined,
    };
  }
}
