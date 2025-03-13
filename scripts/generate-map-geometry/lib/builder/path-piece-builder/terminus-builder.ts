import { Terminus } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/terminus";
import { LocatedTerminus } from "@/scripts/generate-map-geometry/lib/builder/path";
import { PathBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-builder";
import { PathPieceBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/path-piece-builder";

export class TerminusBuilder extends PathPieceBuilder {
  constructor(private readonly _blueprint: Terminus) {
    super();
  }

  build(builder: PathBuilder): void {
    builder.addTerminus(
      new LocatedTerminus(builder.getCurrentPoint(), builder.getCurrentAngle()),
    );
  }
}
