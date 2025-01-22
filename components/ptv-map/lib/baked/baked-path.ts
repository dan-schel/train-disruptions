import { FlexiPoint } from "../dimensions/flexi-point";
import { LineColor } from "../line";
import { InterchangePoint } from "../path/station-location";

export class LocatedInterchange {
  constructor(
    readonly interchangePoint: InterchangePoint,
    readonly point: FlexiPoint,
  ) {}

  static validate(items: readonly LocatedInterchange[]): void {
    const interchange = items[0].interchangePoint.interchange;

    const notFound = interchange.points.find((x) =>
      items.every((y) => y.interchangePoint.id !== x),
    );

    if (notFound != null) {
      throw new Error(
        `No point "${notFound}" found for interchange "${interchange.station}".`,
      );
    }

    const duplicate = items.find((y) =>
      items.some(
        (x) => x !== y && x.interchangePoint.id === y.interchangePoint.id,
      ),
    );

    if (duplicate != null) {
      throw new Error(
        `Duplicate point "${duplicate.interchangePoint.id}" found for interchange "${interchange.station}".`,
      );
    }
  }
}

export class LocatedTerminus {
  constructor(
    readonly point: FlexiPoint,
    readonly angle: number,
  ) {}
}

export class BakedPath {
  constructor(
    readonly points: readonly FlexiPoint[],
    readonly locatedInterchanges: readonly LocatedInterchange[],
    readonly terminii: readonly LocatedTerminus[],
  ) {}
}

export class ColoredBakedPathCollection {
  constructor(
    readonly color: LineColor,
    readonly paths: readonly BakedPath[],
  ) {}
}
