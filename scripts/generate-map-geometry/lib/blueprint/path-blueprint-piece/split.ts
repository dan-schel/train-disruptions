import { PathPieceBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/path-piece-builder";
import { SplitBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/split-builder";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { PathBlueprintPiece } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/path-blueprint-piece";

export class Split extends PathBlueprintPiece {
  constructor(
    readonly split: PathBlueprint,
    readonly reversed: boolean,
  ) {
    super();
  }

  reverse(): PathBlueprintPiece {
    return new Split(this.split.reverse(), !this.reversed);
  }

  getBuilder(): PathPieceBuilder {
    return new SplitBuilder(this);
  }
}
