import { PathPieceBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/path-piece-builder";
import { TerminusBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/terminus-builder";
import { PathBlueprintPiece } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/path-blueprint-piece";

export class Terminus extends PathBlueprintPiece {
  constructor() {
    super();
  }

  reverse(): PathBlueprintPiece {
    return this;
  }

  getBuilder(): PathPieceBuilder {
    return new TerminusBuilder(this);
  }
}
