import { BakedPoint } from "./baked-point";

export class BakedInterchange {
  constructor(
    readonly station: number,
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
}
