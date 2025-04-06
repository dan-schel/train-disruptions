import { FlexiPoint } from "@/components/map/renderer/flexi-point";
import {
  createFlexiPointString,
  flexiPointStringJson,
} from "@/components/map/renderer/json";
import { z } from "zod";

export class Interchange {
  constructor(
    readonly thickLines: readonly (readonly FlexiPoint[])[],
    readonly thinLine: readonly FlexiPoint[] | null,
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
      thick: flexiPointStringJson.array(),
      thin: flexiPointStringJson.optional(),
    })
    .transform((x) => new Interchange(x.thick, x.thin ?? null));

  toJSON(): z.input<typeof Interchange.json> {
    return {
      thick: this.thickLines.map((l) => createFlexiPointString(l)),
      thin:
        this.thinLine != null
          ? createFlexiPointString(this.thinLine)
          : undefined,
    };
  }
}
