import { FlexiPoint } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
import { InterchangePoint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/station-location";
import { LineColor } from "@/components/map/renderer/utils";

export class ColoredPathCollection {
  constructor(
    readonly color: LineColor,
    readonly paths: readonly Path[],
  ) {}
}

export class Path {
  constructor(
    readonly points: readonly FlexiPoint[],
    readonly locatedInterchanges: readonly LocatedInterchange[],
    readonly locatedTermini: readonly LocatedTerminus[],
  ) {}
}

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
