import { FlexiPoint } from "../dimensions/flexi-point";
import { LineColor } from "../utils";

export class BakedLine {
  constructor(
    readonly color: LineColor,
    readonly path: readonly FlexiPoint[],
  ) {}
}

export class BakedInterchange {
  constructor(
    readonly station: number,
    readonly thickLines: readonly (readonly FlexiPoint[])[],
    readonly thinLine: readonly FlexiPoint[] | null,
  ) {
    const noThickLines = thickLines.length === 0;
    const thickLinesInvalid = thickLines.some((l) => l.length < 2);
    const thinLineInvalid = thinLine != null && thinLine.length < 2;
    if (noThickLines || thickLinesInvalid || thinLineInvalid) {
      throw new Error("Invalid baked interchange geometry.");
    }
  }
}

export class BakedTerminus {
  constructor(
    readonly point: FlexiPoint,
    readonly angle: number,
    readonly color: LineColor,
  ) {}
}

export class BakedGeometry {
  constructor(
    readonly lines: readonly BakedLine[],
    readonly interchanges: readonly BakedInterchange[],
    readonly terminii: readonly BakedTerminus[],
  ) {}
}
