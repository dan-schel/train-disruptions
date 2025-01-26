import { PathBaker } from "../baked/path-baker";
import { FlexiLength } from "../dimensions/flexi-length";
import { PathPiece } from "./path-piece";

export class StraightPathPiece extends PathPiece {
  constructor(readonly length: FlexiLength) {
    super();

    if (length.min < 0 || length.max < 0) {
      throw new Error("Length cannot be negative.");
    }
  }

  reverse(): PathPiece {
    return this;
  }

  bake(baker: PathBaker): void {
    baker.addPoint(
      baker.getCurrentPoint().move(this.length, baker.getCurrentAngle()),
    );
  }
}
