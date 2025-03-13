import { CurveBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/curve-builder";
import { PathPieceBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/path-piece-builder";
import { FlexiLength } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { PathBlueprintPiece } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/path-blueprint-piece";

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
