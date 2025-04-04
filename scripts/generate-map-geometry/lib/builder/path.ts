import { FlexiPoint } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
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
    readonly locatedNodes: readonly LocatedNode[],
    readonly locatedTermini: readonly LocatedTerminus[],
  ) {}
}

export class LocatedNode {
  constructor(
    readonly nodeId: number,
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
