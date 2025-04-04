import { PathPieceBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/path-piece-builder";
import { PathBlueprintPiece } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/path-blueprint-piece";
import { NodeLocationBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/node-location-builder";

export class NodeLocation extends PathBlueprintPiece {
  constructor(readonly nodeId: number) {
    super();
  }

  reverse(): PathBlueprintPiece {
    return this;
  }

  getBuilder(): PathPieceBuilder {
    return new NodeLocationBuilder(this);
  }
}
