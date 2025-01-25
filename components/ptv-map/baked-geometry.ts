import { LineColor } from "./utils";

export class BakedPoint {
  constructor(
    readonly minX: number,
    readonly minY: number,
    readonly maxX: number,
    readonly maxY: number,
  ) {}

  amplify(amplification: number) {
    return {
      x: this.minX + (this.maxX - this.minX) * amplification,
      y: this.minY + (this.maxY - this.minY) * amplification,
    };
  }
}

export class BakedLine {
  constructor(
    readonly color: LineColor,
    readonly path: readonly BakedPoint[],
  ) {}
}

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

export class BakedTerminus {
  constructor(
    readonly point1: BakedPoint,
    readonly point2: BakedPoint,
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
