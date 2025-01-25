import { z } from "zod";
import { BakedPoint } from "./baked-point";

export class BakedInterchange {
  constructor(
    readonly thickLines: readonly (readonly BakedPoint[])[],
    readonly thinLine: readonly BakedPoint[] | null,
  ) {
    const noThickLines = thickLines.length === 0;
    const thickLinesInvalid = thickLines.some((l) => l.length < 2);
    const thinLineInvalid = thinLine != null && thinLine.length < 2;
    if (noThickLines || thickLinesInvalid || thinLineInvalid) {
      throw new Error("Invalid baked interchange geometry.");
    }
  }

  static readonly json = z
    .object({
      thick: BakedPoint.pathJson.array(),
      thin: BakedPoint.pathJson.optional(),
    })
    .transform((x) => new BakedInterchange(x.thick, x.thin ?? null));

  toJSON(): z.input<typeof BakedInterchange.json> {
    return {
      thick: this.thickLines.map((l) => BakedPoint.pathToJson(l)),
      thin:
        this.thinLine != null
          ? BakedPoint.pathToJson(this.thinLine)
          : undefined,
    };
  }
}
