import { BakedPoint } from "./baked-point";
import { LineColor } from "./utils";

export class BakedTerminus {
  constructor(
    readonly point1: BakedPoint,
    readonly point2: BakedPoint,
    readonly color: LineColor,
  ) {}
}
