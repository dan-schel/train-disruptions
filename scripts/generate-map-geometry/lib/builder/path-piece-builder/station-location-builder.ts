import { StationLocation } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/station-location";
import { LocatedInterchange } from "@/scripts/generate-map-geometry/lib/builder/path";
import { PathBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-builder";
import { PathPieceBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/path-piece-builder";

export class StationLocationBuilder extends PathPieceBuilder {
  constructor(private readonly _blueprint: StationLocation) {
    super();
  }

  build(builder: PathBuilder): void {
    if (this._blueprint.interchangePoint != null) {
      builder.addInterchange(
        new LocatedInterchange(
          this._blueprint.interchangePoint,
          builder.getCurrentPoint(),
          builder.getCurrentAngle(),
        ),
      );
    }
  }
}
