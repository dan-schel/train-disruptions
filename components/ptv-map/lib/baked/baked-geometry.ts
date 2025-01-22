import { FlexiPoint } from "../dimensions/flexi-point";
import { Line, LineColor } from "../line";
import { LocatedInterchange } from "./baked-path";

export class BakedLine {
  constructor(
    readonly color: LineColor,
    readonly path: readonly FlexiPoint[],
  ) {}
}

export class BakedInterchange {
  constructor(
    readonly station: number,
    readonly points: readonly FlexiPoint[],
  ) {
    if (points.length < 1 || points.length > 2) {
      throw new Error("Baked interchange should contain 1-2 points.");
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

    const interchanges: BakedInterchange[] = [];

    collectedRepeatedValues(
      locatedInterchanges,
      (item) => item.interchangePoint.interchange.station,
      (station, items) => {
        LocatedInterchange.validate(items);

        interchanges.push(
          new BakedInterchange(
            station,
            items.filter((i) => i.interchangePoint.render).map((i) => i.point),
          ),
        );
      },
    );

    const terminii = bakedPaths.flatMap((l) =>
      l.paths.flatMap((p) =>
        p.terminii.map((t) => new BakedTerminus(t.point, t.angle, l.color)),
      ),
    );

    return new BakedGeometry(bakedLines, interchanges, terminii);
  }
}

// TODO: [DS] Move to a separate file. Include sorting as part of this function.
// Rename to groupedBy, and make the key type generic (string | number at least).
function collectedRepeatedValues<T>(
  array: T[],
  selector: (item: T) => number,
  action: (id: number, item: T[]) => void,
) {
  let current: number | null = null;
  const values: T[] = [];

  for (const item of array) {
    const value = selector(item);
    if (value !== current) {
      current = value;

      if (values.length !== 0) {
        action(selector(values[0]), values);
        values.length = 0;
      }
    }

    values.push(item);
  }

  if (values.length !== 0) {
    action(selector(values[0]), values);
  }
}
