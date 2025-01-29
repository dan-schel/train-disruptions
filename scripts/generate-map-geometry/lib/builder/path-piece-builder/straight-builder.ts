import { Straight } from "../../blueprint/path-blueprint-piece/straight";
import { PathBuilder } from "../path-builder";
import { PathPieceBuilder } from "./path-piece-builder";

export class StraightBuilder extends PathPieceBuilder {
  constructor(private readonly _blueprint: Straight) {
    super();
  }

  build(builder: PathBuilder): void {
    builder.addPoint(
      builder
        .getCurrentPoint()
        .move(this._blueprint.length, builder.getCurrentAngle()),
    );
  }
}
