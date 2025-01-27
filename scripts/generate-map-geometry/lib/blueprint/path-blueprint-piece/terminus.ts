import { LocatedTerminus } from "../../builder/path";
import { PathBuilder } from "../../builder/path-builder";
import { PathBlueprintPiece } from "./path-blueprint-piece";

export class Terminus extends PathBlueprintPiece {
  constructor() {
    super();
  }

  reverse(): PathBlueprintPiece {
    return this;
  }

  build(builder: PathBuilder): void {
    builder.addTerminus(
      new LocatedTerminus(builder.getCurrentPoint(), builder.getCurrentAngle()),
    );
  }
}
