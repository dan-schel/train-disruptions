import { groupBy } from "@dan-schel/js-utils";
import { FlexiPoint } from "../dimensions/flexi-point";
import { Line, LineColor } from "../line";
import { InterchangeBaker } from "./interchange-baker";

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

  static bake(lines: Line[]): BakedGeometry {
    const bakedPaths = lines.map((l) => l.bake());

    const bakedLines = bakedPaths.flatMap((l) =>
      l.paths.map((p) => new BakedLine(l.color, p.points)),
    );

    const locatedInterchanges = bakedPaths
      .flatMap((l) => l.paths.flatMap((p) => p.locatedInterchanges))
      .sort(
        (a, b) =>
          a.interchangePoint.interchange.station -
          b.interchangePoint.interchange.station,
      );

    const interchanges = groupBy(
      locatedInterchanges,
      (i) => i.interchangePoint.interchange.station,
    ).map(({ items: locations }) => {
      const interchange = locations[0].interchangePoint.interchange;
      return new InterchangeBaker(interchange).bake(locations);
    });

    const terminii = bakedPaths.flatMap((l) =>
      l.paths.flatMap((p) =>
        p.terminii.map((t) => new BakedTerminus(t.point, t.angle, l.color)),
      ),
    );

    return new BakedGeometry(bakedLines, interchanges, terminii);
  }
}
