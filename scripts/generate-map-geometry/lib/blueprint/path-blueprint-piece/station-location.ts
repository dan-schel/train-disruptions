import { PathPieceBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/path-piece-builder";
import { StationLocationBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/station-location-builder";
import { PathBlueprintPiece } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/path-blueprint-piece";

export class NodeLocation extends PathBlueprintPiece {
  constructor(readonly nodeId: number) {
    super();
  }

  reverse(): PathBlueprintPiece {
    return this;
  }

  getBuilder(): PathPieceBuilder {
    return new StationLocationBuilder(this);
  }
}
