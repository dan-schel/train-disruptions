import { Split } from "../../blueprint/path-blueprint-piece/split";
import { PathBuilder } from "../path-builder";
import { PathPieceBuilder } from "./path-piece-builder";

export class SplitBuilder extends PathPieceBuilder {
  constructor(private readonly _blueprint: Split) {
    super();
  }

  build(builder: PathBuilder): void {
    builder.subpath((builder) => {
      if (this._blueprint.reversed) {
        builder.addAngle(180);
      }
      this._blueprint.split.build(builder);
    });
  }
}
