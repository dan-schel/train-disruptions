import { FlexiPoint } from "../dimensions/flexi-point";
import { LineColor } from "../line";
import { InterchangePoint } from "../path/station-location";

export class LocatedInterchange {
  constructor(
    readonly interchangePoint: InterchangePoint,
    readonly point: FlexiPoint,
  ) {}
}

export class BakedPath {
  constructor(
    readonly points: readonly FlexiPoint[],
    readonly locatedInterchanges: readonly LocatedInterchange[],
  ) {}
}

export class ColoredBakedPathCollection {
  constructor(
    readonly color: LineColor,
    readonly paths: readonly BakedPath[],
  ) {}
}
