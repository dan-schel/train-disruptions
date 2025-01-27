import { PathBuilder } from "../../builder/path-builder";
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

  bake(baker: PathBuilder): void {
    baker.addPoint(
      baker.getCurrentPoint().move(this.length, baker.getCurrentAngle()),
    );
  }
}
