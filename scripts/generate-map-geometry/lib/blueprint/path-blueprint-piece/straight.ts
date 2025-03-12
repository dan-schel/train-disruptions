import { PathPieceBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/path-piece-builder";
import { StraightBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/straight-builder";
import { FlexiLength } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { PathBlueprintPiece } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/path-blueprint-piece";

export class Straight extends PathBlueprintPiece {
  constructor(readonly length: FlexiLength) {
    super();

    if (length.min < 0 || length.max < 0) {
      throw new Error("Length cannot be negative.");
    }
  }

  reverse(): PathBlueprintPiece {
    return this;
  }

  getBuilder(): PathPieceBuilder {
    return new StraightBuilder(this);
  }
}
