import { CurveBuilder } from "../../builder/path-piece-builder/curve-builder";
import { PathPieceBuilder } from "../../builder/path-piece-builder/path-piece-builder";
import { FlexiLength } from "../../dimensions/flexi-length";
import { PathBlueprintPiece } from "./path-blueprint-piece";

export class Curve extends PathBlueprintPiece {
  constructor(
    readonly radius: FlexiLength,
    readonly angle: -90 | -45 | 45 | 90,
  ) {
    super();

    if (radius.min < 0 || radius.max < 0) {
      throw new Error("Radius cannot be negative.");
    }
  }

  reverse(): PathBlueprintPiece {
    return new Curve(this.radius, -this.angle as -90 | -45 | 45 | 90);
  }

  getBuilder(): PathPieceBuilder {
    return new CurveBuilder(this);
  }
}
