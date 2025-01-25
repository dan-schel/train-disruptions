import { FlexiPoint } from "../dimensions/flexi-point";
import { InterchangePoint } from "../path/station-location";
import { LineColor } from "../../utils";

export class LocatedInterchange {
  constructor(
    readonly interchangePoint: InterchangePoint,
    readonly point: FlexiPoint,
    readonly angle: number,
  ) {}
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
