import { BakedPoint } from "./baked-point";
import { LineColor } from "./utils";

export class BakedLine {
  constructor(
    readonly color: LineColor,
    readonly path: readonly BakedPoint[],
  ) {}
}
