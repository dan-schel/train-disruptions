import { PathPieceBuilder } from "../../builder/path-piece-builder/path-piece-builder";
import { StraightBuilder } from "../../builder/path-piece-builder/straight-builder";
import { FlexiLength } from "../../dimensions/flexi-length";
import { PathBlueprintPiece } from "./path-blueprint-piece";

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
