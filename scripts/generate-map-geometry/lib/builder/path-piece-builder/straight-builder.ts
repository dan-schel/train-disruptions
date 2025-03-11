import { Straight } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/straight";
import { PathBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-builder";
import { PathPieceBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/path-piece-builder";

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
