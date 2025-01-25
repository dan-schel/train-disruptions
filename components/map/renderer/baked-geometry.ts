import { BakedLine } from "./baked-line";
import { BakedInterchange } from "./baked-interchange";
import { BakedTerminus } from "./baked-terminus";

export class BakedGeometry {
  constructor(
    readonly lines: readonly BakedLine[],
    readonly interchanges: readonly BakedInterchange[],
    readonly terminii: readonly BakedTerminus[],
  ) {}
}
